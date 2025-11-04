import express from "express"
import { authMiddleware } from "../middleware/auth.middleware.js";
import { 
  userSideBar,
  getmessages,
  sendmessages
} from "../controller/message.controller.js";

const router = express.Router();

router.get('/userSideBar', authMiddleware,userSideBar);
router.get('/:id', authMiddleware, getmessages);
router.post('/send/:id', authMiddleware, sendmessages)

export default router;