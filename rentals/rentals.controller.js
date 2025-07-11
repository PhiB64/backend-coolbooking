import fs from "fs";
import cloudinary from "../config/Cloudinary.js";
import {
  createRental,
  getAllRentals,
  getRentalById,
  updateRental,
  deleteRental,
} from "../rentals/rentals.service.js";

const postRental = async (req, res) => {
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
    };

    const rental = await createRental(rentalData);
    res.status(201).json(rental);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getRentals = async (req, res) => {
  try {
    const rentals = await getAllRentals();
    res.status(200).json(rentals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getRental = async (req, res) => {
  try {
    const rental = await getRentalById(req.params.id);
    if (!rental) return res.status(404).json({ error: "Location non trouvée" });
    res.status(200).json(rental);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const putRental = async (req, res) => {
  try {
    const rental = await updateRental(req.params.id, req.body);
    if (!rental) return res.status(404).json({ error: "Location non trouvée" });
    res.status(200).json(rental);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const removeRental = async (req, res) => {
  try {
    const rental = await deleteRental(req.params.id);
    if (!rental) return res.status(404).json({ error: "Location non trouvée" });
    res.status(200).json({ message: "Location supprimée" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { postRental, getRentals, getRental, putRental, removeRental };
