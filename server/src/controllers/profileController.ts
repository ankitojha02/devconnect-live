import { Response } from "express";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";
import { AuthRequest } from "../types/express.js";
import { User } from "../models/User.js";

export const uploadAvatar = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No image uploaded",
      });
    }

    const streamUpload = () => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "devconnect/avatar",
          },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );

        streamifier
          .createReadStream(req.file!.buffer)
          .pipe(stream);
      });
    };

    const result: any = await streamUpload();

    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        avatar: result.secure_url,
      },
      { new: true }
    ).select("-password");

    res.json({
      message: "Avatar uploaded ✅",
      avatar: result.secure_url,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Avatar upload failed",
      error: error instanceof Error ? error.message : error,
    });
  }
};