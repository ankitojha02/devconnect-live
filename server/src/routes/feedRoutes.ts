import express from "express";

import { protect } from "../middleware/authMiddleware.js";

import { getFeed } from "../controllers/feedController.js";

const router = express.Router();

router.get("/", protect, getFeed);

export default router;