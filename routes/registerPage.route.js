import experss from "express";
import registerControllers from "../controller/registerPage.controller.js";

const router = experss.Router();

router.get('/register', registerControllers.renderRegisterPage);
router.post('/register', registerControllers.registerData);

export default router;