import express from "express";

//Importing all the routes here
import landingPageRoutes from "./routes/landingPage.route.js"
import registerPageRoutes from "./routes/registerPage.route.js"
import loginPageRoutes from "./routes/loginPage.route.js"

const app = express();

app.set('view engine', 'ejs');
app.set('views','./views');

app.use(express.urlencoded({extended : true}))

app.use('/', landingPageRoutes);
app.use('/', registerPageRoutes);
app.use('/', loginPageRoutes);

export default app