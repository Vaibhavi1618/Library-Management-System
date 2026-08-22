const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../db");

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const query = "SELECT * FROM users WHERE username = ?";
  db.query(query, [username], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Server error." });
    }

    if (result.length === 0) {
      return res.status(401).json({ message: "Invalid username or password." });
    }

    const user = result[0];

    // Compare hashed password
    bcrypt.compare(password, user.password, (err, match) => {
      if (err || !match) {
        return res
          .status(401)
          .json({ message: "Invalid username or password." });
      }

      const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
        expiresIn: "1h",
      });

      res.status(200).json({
        message: "Login successful",
        token,
        user: {
          id: user.id,
          username: user.username,
          role: user.role,
        },
      });
    });
  });
});

module.exports = router;
