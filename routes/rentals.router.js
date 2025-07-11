import express from "express";
import multer from "multer";
import {
  postRental,
  getRentals,
  getRental,
  putRental,
  removeRental,
} from "../rentals/rentals.controller.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

const cloudinaryFields = [
  { name: "image_1", maxCount: 1 },
  { name: "image_2", maxCount: 1 },
  { name: "image_3", maxCount: 1 },
  { name: "image_4", maxCount: 1 },
  { name: "image_5", maxCount: 1 },
];

router.post("/", upload.fields(cloudinaryFields), postRental);
router.get("/", getRentals);
router.get("/:id", getRental);
router.put("/:id", putRental);
router.delete("/:id", removeRental);

export default router;
