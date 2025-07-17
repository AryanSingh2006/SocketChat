import express from "express";
import renderLandingPage from "../controller/landingPage.controller.js";
const router = express.Router();

router.get('/', renderLandingPage);

export default router;