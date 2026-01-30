import { db } from "../lib/db.js";

export const productRepository = {
  findAll: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM products", (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  },

  findById: (id) => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM products WHERE id = ?", [id], (err, results) => {
        if (err) return reject(err);
        resolve(results[0]);
      });
    });
  },

  create: (data) => {
    const { name, description, price, quantity } = data;
    return new Promise((resolve, reject) => {
      const sql =
        "INSERT INTO products (name, description, price, quantity) VALUES (?, ?, ?, ?)";
      db.query(sql, [name, description, price, quantity], (err, results) => {
        if (err) reject(err);
        else resolve(results.insertId);
      });
    });
  },

  update: (id, data) => {
    const { name, description, price, quantity } = data;
    const sql = `
      UPDATE products 
      SET name = ?, description = ?, price = ?, quantity = ? 
      WHERE id = ?
    `;
    return new Promise((resolve, reject) => {
      db.query(
        sql,
        [name, description, price, quantity, id],
        (err, results) => {
          if (err) return reject(err);
          resolve(results.affectedRows);
        },
      );
    });
  },

  remove: (id) => {
    const sql = "DELETE FROM products WHERE id = ?";
    return new Promise((resolve, reject) => {
      db.query(sql, [id], (err, results) => {
        if (err) return reject(err);
        resolve(results.affectedRows);
      });
    });
  },
};
