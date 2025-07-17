import express from "express";
import loginController from "../controller/login.controller.js";

const router = express.Router();

router.get("/login", loginController.renderLoginPage);
router.post("/login", loginController.loginData);

export default router;