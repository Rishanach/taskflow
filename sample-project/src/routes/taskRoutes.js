const express = require('express');
const Task = require('../models/Task');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// All task routes require authentication
router.use(requireAuth);

// GET /tasks — list all tasks for the logged-in user
router.get('/', (req, res) => {
  const tasks = Task.findByUserId(req.userId);
  res.json(tasks);
});

// POST /tasks — create a new task
router.post('/', (req, res) => {
  const { title } = req.body;
  const error = Task.validateTitle(title);
  if (error) {
    return res.status(400).json({ error });
  }
  const task = Task.create(req.userId, title);
  res.status(201).json(task);
});

// PATCH /tasks/:id — update a task (e.g. mark complete)
router.patch('/:id', (req, res) => {
  const task = Task.findById(req.params.id);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  if (task.userId !== req.userId) return res.status(403).json({ error: 'Forbidden' });

  if ('title' in req.body) {
    const error = Task.validateTitle(req.body.title);
    if (error) return res.status(400).json({ error });
  }

  const updated = Task.update(req.params.id, req.body);
  res.json(updated);
});

// DELETE /tasks/:id — delete a task
router.delete('/:id', (req, res) => {
  const task = Task.findById(req.params.id);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  if (task.userId !== req.userId) return res.status(403).json({ error: 'Forbidden' });

  Task.delete(req.params.id);
  res.json({ message: 'Task deleted' });
});

module.exports = router;
