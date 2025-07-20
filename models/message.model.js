import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  senderId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "User",
    requierd : true
  },
  receiveId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "User",
    requierd : true
  },
  text : {
    type : String,
    requierd :true,
    trim : true
  }
}, {
  timestamps: true
})

export default mongoose.model('Message', messageSchema); 