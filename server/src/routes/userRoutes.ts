import express from "express";
import { User } from "../models/User.js";
import { protect } from "../middleware/authMiddleware.js";
import { AuthRequest } from "../types/express.js";
import { updateProfile, followUser, unfollowUser, searchUsers } from "../controllers/userController.js";

const router = express.Router();

// router.get("/profile", protect, (req, res) => {
//   res.json({
//     message: "Protected route accessed ✅",
//     userId: (req as any).userId,
//   });
// });

router.get("/profile", protect, async (req : AuthRequest, res) => {
  const user = await User.findById(req.userId).select("-password").populate("followers", "name email").populate("following", "name email");

  res.json({
    message: "User profile fetched ✅",
    user,
  });
});

router.put("/profile", protect, updateProfile);
router.post("/follow/:id", protect, followUser);
router.post("/unfollow/:id", protect, unfollowUser);

router.get("/search/users", protect, searchUsers);

router.get("/:id/followers", protect, async (req, res) => {
  const user = await User.findById(req.params.id)
    .populate("followers", "name email");

  res.json({
    followers: user?.followers,
  });
});

router.get("/:id/following", protect, async (req, res) => {
  const user = await User.findById(req.params.id)
    .populate("following", "name email");

  res.json({
    following: user?.following,
  });
});
export default router;