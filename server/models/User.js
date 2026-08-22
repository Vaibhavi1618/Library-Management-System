const db = require("../db");

// Fetch all users
const getAllUsers = (callback) => {
  const sql = "SELECT * FROM users";
  db.query(sql, callback);
};

// Add a new user
const addUser = (username, password, role, callback) => {
  const sql = "INSERT INTO users (username, password, role) VALUES (?, ?, ?)";
  db.query(sql, [username, password, role], callback);
};

// Delete a user
const deleteUser = (username, callback) => {
  const sql = "DELETE FROM users WHERE username=?";
  db.query(sql, [username], callback);
};

module.exports = {
  getAllUsers,
  addUser,
  deleteUser,
};
