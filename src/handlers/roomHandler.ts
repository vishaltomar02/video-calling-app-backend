import { Socket } from "socket.io";
import { v4 as uuiddv4 } from "uuid";

const roomHandler = (socket:Socket) => {

  const createRoom = () => {
    const roomId = uuiddv4();
    socket.join(roomId); // make the socket connection to enter a new room.
    socket.emit("room-created", { roomId }); // emit an event from the server side that socket connection has been added to a room
    console.log(`Room created with roomId: ${roomId}`)
  }

  const joinedRoom = ({roomId}: {roomId: string}) => {
    console.log("Joined room", roomId);
  };

  // when client emits the event to create a room or join a room then call the above functions
  socket.on("create-room", createRoom);
  socket.on("joined-room", joinedRoom);
}

export default roomHandler;