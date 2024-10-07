const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const menuRoutes = require('./routes/menu');
const orderRoutes = require('./routes/orders');
const inventoryRoutes = require('./routes/inventory');
const reservationRoutes = require('./routes/reservations');
const invoiceRoutes = require('./routes/invoices');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/invoices', invoiceRoutes);

app.get('/', (req, res) => {
  res.send('Restaurant Management System API');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});