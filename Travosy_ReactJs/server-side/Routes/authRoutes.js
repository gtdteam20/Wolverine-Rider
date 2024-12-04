import express from "express";
import { loginUser, logoutUser} from "../controller/authController.js";

const router = express.Router();

// Login Route
router.post("/login", loginUser);

router.post("/logout", logoutUser);

export default router;
