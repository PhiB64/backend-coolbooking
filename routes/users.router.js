import express from "express";
import multer from "multer";
import userController from "../users/users.controller.js";
import verifyToken from "../authentication/authenticateToken.js";
import clearCookie from "../authentication/clearCookie.js";
import verifyPassword from "../authentication/verifyPassword.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // stockage temporaire

router.get("/dashboard", verifyToken, (req, res) => {
  res.send(`Bienvenue dans votre espace, ${req.user.firstname}`);
});
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post("/register", upload.single("avatar"), userController.createUser);
router.post("/login", verifyPassword);

router.post("/logout", clearCookie);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

export default router;
