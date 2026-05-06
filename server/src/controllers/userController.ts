// controllers/userController.ts
import { Request, Response } from "express";
import { User } from "../models/User.js";
import { AuthRequest } from "../types/express.js";

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