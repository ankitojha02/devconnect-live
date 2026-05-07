import { Response } from "express";
import streamifier from "streamifier";
import cloudinary from "../config/cloudinary.js";
import { AuthRequest } from "../types/express.js";

export const uploadImage = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    const streamUpload = () => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "devconnect",
          },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );

        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    const result: any = await streamUpload();

    res.json({
      imageUrl: result.secure_url,
    });
  } catch (error) {
    res.status(500).json({
      message: "Upload failed",
      error,
    });
  }
};