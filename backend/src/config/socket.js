import { Server } from "socket.io";
import http from "http";

let io;
let server;
let userSocketMap = {}; // Moved outside to persist

export function initializeSocket(app) {
  server = http.createServer(app);

  io = new Server(server, {
    cors: {
      origin: ["http://localhost:5173",
        "https://socket-chat-amber.vercel.app"
      ],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId) userSocketMap[userId] = socket.id;

    // io.emit() is used to send events to all the connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
      console.log("A user disconnected", socket.id);
      delete userSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
  });

  return server;
}

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

export { io };
