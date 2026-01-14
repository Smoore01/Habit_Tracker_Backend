import Habit from "../models/Habit.js";


export const getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.status(200).json(habits);
  } catch (error) {
    console.error("Get habits error:", error);
    res.status(500).json({ message: "Failed to fetch habits" });
  }
};


export const addHabit = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Habit name is required" });
    }

    const habit = await Habit.create({
      name,
      user: req.user.id,
    });

    res.status(201).json(habit);
  } catch (error) {
    console.error("Error adding habit:", error);
    res.status(500).json({ message: "Failed to add habit" });
  }
};

export const updateHabit = async (req, res) => {
  try {
    const habit = await Habit.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    habit.completed = !habit.completed;
    await habit.save();

    res.status(200).json(habit);
  } catch (error) {
    console.error("Update habit error:", error);
    res.status(500).json({ message: "Failed to update habit" });
  }
};

/* =========================
   DELETE HABIT
========================= */
export const deleteHabit = async (req, res) => {
  try {
    const habit = await Habit.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    res.status(200).json({ message: "Habit deleted" });
  } catch (error) {
    console.error("Delete habit error:", error);
    res.status(500).json({ message: "Failed to delete habit" });
  }
};
