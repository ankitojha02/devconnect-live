import { Response } from "express";
import { AuthRequest } from "../types/express.js";
import { Message } from "../models/Message.js";
import { getIO } from "../socket.js";
import { User } from "../models/User.js";

export const sendMessage = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { receiverId, text } = req.body;

    const senderUser = await User.findById(
  req.userId
);

const receiverUser = await User.findById(
  receiverId
);

if (!senderUser || !receiverUser) {
  return res.status(404).json({
    message: "User not found",
  });
}

// MUTUAL FOLLOW CHECK

const senderFollowsReceiver =
  senderUser.following.includes(
    receiverId as any
  );

const receiverFollowsSender =
  receiverUser.following.includes(
    req.userId as any
  );

if (
  !senderFollowsReceiver ||
  !receiverFollowsSender
) {
  return res.status(403).json({
    message:
      "Both users must follow each other to chat",
  });
}

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

  // RECEIVER

io.to(receiverId).emit(
  "newMessage",
  message
);

// SENDER

io.to(req.userId as string).emit(
  "newMessage",
  message
);

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

export const getMessages = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const otherUserId = req.params.userId;

    if (!req.userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

   const messages = await Message.find({
  $or: [
    {
      sender: req.userId as any,
      receiver: otherUserId as any,
    },
    {
      sender: otherUserId as any,
      receiver: req.userId as any,
    },
  ],
} as any).sort({ createdAt: 1 });

    res.json({
      message: "Messages fetched ✅",
      messages,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch messages",
      error,
    });
  }
};