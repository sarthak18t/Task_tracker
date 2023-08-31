const express = require("express");
const Task = require("../../model/task");
const router = express.Router();
const auth = require("../../middleware/auth");
const { mongoose } = require("mongoose");
const updatePriorityLevel = async (priorityLevel) => {
  try {
    const tasks = await Task.find({ priorityLevel: { $gte: priorityLevel } });
    console.log(tasks);
    for (const task of tasks) {
      task.priorityLevel++;
      await task.save();
      console.log("223e23")
    }
  } catch (error) {
    console.log(error);
  }
};

router.post("/", auth, async (req, res) => {
  try {
    console.log("1")
    const { title, description, date, priorityLevel } = req.body;
    console.log("2")
    const currDate = new Date();
    const dueDate = new Date(date);
    console.log(currDate);
    if (currDate > dueDate) {
      return res
        .status(400)
        .json({ error: "Due-date must be greater than current date" });
    }
    if (priorityLevel <= 0) {
      return res
        .status(400)
        .json({ error: "Priority level must be greater than 0" });
    }
    const sameTitle = await Task.findOne({ title });
    console.log(sameTitle)
    if (sameTitle && !sameTitle.completed) {
      return res
        .status(400)
        .json({ error: "Title already exists which is not completed yet" });
    }
    console.log("4")
    await updatePriorityLevel(priorityLevel);
    const task = new Task({ title, description, date, priorityLevel });
    await task.save();
    return res.status(201).json({ message: "Task added successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Task not added" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find().sort({ priorityLevel: 1, date: 1 });
    return res.status(201).json({ tasks: tasks });
  } catch (error) {
    return res.status(400).json({ error: "error in loading tasks" });
  }
});

router.put("/:taskID", auth, async (req, res) => {
  try {
    const { title, description, date, completed } = req.body;
    const taskID = req.params.taskID;
    console.log(taskID);
    const task = await Task.findById(taskID);
    if (!task) {
      return res.status(404).json({ error: "no task found" });
    }
    task.title = title;
    task.description = description;
    task.date = date;
    task.completed = completed;
    await task.save();

    return res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:taskID", auth, async (req, res) => {
  try {
    const taskId = req.params.taskID;
    const removedTask = await Task.findByIdAndDelete(taskId);
    if (!removedTask) {
      return res.status(404).json({ error: "no task found" });
    }
    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
