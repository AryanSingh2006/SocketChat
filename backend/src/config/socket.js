import app from "../app.js";
import http from "http"
import { Server } from "socket.io"

export const server = http.createServer(app);
export const io = new Server(server);

//mapping the userId and socketId as key value pair
const onlineUsers = new Map();

//making a function to get the sender's socketId
export function requestSocketId(userId){
  return onlineUsers.get(userId)
}
io.on('connection', (socket) => {
  console.log('A user connected ', socket.id);

  socket.on('addUser', (loggedInUser) =>{
    onlineUsers.set(loggedInUser, socket.id)
    console.log(`User with ${loggedInUser} ID logged in with ${socket.id} this socket id`)
    io.emit('onlineUsers', Array.from(onlineUsers.keys))
  })
  
  socket.on('disconnect', () => {
    for (let [userId,socketId] of onlineUsers) {
      if(socketId === socket.id){
        onlineUsers.delete(userId);
        console.log(`User ${userId} disconnected`);
        break;
      }
    }
    io.emit("onlineUsers", Array.from(onlineUsers.keys()));
  })
})

