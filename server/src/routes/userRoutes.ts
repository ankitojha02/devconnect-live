import express from "express";
import { User } from "../models/User.js";
import { protect } from "../middleware/authMiddleware.js";
import { AuthRequest } from "../types/express.js";

const router = express.Router();

// router.get("/profile", protect, (req, res) => {
//   res.json({
//     message: "Protected route accessed ✅",
//     userId: (req as any).userId,
//   });
// });

router.get("/profile", protect, async (req : AuthRequest, res) => {
  const user = await User.findById(req.userId).select("-password");

  res.json({
    message: "User profile fetched ✅",
    user,
  });
});

export default router;