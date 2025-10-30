import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT;
export const DB_URI = process.env.DB_URI;
export const JWT_ACCESS_KEY = process.env.JWT_ACCESS_KEY;
export const JWT_ACCESS_EXPIRY = process.env.JWT_ACCESS_EXPIRY;
export const NODE_ENV = process.env.NODE_ENV