import { db } from "../lib/db.js";

export const orderRepository = {
  // Create a new order
  createOrder: (userId, totalPrice, status = "pending") => {
    return new Promise((resolve, reject) => {
      const sql =
        "INSERT INTO orders (user_id, total_price, status) VALUES (?, ?, ?)";
      db.query(sql, [userId, totalPrice, status], (err, result) => {
        if (err) reject(err);
        else resolve(result.insertId);
      });
    });
  },

  // Add an item to the order
  addOrderItem: (orderId, productId, quantity) => {
    return new Promise((resolve, reject) => {
      const sql =
        "INSERT INTO order_items(order_id, product_id, quantity) VALUE(?, ?, ?) ";
      db.query(sql, [orderId, productId, quantity], (err, result) => {
        if (err) reject(err);
        else resolve(result.insertId);
      });
    });
  },

  getOrdersByUser: (userId) => {
    return new Promise((resolve, reject) => {
      const sql = `
      SELECT o.id as order_id, o.total_price, o.status, o.created_at,
             oi.id as order_item_id, oi.product_id, oi.quantity,
             p.name as product_name, p.price as product_price
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      LEFT JOIN products p ON oi.product_id = p.id
      WHERE o.user_id = ?
      ORDER BY o.id DESC
    `;
      db.query(sql, [userId], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },

  // Update order status
  updateStatus: (orderId, status) => {
    return new Promise((resolve, reject) => {
      const sql = "UPDATE orders SET status = ? WHERE id = ?";
      db.query(sql, [status, orderId], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  },

  // Delete orders
  deleteOrder: (orderId) => {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM orders WHERE id = ?";
      db.query(sql, [orderId], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  },
};
