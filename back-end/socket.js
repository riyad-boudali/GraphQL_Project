const { Server } = require("socket.io");

let io;

module.exports = {
  init: (httpServer) => {
    io = new Server(httpServer, {
      cors: {
        origin: "http://localhost:3000", // TO handle Cors errors
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], // Allow ALL HTTP methods
        allowedHeaders: ["Content-Type", "Authorization"], // Allow these headers
        credentials: true, // Allow credentials (cookies, authorization headers, etc.)
      },
    });
    return io;
  },
  getIO: () => {
    if (!io) {
      throw new Error("Socket.io not initialised!");
    }
    return io;
  },
};
