import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Booking = sequelize.define(
  "Booking",
  {
    checkInDate: DataTypes.DATE,
    checkOutDate: DataTypes.DATE,
    status: {
      type: DataTypes.ENUM("Pending", "Confirmed", "Canceled"),
      defaultValue: "Pending",
    },
  },
  { tableName: "bookings" }
);

export default Booking;
