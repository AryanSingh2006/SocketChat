import jwt from "jsonwebtoken";
import {
  JWT_ACCESS_KEY,
  JWT_ACCESS_EXPIRY,
} from "../config/constants.js";

const generateAccessToken = (payload) => {
  return jwt.sign(payload, JWT_ACCESS_KEY, { expiresIn: JWT_ACCESS_EXPIRY });
}

const verifyAccessToken = (token) => {
  return jwt.verify(token, JWT_ACCESS_KEY);
}

export default {
  generateAccessToken,
  verifyAccessToken
};