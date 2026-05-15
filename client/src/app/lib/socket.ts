import { io } from "socket.io-client";

export const socket = io(
  "https://devconnect-live.onrender.com",
  {
    transports: ["websocket"],
  }
);