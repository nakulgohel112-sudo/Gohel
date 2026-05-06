const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Import routes
const tasksRouter = require('./routes/tasks');
const usersRouter = require('./routes/users');
const reviewsRouter = require('./routes/reviews');
const paymentsRouter = require('./routes/payments');

// Use routes
app.use('/api/tasks', tasksRouter);
app.use('/api/users', usersRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/payments', paymentsRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'QuickFix API is running' });
});

// Serve frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`🚀 QuickFix API running on http://localhost:${PORT}`);
  console.log(`📱 Frontend at http://localhost:${PORT}`);
});
