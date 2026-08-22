const express = require("express");
const router = express.Router();
const db = require("../db");

// POST /api/returnBook
router.post("/", (req, res) => {
  const { book_id, user_id, return_date, actual_return_date, fine } = req.body;

  if (!book_id || !user_id || !return_date || !actual_return_date) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const updateQuery = `
    UPDATE issued_books 
    SET actual_return_date = ?, remarks = 'Returned'
    WHERE book_id = ? AND user_id = ? AND actual_return_date IS NULL
    ORDER BY id DESC LIMIT 1
  `;

  db.query(
    updateQuery,
    [actual_return_date, book_id, user_id],
    (err, result) => {
      if (err) {
        console.error("Error updating issued_books:", err);
        return res
          .status(500)
          .json({ message: "Failed to update issue record." });
      }

      const updateBookCount = `UPDATE books SET available = available + 1 WHERE id = ?`;
      db.query(updateBookCount, [book_id], (err2) => {
        if (err2) {
          console.error("Error updating book count:", err2);
          return res
            .status(500)
            .json({
              message: "Book returned, but failed to update availability.",
            });
        }

        res.status(200).json({ message: "Book returned successfully." });
      });
    }
  );
});

// GET /api/returnBook/:user_id
router.get("/:user_id", (req, res) => {
  const user_id = req.params.user_id;

  const sql = `
    SELECT b.id as book_id, b.title, ib.return_date 
    FROM issued_books ib
    JOIN books b ON ib.book_id = b.id
    WHERE ib.user_id = ? AND ib.actual_return_date IS NULL
    ORDER BY ib.id DESC LIMIT 1
  `;

  db.query(sql, [user_id], (err, result) => {
    if (err) {
      console.error("Error fetching issued book:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "No active issued book found" });
    }

    res.status(200).json(result[0]);
  });
});

module.exports = router;
