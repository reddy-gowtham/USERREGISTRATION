import express from "express";
import { registerUser } from "../controllers/user.controller.js";
const router = express.Router()
router.route("/register").post(registerUser);
//routes import
export default router;