import express from "express";
import multer from "multer";
import usersController from "../users/users.controller.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // stockage temporaire

router.get("/", usersController.getUsers);
router.get("/:id", usersController.getUser);
router.post("/", upload.single("avatar"), usersController.addUser);
router.put("/:id", usersController.modifyUser);
router.delete("/:id", usersController.removeUser);

export default router;
