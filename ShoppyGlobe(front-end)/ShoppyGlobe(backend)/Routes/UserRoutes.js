import express from "express";
import { signup, login } from "../Controller/UserController.js"

const router = express.Router();

// Routes
router.post("/register", signup);
router.post("/login", login);

export default router;
