import mongoose from "mongoose";
import { DB_URI } from "./constants.js";

const connectDB = async () => {
  try{
    const connect= await mongoose.connect(DB_URI);
    if(connect){
      console.log("Database is connected")
    }
  }
  catch(err){
    console.error("Database is not connected", err);
    process.exit(1);
  }
};

export default connectDB;