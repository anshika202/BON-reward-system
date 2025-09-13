const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];

const bills = [
  { id: 1, userId: 1, lastDate: "2025-09-10", paymentDate: "2025-09-10" },
  { id: 2, userId: 1, lastDate: "2025-08-10", paymentDate: "2025-08-09" },
  { id: 3, userId: 1, lastDate: "2025-07-10", paymentDate: "2025-07-10" },
];

const rewards = [];

export default {
    users,
    bills,
    rewards
}