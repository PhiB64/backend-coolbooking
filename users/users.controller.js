import fs from "fs";
import cloudinary from "./../config/cloudinary.js";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "./users.service.js";

const getAllUsersController = async (req, res) => {
  try {
    const users = await getAllUsers();
    //faire le users.length = 0
    res.status(201).json(users);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", Erreur: err });
  }
};

const getUserByIdController = async (req, res) => {
  try {
    const userId = await getUserById(req.params.id);
    if (!userId)
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    res.status(201).json(userId);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", Erreur: err });
  }
};

const createUserController = async (req, res) => {
  try {
    const files = req.files;
    const imageUrl = {};

    for (const key in files) {
      const result = await cloudinary.uploader.upload(files[key][0].path, {
        folder: "coolbooking/users",
      });
      imageUrl[key] = result.secure_url;
      fs.unlinkSync(files[key][0].path);
    }

    const userData = {
      ...req.body,
      avatar: imageUrl.avatar,
    };

    const newUser = await createUser(userData);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

const updateUserController = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(400).json({ message: "Id non trouvé" });
    }
    const updated = req.body;
    if (!updated) {
      return res.status(404).json({ message: "Données invalides" });
    }
    const updatedUser = await updateUser(userId, updated);
    res.status(201).json(updatedUser);
  } catch (err) {
    return res.status(500).json({ message: "Erreur serveur", Erreur: err });
  }
};

const deleteUserController = async (req, res) => {
  try {
    const deleted = await deleteUser(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    res.status(201).json({ message: "Utilisateur supprimé" });
  } catch (err) {
    return res.status(500).json({ message: "Erreur serveur", Erreur: err });
  }
};

export {
  createUserController,
  getAllUsersController,
  getUserByIdController,
  updateUserController,
  deleteUserController,
};
