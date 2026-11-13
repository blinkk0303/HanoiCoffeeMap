import {getUsers, createUser, updateUser, deleteUser} from "../controller/userController.js";
import express from "express";
import authenticate from "../middleware/authenticate.js";
import requireRole from "../middleware/requireRole.js";

const router = express.Router();

router.get("/", authenticate,requireRole("ADMIN"),getUsers);
router.post("/",authenticate,requireRole("ADMIN"), createUser);
router.put("/:id", authenticate,requireRole("ADMIN"),updateUser);
router.delete("/:id",authenticate,requireRole("ADMIN"), deleteUser);

export default router;
