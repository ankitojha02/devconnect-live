import app from "./app.js";
import http from "http";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import { initSocket } from "./socket.js";

dotenv.config();

const PORT = Number(process.env.PORT) || 5000;

const startServer = async () => {
  await connectDB();

  const server = http.createServer(app);

  initSocket(server);

  server.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();