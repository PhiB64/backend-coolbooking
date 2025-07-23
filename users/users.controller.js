import userService from "./users.service.js";
import cloudinary from ".././config/Cloudinary.js";
import fs from "fs";

class UserController {
  constructor(userService) {
    this.userService = userService;
    console.info("UserController initialized with service");
  }

  async getAllUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  async getUserById(req, res, next) {
    try {
      const user = await userService.getUserById(req.params.id);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async createUser(req, res, next) {
    try {
      let avatarUrl;

      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "avatars",
          transformation: [{ width: 300, height: 300, crop: "fill" }],
        });
        avatarUrl = result.secure_url;
        fs.unlinkSync(req.file.path); // nettoyage du fichier local
      } else {
        avatarUrl =
          "https://res.cloudinary.com/dwkyezu2u/image/upload/v1745506223/download_zspjbi.png"; // avatar par defaut
      }

      const userData = {
        ...req.body,
        avatar: avatarUrl,
      };
      console.log("Contenu du body :", req.body);

      const newUser = await userService.createUser(userData);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req, res, next) {
    try {
      const updatedUser = await userService.updateUser(req.params.id, req.body);
      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req, res, next) {
    try {
      await userService.deleteUser(req.params.id);
      res.status(204).end(); // No content
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController(userService);
