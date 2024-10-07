const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  contactNumber: { type: String, required: true },
  numberOfGuests: { type: Number, required: true },
  reservationTime: { type: Date, required: true },
  tableNumber: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' }
});

module.exports = mongoose.model('Reservation', ReservationSchema);