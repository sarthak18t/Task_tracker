const express = require("express");
const Task = require("../../model/task");
const router = express.Router();
const auth = require("../../middleware/auth")
const updatePriorityLevel = async (priorityLevel) => {
  try {
    const tasks = await Task.find({ priorityLevel: { $gte: priorityLevel } });
    console.log(tasks);
    for (const task of tasks) {
      task.priorityLevel++;
      await task.save();
    }
  } catch (error) {
    console.log(error);
  }
};

router.post("/", auth, async (req, res) => {
  try {
    const { title, description, date, priorityLevel } = req.body;
    const currDate = new Date();
    if (currDate > date) {
      return res
        .status(400)
        .json({ error: "Due-date must be greater than current date" });
    }
    if (priorityLevel <= 0) {
      return res
        .status(400)
        .json({ error: "Priority level must be greater than 0" });
    }
    await updatePriorityLevel(priorityLevel);
    const task = new Task({ title, description, date, priorityLevel });
    await task.save();
    return res.status(201).json({ message: "Task added successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Task not added" });
  }
});

module.exports = router;