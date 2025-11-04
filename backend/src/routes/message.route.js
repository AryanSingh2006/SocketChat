import express from "express"
import { authMiddleware } from "../middleware/auth.middleware.js";
import { 
  userSideBar,
  getmessages,
  sendMessage
} from "../controller/message.controller.js";

const router = express.Router();

router.get('/users', authMiddleware,userSideBar);
router.get('/:id', authMiddleware, getmessages);
router.post('/send/:id', authMiddleware, sendMessage)

export default router;