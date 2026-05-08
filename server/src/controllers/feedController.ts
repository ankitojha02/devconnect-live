import { Response } from "express";
import { AuthRequest } from "../types/express.js";
import { User } from "../models/User.js";
import { Post } from "../models/Post.js";

export const getFeed = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const currentUser = await User.findById(req.userId);

    if (!currentUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const followingUsers = currentUser.following;

    const feedPosts = await Post.find({
      author: {
        $in: [...followingUsers, req.userId],
      },
    })
      .populate("author", "name email avatar")
      .sort({ createdAt: -1 });

    res.json({
      message: "Feed fetched ✅",
      posts: feedPosts,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch feed",
      error,
    });
  }
};