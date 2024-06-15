import express from "express";
import http from "http";
import { Server } from "socket.io";
import ServerConfig from "./config/serverConfig";
import cors from "cors";
import roomHandler from "./handlers/roomHandler";

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("New user connected");
  roomHandler(socket); // pass the socket connection to the room handler to handle create room and join room
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(ServerConfig.PORT,
  () => console.log(`Server is running at Port: ${ServerConfig.PORT}`)
);