import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/AuthRoutes.js";
import habitRoutes from "./routes/habitRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://habit-tracker-ujtp.vercel.app"
    ],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Server awake");
});

connectDB(process.env.MONGO_URI);

app.use("/api/auth", authRoutes);
app.use("/api/habits", habitRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
