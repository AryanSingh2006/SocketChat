import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  username : {
    type : String,
    required : true,
    trim : true,
    unique : true
  },
  email : {
    type : String,
    required : true,
    trim : true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email format'],
    unique : true
  },
  password : {
    type : String,
    required : true,
    trim : true
  },
  refreshToken: {
    type: String,
    default: ""
  }
},{
  timestamps : true
})

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")){
    return next();
  }
  else {
    try{
      this.password = await bcrypt.hash(this.password, 12)
      next();
    }
    catch(err){
      next(err)
    }
  }
})

userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword,this.password);
};

export default mongoose.model("User", userSchema);