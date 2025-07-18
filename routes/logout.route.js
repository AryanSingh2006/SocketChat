import express from "express";
import logoutUser from "../controller/logout.controller";

const router = express.Router();

router.get('/logout', logoutUser);

export default router