const express = require('express');
const auth = require('../middleware/auth');
const Invoice = require('../models/Invoice');
const Order = require('../models/Order');

const router = express.Router();

// Generate an invoice
router.post('/', auth, async (req, res) => {
  const { orderId } = req.body;
  try {
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    const invoice = new Invoice({ order: orderId, amount: order.totalAmount });
    await invoice.save();
    res.status(201).json(invoice);
  } catch (error) {
    res.status(500).json({ error: 'Error generating invoice' });
  }
});

// Get all invoices
router.get('/', auth, async (req, res) => {
  try {
    const invoices = await Invoice.find().populate('order');
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching invoices' });
  }
});

// Update invoice status
router.put('/:id/status', auth, async (req, res) => {
  const { status } = req.body;
  try {
    const invoice = await Invoice.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!invoice) return res.status(404).json({ error: 'Invoice not found' });
    res.json(invoice);
  } catch (error) {
    res.status(500).json({ error: 'Error updating invoice status' });
  }
});

module.exports = router;