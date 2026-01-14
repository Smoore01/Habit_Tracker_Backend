import express from "express";
import protect from "../middleware/authmiddleware.js";
import {
    getHabits,
    addHabit,
    updateHabit,
    deleteHabit,
  } from "../controller/habitController.js";
  

const router = express.Router();

// 🔒 Protect all habit routes
router.use(protect);

router.get("/", getHabits);
router.post("/", addHabit);
router.put("/:id", updateHabit);
router.delete("/:id", deleteHabit);

export default router;
