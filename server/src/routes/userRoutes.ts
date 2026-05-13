import express from "express";
import { User } from "../models/User.js";
import { protect } from "../middleware/authMiddleware.js";
import { AuthRequest } from "../types/express.js";
import { updateProfile, followUser, unfollowUser, searchUsers } from "../controllers/userController.js";
import { uploadAvatar } from "../controllers/profileController.js";
import { upload } from "../middleware/uploadMiddleware.js";

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

router.post(
  "/avatar",
  protect,
  upload.single("image"),
  uploadAvatar
);

router.post("/follow/:id", protect, followUser);
router.post("/unfollow/:id", protect, unfollowUser);

router.get("/search/users", protect, searchUsers);

router.get("/:id/followers", protect, async (req, res) => {
  const user = await User.findById(req.params.id)
    .populate(
      "followers",
      "name username email avatar bio"
    );

  res.json({
    followers: user?.followers,
  });
});

router.get("/:id/following", protect, async (req, res) => {
  const user = await User.findById(req.params.id)
    .populate(
      "following",
      "name username email avatar bio"
    );

  res.json({
    following: user?.following,
  });
});


router.get("/:id", protect, async (req, res) => {
  try {
    const user = await User.findById(
      req.params.id
    )
      .select("-password")
      .populate(
        "followers",
        "name username avatar"
      )
      .populate(
        "following",
        "name username avatar"
      );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(user);

  } catch (error) {
    res.status(500).json({
      message:
        "Failed to fetch user",
      error,
    });
  }
});

export default router;