import { validationResult } from "express-validator";
import Order from "../models/Order.js";

export const getOrders = async (req, res) => {
  try {
    // Query params: status (all|ready|shipped|cancelled), days (15|30|all)
    const { status = 'all', days = 'all' } = req.query;

    const query = {};

    // Map frontend tab keys to backend status values
    if (status && status !== 'all') {
      if (status === 'ready') {
        // 'ready' maps to backend 'processing' (orders ready to ship)
        query.status = { $in: ['processing'] };
      } else if (status === 'shipped') {
        query.status = { $in: ['shipped', 'delivered'] };
      } else if (status === 'cancelled') {
        query.status = 'cancelled';
      }
    }

    // Date range filter: days=N -> createdAt >= now - N days
    if (days && days !== 'all') {
      const n = Number(days);
      if (!Number.isNaN(n) && n > 0) {
        const from = new Date(Date.now() - n * 24 * 60 * 60 * 1000);
        query.createdAt = { $gte: from };
      }
    }

    const orders = await Order.find(query).sort({ updatedAt: -1 });
    res.json({ orders });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch orders', error: err.message });
  }
};

export const createOrder = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const arr = errors.array();
    console.warn('Order create validation failed:', arr, 'body=', req.body);
    return res.status(400).json({ message: 'Validation failed', errors: arr });
  }
  try {
    // Prepare payload safely and provide sensible defaults
    const payload = { ...(req.body || {}) };

    // Ensure orderNumber exists; backend will generate an ORD- id when missing
    if (!payload.orderNumber) payload.orderNumber = `ORD-${Date.now()}`;

    // Normalize platform and status to lowercase if present
    if (payload.platform) payload.platform = String(payload.platform).toLowerCase();
    if (payload.status) payload.status = String(payload.status).toLowerCase();

    // Ensure items is an array and sanitize entries
    if (!Array.isArray(payload.items)) payload.items = [];
    payload.items = payload.items.map((it) => ({
      sku: it.sku || it.name || 'Item',
      quantity: Number(it.quantity || 1),
      price: Number(it.price || 0),
    }));

    // Compute total if not provided
    let total = Number(payload.total || 0);
    if (!total || total <= 0) {
      const subtotal = payload.items.reduce((s, i) => s + (i.price * (i.quantity || 1)), 0);
      const tax = Number(payload.tax || 0);
      const shipping = Number(payload.shippingCost || 0);
      const discount = Number(payload.discountAmount || 0);
      const taxAmount = subtotal * (tax / 100 || 0);
      total = subtotal + taxAmount + shipping - discount;
    }
    payload.total = total;

    // Attach owner if available
    if (req.user?._id) payload.owner = req.user._id;

    const order = await Order.create(payload);
    res.status(201).json({ order });
  } catch (err) {
    res.status(500).json({ message: "Failed to create order", error: err.message });
  }
};

export const updateOrder = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json({ order });
  } catch (err) {
    res.status(500).json({ message: "Failed to update order", error: err.message });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    // First, try to find the order
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Optional: If you want to implement soft delete instead, you can set status to 'cancelled'
    // Uncomment the next lines to do soft delete logic:
    // order.status = "cancelled";
    // await order.save();
    // return res.json({ message: "Order cancelled", order });

    // Hard delete (remove from DB)
    await order.deleteOne();

    res.json({ message: "Order removed", deletedOrderId: order._id });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete order", error: err.message });
  }
};
