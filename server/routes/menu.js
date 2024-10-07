const express = require('express');
const auth = require('../middleware/auth');
const MenuItem = require('../models/MenuItem');

const router = express.Router();

// Add a menu item
router.post('/', auth, async (req, res) => {
  if (req.user.role !== 'admin' && req.user.role !== 'manager') {
    return res.status(403).json({ error: 'Access denied' });
  }
  const { name, category, price, description, availability } = req.body;
  try {
    const menuItem = new MenuItem({ name, category, price, description, availability });
    await menuItem.save();
    res.status(201).json(menuItem);
  } catch (error) {
    res.status(500).json({ error: 'Error adding menu item' });
  }
});

// Get all menu items
router.get('/', async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching menu items' });
  }
});

// Update a menu item
router.put('/:id', auth, async (req, res) => {
  if (req.user.role !== 'admin' && req.user.role !== 'manager') {
    return res.status(403).json({ error: 'Access denied' });
  }
  const { name, category, price, description, availability } = req.body;
  try {
    const menuItem = await MenuItem.findByIdAndUpdate(req.params.id, { name, category, price, description, availability }, { new: true });
    if (!menuItem) return res.status(404).json({ error: 'Menu item not found' });
    res.json(menuItem);
  } catch (error) {
    res.status(500).json({ error: 'Error updating menu item' });
  }
});

// Delete a menu item
router.delete('/:id', auth, async (req, res) => {
  if (req.user.role !== 'admin' && req.user.role !== 'manager') {
    return res.status(403).json({ error: 'Access denied' });
  }
  try {
    const menuItem = await MenuItem.findByIdAndDelete(req.params.id);
    if (!menuItem) return res.status(404).json({ error: 'Menu item not found' });
    res.json({ message: 'Menu item deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting menu item' });
  }
});

module.exports = router;