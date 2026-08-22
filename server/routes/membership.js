const express = require("express");
const router = express.Router();
const db = require("../db");

// Get all memberships
router.get("/", (req, res) => {
  db.query("SELECT * FROM memberships", (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
});

// Add a new membership
router.post("/add", (req, res) => {
  console.log("Received data:", req.body); //

  const { user_id, type, start_date, end_date } = req.body;

  if (!user_id || isNaN(user_id) || !type || !start_date || !end_date) {
    return res.status(400).json({
      message: "All fields are required and user_id must be a number.",
    });
  }

  const sql =
    "INSERT INTO memberships (user_id, type, start_date, end_date) VALUES (?, ?, ?, ?)";

  db.query(sql, [user_id, type, start_date, end_date], (err, result) => {
    if (err) {
      console.error("DB insert error:", err); //
      return res.status(500).json({ error: err });
    }
    res.json({ message: "Membership added successfully." });
  });
});

router.put("/update/:id", (req, res) => {
  const membershipId = req.params.id;
  const { type, start_date, end_date } = req.body;

  if (!type || !start_date || !end_date) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const sql = `
    UPDATE memberships 
    SET type = ?, start_date = ?, end_date = ? 
    WHERE id = ?
  `;

  db.query(sql, [type, start_date, end_date, membershipId], (err, result) => {
    if (err) {
      console.error("DB update error:", err);
      return res.status(500).json({ error: err });
    }
    res.json({ message: "Membership updated successfully." });
  });
});

module.exports = router;
