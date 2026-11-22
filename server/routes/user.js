import {getUsers, createUser, updateUser, deleteUser, getMyProfile, getPublicProfile, adminGetUserDetail} from "../controller/userController.js";
import express from "express";
import authenticate from "../middleware/authenticate.js";
import requireRole from "../middleware/requireRole.js";

const router = express.Router();

//Public
router.get("/:id/profile",getPublicProfile)
router.get("/me",authenticate,getMyProfile);

//Admin
router.get("/", authenticate,requireRole("ADMIN"),getUsers);
router.get("/:id",authenticate,requireRole("ADMIN"),adminGetUserDetail) 
router.post("/",authenticate,requireRole("ADMIN"), createUser);
router.put("/:id", authenticate,requireRole("ADMIN"),updateUser);
router.delete("/:id",authenticate,requireRole("ADMIN"), deleteUser);

export default router;
