import sequelize from "./database.js";
import User from '../models/User.js';

const seedDatabase = async () => {
  try {
    await sequelize.sync();
    await User.bulkCreate([
      { email: "mhonore88@gmail.com", name: "Mugisha Honore", role: "Host" },
      { email: "mugishahonore94@gmail.com", name: "Mugisha Didier", role: "Host" },
      { email: "christianishimwe90@gmail.com", name: "Ishimwe Christian", role: "Host" },
    ], { ignoreDuplicates: true });

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await sequelize.close();
    process.exit(0);
  }
};

seedDatabase();