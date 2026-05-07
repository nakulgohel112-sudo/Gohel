const express = require('express');
const router = express.Router();

/**
 * Get available joke categories with descriptions
 */
router.get('/', (req, res) => {
  const categories = [
    {
      id: 'any',
      name: 'Any',
      description: 'Mix of all categories',
      emoji: '😂',
      color: '#667eea'
    },
    {
      id: 'general',
      name: 'General',
      description: 'Family-friendly general jokes',
      emoji: '😄',
      color: '#ffd700'
    },
    {
      id: 'knock-knock',
      name: 'Knock-Knock',
      description: 'Classic knock-knock jokes',
      emoji: '🚪',
      color: '#ff6b6b'
    },
    {
      id: 'programming',
      name: 'Programming',
      description: 'Programming and tech jokes',
      emoji: '💻',
      color: '#00d4ff'
    },
    {
      id: 'miscellaneous',
      name: 'Miscellaneous',
      description: 'Various other jokes',
      emoji: '🎭',
      color: '#a78bfa'
    },
    {
      id: 'dark',
      name: 'Dark',
      description: 'Dark humor jokes',
      emoji: '🌑',
      color: '#333333'
    },
    {
      id: 'spooky',
      name: 'Spooky',
      description: 'Spooky and scary jokes',
      emoji: '👻',
      color: '#ff00ff'
    },
    {
      id: 'christmas',
      name: 'Christmas',
      description: 'Holiday-themed jokes',
      emoji: '🎄',
      color: '#ff0000'
    }
  ];

  res.json({ success: true, categories });
});

/**
 * Get single category info
 */
router.get('/:categoryId', (req, res) => {
  const categories = {
    'any': { name: 'Any', description: 'Mix of all categories', emoji: '😂' },
    'general': { name: 'General', description: 'Family-friendly jokes', emoji: '😄' },
    'knock-knock': { name: 'Knock-Knock', description: 'Classic knock-knock jokes', emoji: '🚪' },
    'programming': { name: 'Programming', description: 'Tech and programming jokes', emoji: '💻' },
    'miscellaneous': { name: 'Miscellaneous', description: 'Various jokes', emoji: '🎭' },
    'dark': { name: 'Dark', description: 'Dark humor', emoji: '🌑' },
    'spooky': { name: 'Spooky', description: 'Scary jokes', emoji: '👻' },
    'christmas': { name: 'Christmas', description: 'Holiday jokes', emoji: '🎄' }
  };

  const category = categories[req.params.categoryId.toLowerCase()];
  
  if (!category) {
    return res.status(404).json({ error: 'Category not found' });
  }

  res.json({ 
    success: true, 
    id: req.params.categoryId,
    ...category 
  });
});

module.exports = router;