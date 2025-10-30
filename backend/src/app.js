import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

//Importing all the routes here
import authRoutes from "./routes/auth.route.js"

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.set('view engine', 'ejs');
app.set('views','./views');

app.use(express.urlencoded({extended : true}))
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));
app.use("/public", express.static(path.join(__dirname, "public")));


app.use('/api/auth', authRoutes);

export default app;