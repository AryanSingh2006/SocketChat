import moongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new moongoose.Schema({
  username : {
    type : String,
    required : true,
    trim : true
  },
  email : {
    type : String,
    required : true,
    trim : true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email format']
  },
  password : {
    type : String,
    required : true,
    trim : true
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

export default moongoose.model("User", userSchema);