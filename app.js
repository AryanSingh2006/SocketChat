import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

//Importing all the routes here
import landingPageRoutes from "./routes/landingPage.route.js"
import registerPageRoutes from "./routes/registerPage.route.js"
import loginPageRoutes from "./routes/loginPage.route.js"
import logoutPageRoutes from "./routes/logout.route.js"
import refreshAccessTokenRoutes from "./routes/refreshAccessToken.route.js"
import homePageRoutes from "./routes/homePage.route.js"
import messageRoutes from "./routes/message.route.js"

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


app.use('/', landingPageRoutes);
app.use('/', registerPageRoutes);
app.use('/', loginPageRoutes);
app.use('/', logoutPageRoutes);
app.use('/', refreshAccessTokenRoutes);
app.use('/', homePageRoutes);
app.use('/api/messages', messageRoutes);

export default app;