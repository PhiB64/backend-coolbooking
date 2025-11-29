import fs from "fs";
import cloudinary from "../config/cloudinary.js";
import rentalService from "./rentals.service.js";

class RentalController {
  constructor(rentalService) {
    this.rentalService = rentalService;
    console.info("RentalController initialized with service");
  }

  async createRental(req, res, next) {
    try {
      const imageUrls = {};
      const files = req.files;

      for (const key in files) {
        const result = await cloudinary.uploader.upload(files[key][0].path, {
          folder: "coolbooking/rentals",
        });
        imageUrls[key] = result.secure_url;
        fs.unlinkSync(files[key][0].path);
      }

      const rentalData = {
        ...req.body,
        beds: Number(req.body.beds),
        images: imageUrls,
        owner: req.user._id, // Ajout de l'ID utilisateur
      };

      const rental = await rentalService.createRental(rentalData);
      res.status(201).json(rental);
    } catch (err) {
      next(err);
    }
  }

  async getAllRentals(req, res, next) {
    try {
      const rentals = await rentalService.getAllRentals();
      res.status(200).json(rentals);
    } catch (err) {
      next(err);
    }
  }

  async getRentalById(req, res, next) {
    try {
      const rental = await rentalService.getRentalById(req.params.id);
      if (!rental)
        return res.status(404).json({ error: "Location non trouvée" });
      res.status(200).json(rental);
    } catch (err) {
      next(err);
    }
  }

  async updateRental(req, res, next) {
    try {
      const rental = await rentalService.updateRental(req.params.id, req.body);
      if (!rental)
        return res.status(404).json({ error: "Location non trouvée" });
      res.status(200).json(rental);
    } catch (err) {
      next(err);
    }
  }

  async deleteRental(req, res, next) {
    try {
      const rental = await rentalService.deleteRental(req.params.id);
      if (!rental)
        return res.status(404).json({ error: "Location non trouvée" });
      res.status(200).json({ message: "Location supprimée" });
    } catch (err) {
      next(err);
    }
  }
}

export default new RentalController(rentalService);
