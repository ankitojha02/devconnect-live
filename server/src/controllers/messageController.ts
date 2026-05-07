import { Response } from "express";
import { AuthRequest } from "../types/express.js";
import { Message } from "../models/Message.js";
import { getIO } from "../socket.js";

export const sendMessage = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { receiverId, text } = req.body;

    if (!req.userId) {
  return res.status(401).json({
    message: "Unauthorized",
  });
}

    const message = await Message.create({
      sender: req.userId as string,
      receiver: receiverId,
      text,
    });

    const io = getIO();

    io.emit("newMessage", message);

    res.status(201).json({
      message: "Message sent ✅",
      data: message,
    });
  } catch (error) {
    res.status(500).json({
      message: "Send message failed",
      error,
    });
  }
};