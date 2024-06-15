import { Socket } from "socket.io";
import { v4 as uuiddv4 } from "uuid";
import IRoomParams from "../interfaces/IRoomParams";

const roomsMap: Record<string, string[]> = {};

const roomHandler = (socket:Socket) => {

  const createRoom = () => {
    const roomId = uuiddv4();
    socket.join(roomId); // make the socket connection to enter a new room.
    roomsMap[roomId] = [];
    socket.emit("room-created", { roomId }); // emit an event from the server side that socket connection has been added to a room
    console.log(`Room created with roomId: ${roomId}`)
  }
  const joinedRoom = ({roomId, peerId: userId}: IRoomParams) => {
    if(roomsMap[roomId]) {
      roomsMap[roomId].push(userId)
      console.log("New user joined room", roomId, "with peer id as: ", userId);
      socket.join(roomId)
    }
    else {
      socket._error({
        message: "No room with this room id"
      })
    }

    socket.emit("current-users", {
      roomId,
      participants: roomsMap[roomId]
    })
  };

  // when client emits the event to create a room or join a room then call the above functions
  socket.on("create-room", createRoom);
  socket.on("joined-room", joinedRoom);
}

export default roomHandler;