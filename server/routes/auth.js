import express from "express";
import { signUp, signIn, signOut,getCurrentUser } from "../controller/authController.js";
import { registerValidation, loginValidation, handleValidationErrors } from '../middleware/authValidator.js';
import { loginLimiter, registerLimiter } from '../middleware/rateLimiter.js';
import { authenticate } from '../middleware/authenticate.js';

const router = express.Router()

router.post("/signup",registerLimiter, registerValidation, handleValidationErrors,signUp)
router.post("/login",loginLimiter,loginValidation,handleValidationErrors,signIn)
router.post("/logout",signOut)
router.get("/getMe",authenticate,getCurrentUser)

export default router;
