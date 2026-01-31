import { db } from "../lib/db.js";

export const authRepository = {
  create: (username, email, hashedPassword) => {
    return new Promise((resolve, reject) => {
      const sql =
        "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
      db.query(sql, [username, email, hashedPassword], (err, result) => {
        if (err) reject(err);
        else resolve(result.insertId);
      });
    });
  },

  // Login
  findByEmail: (email) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        (err, results) => {
          if (err) reject(err);
          else resolve(results[0]);
        },
      );
    });
  },

  // Forget password
  updatePassword: (userId, hashedPassword) => {
    return new Promise((resolve, reject) => {
      const sql = "UPDATE users SET password = ? WHERE id = ?";
      db.query(sql, [hashedPassword, userId], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  },

  saveResetToken(userId, token, expiresAt) {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO password_reset (user_id, token, expires_at)
        VALUES (?, ?, ?)
      `;
      db.query(sql, [userId, token, expiresAt], (err) =>
        err ? reject(err) : resolve(),
      );
    });
  },

  findResetToken(token) {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT * FROM password_reset
        WHERE token = ? AND expires_at > NOW()
      `;
      db.query(sql, [token], (err, rows) =>
        err ? reject(err) : resolve(rows[0]),
      );
    });
  },

  updatePassword(userId, hashedPassword) {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE users SET password = ? WHERE id = ?",
        [hashedPassword, userId],
        (err) => (err ? reject(err) : resolve()),
      );
    });
  },

  deleteResetToken(token) {
    return new Promise((resolve, reject) => {
      db.query("DELETE FROM password_reset WHERE token = ?", [token], (err) =>
        err ? reject(err) : resolve(),
      );
    });
  },
};
