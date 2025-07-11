import express from "express";
import multer from "multer";
import {
  createUserController,
  deleteUserController,
  getAllUsersController,
  getUserByIdController,
  updateUserController,
} from "../users/users.controller.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

const cloudinaryFields = [{ name: "avatar", maxCount: 1 }];

router.post("/", upload.fields(cloudinaryFields), createUserController);
router.get("/", getAllUsersController);
router.get("/:id", getUserByIdController);
router.put("/:id", updateUserController);
router.delete("/:id", deleteUserController);

export default router;
