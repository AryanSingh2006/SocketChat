import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors"
import { NODE_ENV } from "./config/constants.js";

//Importing all the routes here
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.resolve();


app.set('view engine', 'ejs');
app.set('views', './views');

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://socket-chat-amber.vercel.app",
  ],
  credentials: true
}))

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));
app.use("/public", express.static(path.join(__dirname, "public")));


app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

export default app;