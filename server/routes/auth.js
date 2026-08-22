const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const db = require("../db");

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

// Verify Token Middleware
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token." });
  }
};

// ====================== REGISTER ROUTE ======================
router.post("/register", (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({ message: "All fields are required." });
  }

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ message: "Server error." });
    }

    const query =
      "INSERT INTO users (username, password, role) VALUES (?, ?, ?)";
    db.query(query, [username, hashedPassword, role], (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Database error." });
      }
      res.status(201).json({ message: "User registered successfully." });
    });
  });
});

// ====================== LOGIN ROUTE ======================
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
        message: "Login successful with auth",
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

// ====================== PROFILE ROUTE ======================
router.get("/profile", verifyToken, (req, res) => {
  const userId = req.user.id;

  const sql = "SELECT id, username, role FROM users WHERE id = ?";
  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Server error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(results[0]);
  });
});

module.exports = router;
