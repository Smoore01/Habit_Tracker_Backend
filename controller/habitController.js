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
    const { name, date } = req.body; // Extract date from request

    if (!name) {
      return res.status(400).json({ message: "Habit name is required" });
    }

    // Parse the date string (YYYY-MM-DD format)
    let habitDate = new Date();
    if (date) {
      if (typeof date === 'string' && date.match(/^\d{4}-\d{2}-\d{2}$/)) {
        const [year, month, day] = date.split('-').map(Number);
        habitDate = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
      } else {
        const parsedDate = new Date(date);
        habitDate = new Date(Date.UTC(
          parsedDate.getFullYear(),
          parsedDate.getMonth(),
          parsedDate.getDate(),
          12, 0, 0
        ));
      }
    }

    const habit = await Habit.create({
      name,
      date: habitDate, // Add the date field
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

    if (!habit.completed) {
      habit.completed = true;
      habit.streak += 1;
      await habit.save(); // THIS WAS MISSING
    }

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
