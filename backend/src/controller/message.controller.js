import userModel from "../models/user.model.js"
import messageModel from "../models/message.model.js"
import { io, getReceiverSocketId } from "../config/socket.js";
import cloudinary from "../config/cloudinary.js";

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

export const getmessages = async (req, res) => {
  try {
    const usertochat = req.params.id
    const myId = req.user._id
    const message = await messageModel.find({
      $or: [
        { senderId: myId, receiverId: usertochat },
        { senderId: usertochat, receiverId: myId }
      ]
    })

    res.status(200).json(message)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      error: error.message
    })
  }
}

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      // Upload base64 image to cloudinary
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new messageModel({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};