import express from "express";
import * as userController from "./user.controller.js";
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const router = express.Router();

router.post("/", userController.createUser);
router.post("/login", userController.login);
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.patch("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

export default router;

