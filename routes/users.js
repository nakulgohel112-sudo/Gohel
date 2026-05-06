const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

// In-memory storage (replace with MongoDB in production)
let users = [];

// Register new user
router.post('/register', (req, res) => {
  const { name, phone, email } = req.body;
  
  if (!name || !phone) {
    return res.status(400).json({ error: 'Name and phone are required' });
  }

  // Check if user already exists
  if (users.find(u => u.phone === phone)) {
    return res.status(400).json({ error: 'User already registered' });
  }

  const user = {
    id: uuidv4(),
    name,
    phone,
    email,
    tasksDone: 0,
    totalEarnings: 0,
    avgSpeed: '2.1m',
    rating: 4.9,
    createdAt: new Date()
  };

  users.push(user);
  res.status(201).json({ success: true, data: user });
});

// Get user by ID
router.get('/:id', (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ success: true, data: user });
});

// Get user by phone
router.get('/phone/:phone', (req, res) => {
  const user = users.find(u => u.phone === req.params.phone);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ success: true, data: user });
});

// Update user earnings
router.patch('/:id/earnings', (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });

  const { amount } = req.body;
  user.totalEarnings += amount;
  user.tasksDone += 1;

  res.json({ success: true, data: user });
});

// Get all users
router.get('/', (req, res) => {
  res.json({ success: true, data: users });
});

module.exports = router;
