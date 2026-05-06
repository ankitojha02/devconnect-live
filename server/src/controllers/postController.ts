import { Response } from "express";
import { Post } from "../models/Post.js";
import { AuthRequest } from "../types/express.js";

export const createPost = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { content, image } = req.body;

    const post = await Post.create({
      content,
      image,
      author: req.userId as string,
    });

    res.status(201).json({
      message: "Post created ✅",
      post,
    });
  } catch (error) {
    res.status(500).json({
      message: "Create post failed",
      error,
    });
  }
};

export const getAllPosts = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const posts = await Post.find()
      .populate("author", "name email")
      .populate("likes", "name")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch posts",
      error,
    });
  }
};