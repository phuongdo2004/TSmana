import express from "express";;
import * as controller from "../../controllers/client/user.controller";
import { requireAuth } from "../../middleware/auth.middleware";
const router = express.Router();
router.post("/register" , controller.register);

router.post("/login" , requireAuth, controller.login);
export const UserRouter = router;
