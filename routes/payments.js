const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

// In-memory storage (replace with actual payment gateway in production)
let payments = [];

// Create payment (UPI)
router.post('/create-upi', (req, res) => {
  const { userId, taskId, amount, upiId } = req.body;
  
  if (!userId || !taskId || !amount || !upiId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const payment = {
    id: uuidv4(),
    userId,
    taskId,
    amount,
    upiId,
    status: 'pending', // pending, success, failed
    method: 'upi',
    createdAt: new Date(),
    completedAt: null,
    deepLink: `upi://pay?pa=${upiId}&pn=QuickFix&am=${amount}&cu=INR&tn=Task%20Payment`
  };

  payments.push(payment);
  res.status(201).json({ success: true, data: payment });
});

// Verify payment
router.patch('/:id/verify', (req, res) => {
  const payment = payments.find(p => p.id === req.params.id);
  if (!payment) return res.status(404).json({ error: 'Payment not found' });

  const { status } = req.body;
  payment.status = status;
  if (status === 'success') {
    payment.completedAt = new Date();
  }

  res.json({ success: true, data: payment });
});

// Get payment by ID
router.get('/:id', (req, res) => {
  const payment = payments.find(p => p.id === req.params.id);
  if (!payment) return res.status(404).json({ error: 'Payment not found' });
  res.json({ success: true, data: payment });
});

// Get all payments for user
router.get('/user/:userId', (req, res) => {
  const userPayments = payments.filter(p => p.userId === req.params.userId);
  res.json({ success: true, data: userPayments });
});

module.exports = router;
