import express from "express";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.send("DevConnect API Running 🚀");
});

app.use("/api/auth", authRoutes);

export default app;