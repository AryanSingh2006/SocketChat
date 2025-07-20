import express from "express" ;
import {userSideBar} from "../controller/message.controller.js"
import { renderChatPage } from "../controller/message.controller.js";
import { sendmessages } from "../controller/message.controller.js";
import { getmessages } from "../controller/message.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.get('/users',authMiddleware, userSideBar);
router.get('/chat', authMiddleware, renderChatPage);
router.get('/:id', authMiddleware, getmessages);
router.post('/send/:id', authMiddleware, sendmessages)

export default router;