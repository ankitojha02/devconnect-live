import { Server } from "socket.io";

let io: Server;

const onlineUsers = new Map();

export const initSocket = (server: any) => {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join", (userId) => {
      socket.join(userId);

      onlineUsers.set(userId, socket.id);

      console.log(`User ${userId} is online`);

      io.emit("onlineUsers", Array.from(onlineUsers.keys()));
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);

      for (const [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);
        }
      }

      io.emit("onlineUsers", Array.from(onlineUsers.keys()));
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }

  return io;
};