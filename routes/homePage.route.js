import express from "express";
import renderHomePage from "../controller/homePage.controller.js";
import authmiddleware from "../middleware/auth.middleware.js"

const router = express.Router();

router.get("/homePage",authmiddleware, renderHomePage)


export default router;