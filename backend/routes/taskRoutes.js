const express = require('express');
const Task = require('../models/taskModel');

const router = express.Router();

router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const tasks = await Task.find({ userId });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching tasks', error: err.message });
  }
});

router.post('/', async (req, res) => {
  const { title, userId } = req.body;

  try {
    const task = new Task({ title, userId });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Error creating task', error: err.message });
  }
});

// router.put('/:id', async (req, res) => {
//   const { id } = req.params;
//   const { title, userId } = req.body;

//   try {
//     const task = await Task.findOneAndUpdate({ _id: id, userId }, { title }, { new: true });
//     if (!task) return res.status(404).json({ message: 'Task not found' });
//     res.status(200).json(task);
//   } catch (err) {
//     res.status(500).json({ message: 'Error updating task', error: err.message });
//   }
// });

router.put('/:id', async (req, res) => {
  const { id } = req.params; 
  const { title, userId } = req.body; 

  try {
    const task = await Task.findOneAndUpdate(
      { _id: id, userId }, 
      { title },           
      { new: true }      
    );

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Error updating task', error: err.message });
  }
});


router.delete('/:id/:userId', async (req, res) => {
  const { id, userId } = req.params;

  try {
    const task = await Task.findOneAndDelete({ _id: id, userId });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting task', error: err.message });
  }
});

router.patch('/:id/complete/:userId', async (req, res) => {
  const { id, userId } = req.params;

  try {
    const task = await Task.findOneAndUpdate({ _id: id, userId }, { status: 'completed' }, { new: true });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Error marking task as completed', error: err.message });
  }
});

module.exports = router;