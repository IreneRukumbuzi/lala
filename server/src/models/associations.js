import User from "./User.js";
import Property from "./Property.js";
import Booking from "./Booking.js";


User.hasMany(Property, { foreignKey: "hostId" });
Property.belongsTo(User, { foreignKey: "hostId" });

User.hasMany(Booking, { foreignKey: "renterId" });
Booking.belongsTo(User, { foreignKey: "renterId" });

Property.hasMany(Booking, { foreignKey: "propertyId" });
Booking.belongsTo(Property, { foreignKey: "propertyId" });

export { User, Property, Booking };
