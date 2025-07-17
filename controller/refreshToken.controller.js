import jwtUtil from "../utils/jwt.utils.js";
import userModel from "../models/user.model.js";
import { NODE_ENV } from "../config/constants.js";

const refreshAccessToken = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token missing",
      });
    }

    const decoded = jwtUtil.verifyRefreshToken(refreshToken);
    const user = await userModel.findById(decoded.id);

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({
        success: false,
        message: "Invalid refresh token",
      });
    }

    const newAccessToken = jwtUtil.generateAccessToken({
      id: user._id,
      email: user.email,
    });

    res.cookie("token", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 15 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "New access token generated",
    });
  } catch (err) {
    return res.status(403).json({
      success: false,
      message: "Refresh token is invalid or expired",
      error: err.message,
    });
  }
};

export default refreshAccessToken;