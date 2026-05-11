import express from "express";
import { upload } from "../middleware/uploadMiddleware.js";
import {
  createPost,
  getAllPosts,
  likePost,
  addComment,
  updatePost,
  deletePost,
} from "../controllers/postController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  upload.single("image"),
  createPost
);

router.get("/", protect, getAllPosts);

router.post("/:id/like", protect, likePost);

router.post("/:id/comment", protect, addComment);

router.put("/:id", protect, updatePost);

router.delete("/:id", protect, deletePost);

export default router;