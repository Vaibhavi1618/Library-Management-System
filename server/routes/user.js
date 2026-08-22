const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const db = require("../db");

// Add User
router.post("/add", async (req, res) => {
  const { username, password, role } = req.body;

  try {
    User.getAllUsers((err, users) => {
      if (err) return res.status(500).json({ message: "Server error" });

      const existingUser = users.find((user) => user.username === username);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists!" });
      }

      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err)
          return res.status(500).json({ message: "Error hashing password" });

        User.addUser(username, hashedPassword, role, (err, result) => {
          if (err) return res.status(500).json({ message: "Server error" });

          res.status(201).json({ message: "User registered successfully!" });
        });
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Login User
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  try {
    User.getAllUsers((err, users) => {
      if (err) return res.status(500).json({ message: "Server error" });

      const user = users.find((user) => user.username === username);
      if (!user)
        return res.status(400).json({ message: "Invalid credentials!" });

      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err || !isMatch) {
          return res.status(400).json({ message: "Invalid credentials!" });
        }

        const token = jwt.sign(
          { id: user.id, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );

        res.status(200).json({
          token,
          user: {
            id: user.id,
            username: user.username,
            role: user.role,
          },
        });
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get All Users
router.get("/", (req, res) => {
  User.getAllUsers((err, users) => {
    if (err) return res.status(500).json({ message: "Server error" });
    res.status(200).json(users);
  });
});

// Delete User
router.delete("/:username", (req, res) => {
  const { username } = req.params;

  User.deleteUser(username, (err, result) => {
    if (err) return res.status(500).json({ message: "Server error" });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.status(200).json({ message: "User deleted successfully!" });
  });
});

// Get user profile by token
router.get("/profile/:id", (req, res) => {
  const userId = req.params.id;
  const sql = "SELECT id, username, role FROM users WHERE id = ?";

  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error("Error fetching user profile:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(result[0]);
  });
});

module.exports = router;
