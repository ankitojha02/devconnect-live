import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { sendMessage } from "../controllers/messageController.js";

const router = express.Router();

router.post("/send", protect, sendMessage);

export default router;