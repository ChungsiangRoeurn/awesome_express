import { orderRepository } from "../respositories/order-repo.js";

export const orderService = {
  async createOrder(userId, items) {
    // calculate price
    let total = 0;
    items.forEach((item) => {
      total += item.price * item.quantity;
    });
    // create order
    const orderId = await orderRepository.createOrder(userId, total);

    // Add item
    for (const item of items) {
      await orderRepository.addOrderItem(
        orderId,
        item.productId,
        item.quantity,
      );
    }

    return orderId;
  },

  async getOrders(userId) {
    const rows = await orderRepository.getOrdersByUser(userId);

    // group item by order
    const orders = [];
    rows.forEach((row) => {
      if (!orders[row.order_id]) {
        orders[row.order_id] = {
          id: row.order_id,
          total_price: row.total_price,
          status: row.status,
          created_at: row.created_at,
          items: [],
        };
      }

      if (row.order_item_id) {
        orders[row.order_id].items.push({
          id: row.order_item_id,
          product_id: row.product_id,
          name: row.product_name,
          price: row.product_price,
          quantity: row.quantity,
        });
      }
    });

    return Object.values(orders);
  },

  updateOrderStatus: (orderId, status) =>
    orderRepository.updateStatus(orderId, status),
  deleteOrder: (orderId) => orderRepository.deleteOrder(orderId),
};
