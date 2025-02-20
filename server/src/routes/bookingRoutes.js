import express from "express";
import {
  createBooking,
  getBookingsForProperty,
  updateBookingStatus
} from "../controllers/bookingController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware(["Renter"]), createBooking);
router.get("/:propertyId", authMiddleware(["Renter", "Host"]), getBookingsForProperty);
router.patch("/:bookingId/:action", authMiddleware(["Host", "Renter"]), updateBookingStatus);

export default router;
