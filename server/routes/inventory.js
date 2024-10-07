const express = require('express');
const auth = require('../middleware/auth');
const InventoryItem = require('../models/InventoryItem');

const router = express.Router();

// Add an inventory item
router.post('/', auth, async (req, res) => {
  if (req.user.role !== 'admin' && req.user.role !== 'manager') {
    return res.status(403).json({ error: 'Access denied' });
  }
  const { name, quantity, unit, lowStockAlert } = req.body;
  try {
    const inventoryItem = new InventoryItem({ name, quantity, unit, lowStockAlert });
    await inventoryItem.save();
    res.status(201).json(inventoryItem);
  } catch (error) {
    res.status(500).json({ error: 'Error adding inventory item' });
  }
});

// Get all inventory items
router.get('/', auth, async (req, res) => {
  try {
    const inventoryItems = await InventoryItem.find();
    res.json(inventoryItems);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching inventory items' });
  }
});

// Update inventory item quantity
router.put('/:id', auth, async (req, res) => {
  if (req.user.role !== 'admin' && req.user.role !== 'manager') {
    return res.status(403).json({ error: 'Access denied' });
  }
  const { quantity } = req.body;
  try {
    const inventoryItem = await InventoryItem.findByIdAndUpdate(req.params.id, { quantity }, { new: true });
    if (!inventoryItem) return res.status(404).json({ error: 'Inventory item not found' });
    res.json(inventoryItem);
  } catch (error) {
    res.status(500).json({ error: 'Error updating inventory item' });
  }
});

module.exports = router;