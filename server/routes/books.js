const express = require("express");
const router = express.Router();
const db = require("../db");
// Add Book
router.post("/add", (req, res) => {
  const { title, author, serial_no, type, available } = req.body;

  if (!title || !author || !serial_no || !type || !available) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sql =
    "INSERT INTO books (title, author, serial_no, type, available) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [title, author, serial_no, type, available], (err, result) => {
    if (err) {
      console.error("Error adding book:", err);
      return res.status(500).json({ message: "Error adding book" });
    }
    res.status(200).json({ message: "Book added successfully!" });
  });
});

// Search Books
router.get("/search", (req, res) => {
  const { keyword } = req.query;
  const sql =
    "SELECT * FROM books WHERE title LIKE ? OR author LIKE ? OR serial_no LIKE ?";
  const query = `%${keyword}%`;
  db.query(sql, [query, query, query], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
});

// Fetch available books
router.get("/available", (req, res) => {
  const sql = "SELECT * FROM books WHERE available > 0";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching available books:", err);
      return res
        .status(500)
        .json({ message: "Error fetching available books" });
    }
    console.log(result);
    res.json(result);
  });
});

// Count available books per category
router.get("/available-count", (req, res) => {
  const sql = `
    SELECT 
      type, 
      COUNT(*) as available_count
    FROM books 
    WHERE available > 0
    GROUP BY type;
  `;
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching available books:", err);
      return res
        .status(500)
        .json({ message: "Error fetching available books" });
    }
    res.json(result);
  });
});

module.exports = router;
