import express from "express";
import { body } from "express-validator";
import { login, register, googleLogin, getCurrentUser } from "../controllers/authController.js";
import { forgotPassword, resetPassword } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/register",
  [
    // ✅ ADDED: Validate 'fullName' matching your React form
    body("fullName").notEmpty().withMessage("Full name is required"),

    body("email").isEmail().withMessage("Valid email is required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be 6+ chars"),
  ],
  register
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  login
);

router.post("/google", googleLogin);

router.get("/me", protect, getCurrentUser);

router.post(
  "/forgot-password",
  [body("email").isEmail().withMessage("Valid email is required")],
  forgotPassword
);

router.post(
  "/reset-password",
  [
    body("email").isEmail().withMessage("Valid email is required"),
    body("otp").isLength({ min: 6, max: 6 }).withMessage("OTP must be 6 digits"),
    body("newPassword").isLength({ min: 6 }).withMessage("Password must be 6+ chars"),
  ],
  resetPassword
);

export default router;