import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import passport from "./config/passport.js";
import sequelize from "./config/database.js";
import routes from "./routes/index.js";
import "./models/associations.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('Welcome to the Lala Rentals API');
});

app.use("/api", routes);

const startServer = async () => {
  try {
    await sequelize.sync();
    console.log("Database connected");
    app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
  } catch (err) {
    console.error("Failed to connect to DB:", err);
  }
};

startServer();

