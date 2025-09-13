import express from "express";
import router from "./route.js";
const app = express();  

app.use(express.json());  // to parse JSON

app.use("/api", router);

app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.listen(3000, () => {
    console.log("running at PORT 3000");
});

