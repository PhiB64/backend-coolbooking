import express from "express";
import multer from "multer";
import userController from "../users/users.controller.js";
import { verifyToken } from "../authentication/authentication.middleware.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // stockage temporaire

router.post("/register", upload.single("avatar"), userController.createUser);
router.get("/dashboard", verifyToken, (req, res) => {
  res.send(`Bienvenue dans votre espace, ${req.user.firstname}`);
});

router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

router.get("/", userController.getAllUsers);

export default router;
