import jwt from "jsonwebtoken";
import {
  JWT_ACCESS_KEY,
  JWT_ACCESS_EXPIRY,
  JWT_REFRESH_KEY,
  JWT_REFRESH_EXPIRY
} from "../config/constants.js";

const generateAccessToken = (payload) => {
  return jwt.sign(payload, JWT_ACCESS_KEY,{expiresIn: JWT_ACCESS_EXPIRY});
}
const generateRefreshToken = (payload) => {
  return jwt.sign(payload, JWT_REFRESH_KEY, {expiresIn: JWT_REFRESH_EXPIRY});
}

const verifyAccessToken = (token) => {
  return jwt.verify(token, JWT_ACCESS_KEY);
}
const verifyRefreshToken = (token) => {
  return jwt.verify(token, JWT_REFRESH_KEY);
}

export default {
  generateAccessToken,
  verifyAccessToken,
  generateRefreshToken,
  verifyRefreshToken
};