import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/MongoDB.js";

dotenv.config();

const app = express();
const port = 3002;

app.use(express.json());

connectDB();

app.listen(port, () => {
  console.log("localhost connected");
});
