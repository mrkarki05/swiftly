import { Router } from "express";
import authCtrl from "../controllers/auth.controller.js";
const router = Router();
router.route("/signup").post(authCtrl.signup);
export default router;
