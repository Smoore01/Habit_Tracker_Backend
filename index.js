import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/AuthRoutes.js";
import habitRoutes from "./routes/habitRoutes.js";

dotenv.config();

const app = express();


app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


app.use(express.json());


connectDB(process.env.MONGO_URI);


app.get("/", (req, res) => {
  res.status(200).send("API is running");
});

app.use("/api/auth", authRoutes);
app.use("/api/habits", habitRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
