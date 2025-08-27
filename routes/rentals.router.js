import express from "express";
import multer from "multer";
import rentalController from "../rentals/rentals.controller.js";
import { verifyToken } from "../authentication/authentication.js";

const router = express.Router();

//Configuration de multer pour stocker les fichiers localement
const upload = multer({ dest: "uploads/" });

// Définition des champs d’images attendus
const cloudinaryFields = [
  { name: "image_1", maxCount: 1 },
  { name: "image_2", maxCount: 1 },
  { name: "image_3", maxCount: 1 },
  { name: "image_4", maxCount: 1 },
  { name: "image_5", maxCount: 1 },
];

// Route protégée pour créer un bien
router.post(
  "/create",
  verifyToken, // Authentifie l'utilisateur et injecte req.user
  upload.fields(cloudinaryFields), // Gère les fichiers envoyés
  rentalController.createRental // Utilise req.user._id comme userId
);

// Autres routes
router.get("/", rentalController.getAllRentals);
router.get("/:id", rentalController.getRentalById);
router.put("/:id", rentalController.updateRental);
router.delete("/:id", rentalController.deleteRental);

export default router;
