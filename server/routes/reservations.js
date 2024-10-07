const express = require('express');
const auth = require('../middleware/auth');
const Reservation = require('../models/Reservation');

const router = express.Router();

// Make a reservation
router.post('/', auth, async (req, res) => {
  const { customerName, contactNumber, numberOfGuests, reservationTime, tableNumber } = req.body;
  try {
    const reservation = new Reservation({ customerName, contactNumber, numberOfGuests, reservationTime, tableNumber });
    await reservation.save();
    res.status(201).json(reservation);
  } catch (error) {
    res.status(500).json({ error: 'Error making reservation' });
  }
});

// Get all reservations
router.get('/', auth, async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching reservations' });
  }
});

// Update reservation status
router.put('/:id/status', auth, async (req, res) => {
  const { status } = req.body;
  try {
    const reservation = await Reservation.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!reservation) return res.status(404).json({ error: 'Reservation not found' });
    res.json(reservation);
  } catch (error) {
    res.status(500).json({ error: 'Error updating reservation status' });
  }
});

module.exports = router;