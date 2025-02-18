import express from "express";
import {
  createBooking,
  getBookingsForProperty,
  confirmBooking,
  cancelBooking,
} from "../controllers/bookingController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware(["Renter"]), createBooking);
router.get("/:propertyId", authMiddleware(["Renter"]), getBookingsForProperty);
router.put("/:id/confirm", authMiddleware(["Renter"]), confirmBooking);
router.put("/:id/cancel", authMiddleware(["Renter"]), cancelBooking);

export default router;
