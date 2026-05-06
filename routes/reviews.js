const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

// In-memory storage (replace with MongoDB in production)
let reviews = [
  {
    id: uuidv4(),
    name: 'Priya M.',
    rating: 5,
    text: 'Fixed my Python error in literally 2 minutes. Saved me hours of headache. Will definitely come back!',
    category: 'Tech Help',
    price: 149,
    createdAt: new Date('2026-05-05')
  },
  {
    id: uuidv4(),
    name: 'Arjun K.',
    rating: 5,
    text: 'Needed a LinkedIn bio urgently for a job application. Got a professional one in under 3 mins. Amazing!',
    category: 'Writing & Editing',
    price: 129,
    createdAt: new Date('2026-05-04')
  },
  {
    id: uuidv4(),
    name: 'Sneha R.',
    rating: 4,
    text: 'Researched the best budget phones for me quickly. Clear, well-organized answer. Great value for ₹99.',
    category: 'Research',
    price: 99,
    createdAt: new Date('2026-05-03')
  }
];

// Get all reviews
router.get('/', (req, res) => {
  res.json({ success: true, data: reviews });
});

// Create new review
router.post('/', (req, res) => {
  const { name, rating, text, category, price, userId } = req.body;
  
  if (!name || !rating || !text) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const review = {
    id: uuidv4(),
    name,
    rating: parseInt(rating),
    text,
    category: category || 'General',
    price: price || 0,
    userId,
    createdAt: new Date()
  };

  reviews.push(review);
  res.status(201).json({ success: true, data: review });
});

// Get review by ID
router.get('/:id', (req, res) => {
  const review = reviews.find(r => r.id === req.params.id);
  if (!review) return res.status(404).json({ error: 'Review not found' });
  res.json({ success: true, data: review });
});

// Delete review
router.delete('/:id', (req, res) => {
  reviews = reviews.filter(r => r.id !== req.params.id);
  res.json({ success: true, message: 'Review deleted' });
});

module.exports = router;
