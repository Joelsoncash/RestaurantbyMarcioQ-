const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  tableNumber: { type: Number },
  customerName: { type: String },
  items: [{
    menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' },
    quantity: { type: Number, required: true }
  }],
  status: { type: String, enum: ['pending', 'preparing', 'served', 'completed'], default: 'pending' },
  totalAmount: { type: Number, required: true },
  orderType: { type: String, enum: ['dine-in', 'takeout', 'delivery'], required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);