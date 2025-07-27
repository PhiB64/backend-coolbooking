import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/MongoDB.js";
import users_router from "./routes/users.router.js";
import rentals_router from "./routes/rentals.router.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();
const port = 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/users", users_router);

app.use("/rentals", rentals_router);

app.use((err, req, res, next) => {
  console.error("Erreur attrapée :", err.message);
  res.status(400).json({ message: err.message });
});

connectDB();

app.listen(port, () => {
  console.log("localhost connected");
});
