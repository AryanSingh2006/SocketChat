import userModel from "../models/user.model.js"
import messageModel from "../models/message.model.js"
import { io } from "../config/socket.js";
import { requestSocketId } from "../config/socket.js";

export const userSideBar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const sideBarUser = await userModel.find({ _id: { $ne: loggedInUserId } }).select("-password")

    res.status(200).json(sideBarUser);

  } catch (error) {
    console.error("error: ", error.message)
    res.status(500).json({
      err: err.message
    })
  }
}

export const getmessages = async (req,res) => {
  try {
    const {id:usertochat} = req.params
    const myId = req.user._id
    const message = await messageModel.find({
      $or : [
        {senderId : myId, receiveId : usertochat},
        { senderId : usertochat, receiveId : myId}
      ]
    })

    res.status(200).json(message)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      error : error.message
    })
  }
}

export const sendmessages = async (req,res) => {
  try {
    const text = req.body.text
    const {id:receiveId} = req.params
    const senderId = req.user._id

    const newMessage = await messageModel.create({
      senderId,
      receiveId,
      text
    })

    //sending the message in the real time
    const receiveSocketId = requestSocketId(receiveId)
    //checking if the user is online or not
    if(receiveSocketId){
      io.to(receiveSocketId).emit('receiveMessage', newMessage)
      console.log(`sending this user ${receiveId} in the real time`)
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
}