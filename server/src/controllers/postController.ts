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

export const likePost = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const postId = req.params.id;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    const alreadyLiked = post.likes.includes(
      req.userId as any
    );

    if (alreadyLiked) {
      post.likes = post.likes.filter(
        (id) => id.toString() !== req.userId
      );

      await post.save();

      return res.json({
        message: "Post unliked ❌",
      });
    }

    post.likes.push(req.userId as any);

    await post.save();

    res.json({
      message: "Post liked ❤️",
    });
  } catch (error) {
    res.status(500).json({
      message: "Like failed",
      error,
    });
  }
};

export const addComment = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { text } = req.body;

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    post.comments.push({
      user: req.userId as any,
      text,
    } as any);

    await post.save();

    res.json({
      message: "Comment added 💬",
      comments: post.comments,
    });
  } catch (error) {
    res.status(500).json({
      message: "Comment failed",
      error,
    });
  }
};