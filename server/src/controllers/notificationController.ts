import { Response } from "express";

import { Notification } from "../models/Notification.js";

import { AuthRequest } from "../types/express.js";

export const getNotifications = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const notifications = await Notification.find({
      receiver: req.userId,
    })
      .populate("sender", "name email avatar")
      .populate("post")
      .sort({ createdAt: -1 });

    res.json({
      message: "Notifications fetched ✅",
      notifications,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch notifications",
      error,
    });
  }
};