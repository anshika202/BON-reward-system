import express from "express";
import models from "./models.js";

const router = express.Router();

// track due bills
router.get('/track-bill', (req, res) => {
    try {
        const {userId} = req?.body;
        if(!userId) return res.status(500).json("Provide valid user Id !");
        
        let today = new Date();


        // to trcak the bill which are due in <= 2 days
        const userBills = models?.bills?.filter((item) => {
            const dueDate = new Date(item?.lastDate);
            const diffInDays = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));

            return item?.userId === userId && diffInDays <= 2 && diffInDays >= 0;
        });

        if(userBills?.length === 0) return res.status(200).json("No bills due !");

        return res.status(200).json({msg: "Here are your bills for due", bills: userBills});
    } catch (error) {
        return res.status(500).json(error);
    }
});

// POST api - pay bill
router.post("/pay-bill", (req, res) => {
    try {
    const {userId, paymentDate, lastDate} = req?.body;

    if(!userId || !paymentDate || !lastDate){
        return res.status(500).json("enough data not present !");
    }

    // new bill obj
    const newBill = {
        userId,
        lastDate, 
        paymentDate,
        id: models?.bills.length + 1
    }
    models?.bills?.push(newBill);

    // get latest last 3 bills for given userId
    const userOldBills = models?.bills?.filter(item => item?.userId === userId)
                                       .sort((x,y) => new Date(y?.lastDate) - new Date(x?.lastDate))
                                       .slice(0,3);
    
    const isOnTime = userOldBills?.every(
        item => new Date(item?.paymentDate) <= new Date(item?.lastDate)
    );

    // logic for checking if reward should be given or not
    if(userOldBills?.length >= 3 && isOnTime){
        let obj = {
            userId,
            reward: "You are being rewarded with $10 Amazon gift card!",
            createdAt: new Date()
        };

        models?.rewards?.push(obj);
        return res.status(200).json({msg:"Bill paid, you earned a reward !", bill: newBill, reward: obj});
    }

    return res.status(200).json({msg:"Bill paid !"});
    } catch (error) {
        res.status(500).json("Error occurred while paying bill !");
    }
});

export default router;
