const mongoose = require('mongoose');

const InventoryItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, required: true },
  lowStockAlert: { type: Number, default: 10 }
});

module.exports = mongoose.model('InventoryItem', InventoryItemSchema);