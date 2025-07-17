import express from "express";
import multer from "multer";
import rentalController from "../rentals/rentals.controller.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

const cloudinaryFields = [
  { name: "image_1", maxCount: 1 },
  { name: "image_2", maxCount: 1 },
  { name: "image_3", maxCount: 1 },
  { name: "image_4", maxCount: 1 },
  { name: "image_5", maxCount: 1 },
];

router.post(
  "/",
  upload.fields(cloudinaryFields),
  rentalController.postCreateRental
);
router.get("/", rentalController.getAllRentals);
router.get("/:id", rentalController.getRentalById);
router.put("/:id", rentalController.updateRental);
router.delete("/:id", rentalController.deleteRental);

export default router;
