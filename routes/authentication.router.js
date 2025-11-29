import express from "express";
import multer from "multer";
import authenticationController from "../authentication/authentication.controller.js";
import { verifyToken } from "../authentication/authentication.middleware.js";

const router = express.Router();
const upload = multer();

// Accepte FormData (multipart/form-data) provenant du front React
router.post("/login", upload.none(), authenticationController.login);
router.post("/logout", authenticationController.logout);
router.get("/verify", verifyToken, (req, res) => {
  res.status(200).json({ user: req.user });
});

export default router;
