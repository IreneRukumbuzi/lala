import Booking from "../models/Booking.js";
import Property from "../models/Property.js";
import { Op } from "sequelize";

export const createBooking = async (req, res) => {
  try {
    const { propertyId, checkInDate, checkOutDate } = req.body;
    const renterId = req.user.id

    const property = await Property.findByPk(propertyId);
    if (!property) return res.status(404).json({ message: "Property not found" });

    const conflictingBooking = await Booking.findOne({
      where: {
        propertyId,
        status: "Confirmed",
        [Op.or]: [
          {
            checkInDate: { [Op.between]: [checkInDate, checkOutDate] },
          },
          {
            checkOutDate: { [Op.between]: [checkInDate, checkOutDate] },
          },
        ],
      },
    });

    if (conflictingBooking) {
      return res.status(400).json({ message: "Property is already booked for these dates" });
    }

    const booking = await Booking.create({
      propertyId,
      renterId,
      checkInDate,
      checkOutDate,
      status: "Pending",
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: "Failed to create booking", error });
  }
};

export const getBookingsForProperty = async (req, res) => {
  try {
    const { propertyId } = req.params;
    const bookings = await Booking.findAll({ where: { propertyId } });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch bookings", error });
  }
};

export const confirmBooking = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    await booking.update({ status: "Confirmed" });
    res.json({ message: "Booking confirmed" });
  } catch (error) {
    res.status(500).json({ message: "Failed to confirm booking", error });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    await booking.update({ status: "Canceled" });
    res.json({ message: "Booking canceled" });
  } catch (error) {
    res.status(500).json({ message: "Failed to cancel booking", error });
  }
};
