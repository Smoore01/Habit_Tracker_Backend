// controllers/habitController.js
import Habit from "../models/Habit.js";

// GET habits for logged-in user
export const getAllHabits = async (req, res) => {
  try {
    const habits = await Habit.find({ user: req.user }).sort({ date: -1 });
    res.json(habits);
  } catch (error) {
    res.status(500).json({ message: "Error fetching habits" });
  }
};

// ADD habit
export const addHabit = async (req, res) => {
    try {
      const { name, date } = req.body;
  
      if (!name || !date) {
        return res.status(400).json({
          message: "Name and date are required"
        });
      }
  
      const habit = await Habit.create({
        name,
        date: new Date(date),
        user: req.user, // or req.user._id
      });
  
      return res.status(201).json(habit);
    } catch (error) {
      console.error("Error adding habit:", error);
  
      return res.status(500).json({
        message: "Failed to add habit",
        error: error.message
      });
    }
}

// MARK habit done
export const markHabitDone = async (req, res) => {
  try {
    const habit = await Habit.findOne({
      _id: req.params.id,
      user: req.user,
    });

    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    habit.completed = true;
    habit.streak += 1;

    const updatedHabit = await habit.save();
    res.json(updatedHabit);
  } catch (error) {
    res.status(500).json({ message: "Error updating habit" });
  }
};

// DELETE habit
export const deleteHabit = async (req, res) => {
  try {
    const habit = await Habit.findOne({
      _id: req.params.id,
      user: req.user,
    });

    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    await habit.deleteOne();
    res.json({ message: "Habit removed" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting habit" });
  }
};
