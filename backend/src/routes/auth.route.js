import express from "express"
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  signup,
  login,
  logout,
  updateProfile,
  checkAuth
} from "../controller/auth.controller.js"

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.put('/update-profile', authMiddleware, updateProfile)
router.get('/check', authMiddleware, checkAuth);

export default router