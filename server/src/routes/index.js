import express from "express";
import authRoutes from "./authRoutes.js";
import propertyRoutes from "./propertyRoutes.js";
import bookingRoutes from "./bookingRoutes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/properties", propertyRoutes);
router.use("/bookings", bookingRoutes);

export default router;
