const express = require("express");
const router = express.Router();
const db = require("../db");

// Issue a book
router.post("/issue", (req, res) => {
  const { book_id, user_id, issue_date, return_date, remarks, fine_paid } =
    req.body;

  if (!book_id || !user_id || !issue_date || !return_date) {
    return res.status(400).json({
      message: "Book ID, User ID, Issue Date, and Return Date are required.",
    });
  }

  const sql = `
    INSERT INTO issued_books (book_id, user_id, issue_date, return_date, remarks, fine_paid) 
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      book_id,
      user_id,
      issue_date,
      return_date,
      remarks || "",
      fine_paid || 0.0,
    ],
    (err, result) => {
      if (err) {
        console.error("Error while issuing book:", err);
        return res.status(500).json({ message: "Failed to issue the book." });
      }

      const updateSql = `UPDATE books SET available = available - 1 WHERE id = ? AND available > 0`;
      db.query(updateSql, [book_id], (err2) => {
        if (err2) {
          console.error("Error updating book availability:", err2);
          return res
            .status(500)
            .json({ message: "Book issued but availability update failed." });
        }

        return res.status(200).json({ message: "Book issued successfully!" });
      });
    }
  );
});

module.exports = router;
