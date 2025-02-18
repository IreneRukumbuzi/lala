import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Property = sequelize.define(
  "Property",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: DataTypes.TEXT,
    pricePerNight: DataTypes.FLOAT,
    location: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
  },
  { tableName: "properties" }
);

export default Property;
