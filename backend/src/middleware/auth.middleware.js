import jwtUtil from "../utils/jwt.utils.js";

export const authMiddleware = (req,res,next) => {
  const token = req.cookies.token;

  if (!token){
    return res.status(401).json({
      success:false,
      message: "No token found"
    });
  }

  try{
    const decoded = jwtUtil.verifyAccessToken(token);

    req.user = decoded;

    next();
  }
  catch(err){
    res.status(401).json({
      success:false,
      message:"Invalid token",
      Error: err.message
    })
  }
}