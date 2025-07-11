import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/MongoDB.js";
import rentals_router from "./routes/rentals.router.js";

dotenv.config();

const app = express();
const port = 3002;

app.use(express.json());

app.use("/rentals", rentals_router);

connectDB();

app.listen(port, () => {
  console.log("localhost connected");
});
