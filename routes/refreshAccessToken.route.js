import express from "express";
import refreshAccessToken from "../controller/refreshToken.controller.js";

const router = express.Router();

router.get("/refreshAccessToken", refreshAccessToken);

export default router;