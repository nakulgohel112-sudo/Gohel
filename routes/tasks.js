const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

// In-memory storage (replace with MongoDB in production)
let tasks = [];

// Get all tasks
router.get('/', (req, res) => {
  res.json({ success: true, data: tasks });
});

// Get task by ID
router.get('/:id', (req, res) => {
  const task = tasks.find(t => t.id === req.params.id);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json({ success: true, data: task });
});

// Create new task
router.post('/', (req, res) => {
  const { category, description, userId } = req.body;
  
  if (!category || !description || !userId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const priceMap = {
    'Tech Help': 149,
    'Quick Research': 99,
    'Writing & Editing': 129
  };

  const task = {
    id: uuidv4(),
    category,
    description,
    userId,
    price: priceMap[category] || 0,
    status: 'pending', // pending, solving, done
    createdAt: new Date(),
    solvedAt: null,
    solution: null
  };

  tasks.push(task);
  res.status(201).json({ success: true, data: task });
});

// Update task status
router.patch('/:id', (req, res) => {
  const task = tasks.find(t => t.id === req.params.id);
  if (!task) return res.status(404).json({ error: 'Task not found' });

  const { status, solution } = req.body;
  if (status) task.status = status;
  if (solution) {
    task.solution = solution;
    task.solvedAt = new Date();
  }

  res.json({ success: true, data: task });
});

// Delete task
router.delete('/:id', (req, res) => {
  tasks = tasks.filter(t => t.id !== req.params.id);
  res.json({ success: true, message: 'Task deleted' });
});

module.exports = router;
