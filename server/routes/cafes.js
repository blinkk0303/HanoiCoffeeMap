import express from "express";


import cafeController, { getCafes, getCafeById ,createCafe , updateCafe, deleteCafe } from "../controller/cafeController.js";
import { validateCreateCafe,validateUpdateCafe } from "../middleware/cafeValidator.js";
import authenticate from "../middleware/authenticate.js";
import requireRole from "../middleware/requireRole.js";

const router = express.Router();

// Public
router.get("/",getCafes); 
router.get("/:id",getCafeById);

// Admin
router.post("/",validateCreateCafe,authenticate,requireRole("ADMIN"),createCafe)
router.put('/:id',validateUpdateCafe,authenticate,requireRole("ADMIN"),updateCafe)
router.delete('/:id',authenticate,requireRole("ADMIN"),deleteCafe)
// router.patch('/:id/approve',authenticate,requireRole("ADMIN"),cafeController.approveCafe)

export default router;