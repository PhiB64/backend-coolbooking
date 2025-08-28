import express from "express";
import multer from "multer";
import userController from "../users/users.controller.js";
import {
  verifyToken,
  verifyPassword,
  clearCookie,
} from "../authentication/authentication.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // stockage temporaire

router.post("/login", upload.none(), verifyPassword);
router.post("/register", upload.single("avatar"), userController.createUser);
router.post("/logout", clearCookie);
router.get("/dashboard", verifyToken, (req, res) => {
  res.send(`Bienvenue dans votre espace, ${req.user.firstname}`);
});

router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

router.get("/", userController.getAllUsers);

export default router;
