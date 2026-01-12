import express from "express";
import protect from "../middleware/authmiddleware.js";
import { getAllHabits, addHabit, markHabitDone, deleteHabit, } from "../controller/habitController.js";

const router = express.Router();

// 🔒 USER MUST BE LOGGED IN FOR ALL ROUTES BELOW
router.use(protect);

router.get("/", getAllHabits);
router.post("/", addHabit);
router.put("/:id/done", markHabitDone);
router.delete("/:id", deleteHabit);

export default router;
