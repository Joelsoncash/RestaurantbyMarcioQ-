const express = require('express');
const auth = require('../middleware/auth');
const Order = require('../models/Order');
const MenuItem = require('../models/MenuItem');

const router = express.Router();

// Place an order
router.post('/', auth, async (req, res) => {
  const { tableNumber, customerName, items, orderType } = req.body;
  try {
    let totalAmount = 0;
    for (const item of items) {
      const menuItem = await MenuItem.findById(item.menuItem);
      if (!menuItem) return res.status(404).json({ error: 'Menu item not found' });
      totalAmount += menuItem.price * item.quantity;
    }
    const order = new Order({ tableNumber, customerName, items, totalAmount, orderType });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Error placing order' });
  }
});

// Get all orders
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find().populate('items.menuItem');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching orders' });
  }
});

// Update order status
router.put('/:id/status', auth, async (req, res) => {
  const { status } = req.body;
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Error updating order status' });
  }
});

module.exports = router;