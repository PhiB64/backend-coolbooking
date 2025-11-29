import express from "express";
import authenticationController from "../authentication/authentication.controller.js";
import { verifyToken } from "../authentication/authentication.middleware.js";

const router = express.Router();

router.post("/login", authenticationController.login);
router.post("/logout", authenticationController.logout);
router.get("/verify", verifyToken, (req, res) => {
  res.status(200).json({ user: req.user });
});

export default router;
