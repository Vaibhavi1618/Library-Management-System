const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/pay", (req, res) => {
  const { user_id, amount, reason } = req.body;

  if (!user_id || !amount || !reason) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const sql = "INSERT INTO fines (user_id, amount, reason) VALUES (?, ?, ?)";
  db.query(sql, [user_id, amount, reason], (err, result) => {
    if (err) {
      console.error("Error inserting fine:", err);
      return res.status(500).json({ message: "Database error." });
    }
    res.json({ message: "Fine paid successfully!" });
  });
});

module.exports = router;
