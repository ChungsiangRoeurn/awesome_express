import { orderService } from "../services/order-service.js";

export const orderController = {
  create: async (req, res) => {
    try {
      const userId = req.body.userId; // In real app, get from JWT
      const items = req.body.items; // [{ productId, quantity, price }]
      const orderId = await orderService.createOrder(userId, items);

      res.json({ success: true, message: "Order created", orderId });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  list: async (req, res) => {
    try {
      const userId = req.query.userId; // In real app, get from JWT
      const orders = await orderService.getOrders(userId);

      res.json({ success: true, orders });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  updateStatus: async (req, res) => {
    try {
      const { orderId, status } = req.body;
      await orderService.updateOrderStatus(orderId, status);

      res.json({ success: true, message: "Order status updated" });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  delete: async (req, res) => {
    try {
      const orderId = req.params.id;
      await orderService.deleteOrder(orderId);

      res.json({ success: true, message: "Order deleted" });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },
};
