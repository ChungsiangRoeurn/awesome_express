import { Router } from "express";
import { db } from "../lib/db.js";

export const productRoute = Router();

// CREATE product
productRoute.post("/", (req, res) => {
  const { name, description, price, quantity } = req.body;
  const sql =
    "INSERT INTO products (name, description, price, quantity) VALUES (?, ?, ?, ?)";
  db.query(sql, [name, description, price, quantity], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res
      .status(201)
      .json({ message: "Product created", productId: results.insertId });
  });
});

// READ all products
productRoute.get("/", (req, res) => {
  db.query("SELECT * FROM products", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// READ single product by id
productRoute.get("/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM products WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0)
      return res.status(404).json({ message: "Product not found" });
    res.json(results[0]);
  });
});

// UPDATE product by id
productRoute.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, description, price, quantity } = req.body;
  const sql =
    "UPDATE products SET name=?, description=?, price=?, quantity=? WHERE id=?";
  db.query(sql, [name, description, price, quantity, id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Product updated" });
  });
});

// DELETE product by id
productRoute.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM products WHERE id=?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Product deleted" });
  });
});
