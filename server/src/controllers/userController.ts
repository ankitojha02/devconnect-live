// controllers/userController.ts
import { Request, Response } from "express";
import { User } from "../models/User.js";
import { AuthRequest } from "../types/express.js";
import { Notification } from "../models/Notification.js";

export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    const { name, bio } = req.body;

    const user = await User.findByIdAndUpdate(
      req.userId,
      { name, bio },
      { new: true }
    ).select("-password");

    res.json({ message: "Profile updated ✅", user });
  } catch (error) {
    res.status(500).json({ message: "Update failed", error });
  }
};

export const followUser = async (req: AuthRequest, res: Response) => {
  try {
    const targetUserId = req.params.id as string;
    const currentUserId = req.userId as string;

    if (targetUserId === currentUserId) {
      return res.status(400).json({
        message: "Cannot follow yourself",
      });
    }

    const user = await User.findById(currentUserId);
    const targetUser = await User.findById(targetUserId);

    if (!user || !targetUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.following.includes(targetUserId as any)) {
      return res.status(400).json({
        message: "Already following",
      });
    }

    user.following.push(targetUserId as any);
    targetUser.followers.push(currentUserId as any);

    await user.save();
    await targetUser.save();

    await Notification.create({
  sender: currentUserId,
  receiver: targetUserId as string,
  type: "follow",
});

    res.json({
      message: "Followed successfully ✅",
    });
  } catch (error) {
    res.status(500).json({
      message: "Follow failed",
      error,
    });
  }
};

export const unfollowUser = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const targetUserId = req.params.id;
    const currentUserId = req.userId;

    const user = await User.findById(currentUserId);
    const targetUser = await User.findById(targetUserId);

    if (!user || !targetUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.following = user.following.filter(
      (id) => id.toString() !== targetUserId
    );

    targetUser.followers = targetUser.followers.filter(
      (id) => id.toString() !== currentUserId
    );

    await user.save();
    await targetUser.save();

    res.json({
      message: "Unfollowed successfully ❌",
    });
  } catch (error) {
    res.status(500).json({
      message: "Unfollow failed",
      error,
    });
  }
};

export const searchUsers = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const keyword = req.query.search;

   const users = await User.find({
  $or: [
    {
      name: {
        $regex: keyword,
        $options: "i",
      },
    },

    {
      email: {
        $regex: keyword,
        $options: "i",
      },
    },
  ],
} as any).select("-password");

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: "Search failed",
      error,
    });
  }
};