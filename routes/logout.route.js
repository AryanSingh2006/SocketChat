import express from "express";
import logoutUser from "../controller/logout.controller.js";

const router = express.Router();

router.post('/logout', logoutUser);

export default router