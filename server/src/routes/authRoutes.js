import express from "express";
import passport from "passport";
import { googleAuthCallback, getProfile, logoutUser, verifyUser } from "../controllers/authController.js";
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", passport.authenticate("google", { session: false }), googleAuthCallback);
router.get("/profile", authMiddleware(['Renter']), getProfile);
router.get("/logout", logoutUser);
router.get("/me", verifyUser)

export default router;
