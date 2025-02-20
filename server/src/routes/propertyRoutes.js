import express from "express";
import {
  createProperty,
  getAllProperties,
  getHostProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
} from "../controllers/propertyController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import upload from '../middlewares/uploadMiddleware.js';

const router = express.Router();

router.post("/", authMiddleware(["Host"]), upload.single('file'), createProperty);
router.get("/", authMiddleware(["Renter"]), getAllProperties);
router.get("/host", authMiddleware(["Host"]), getHostProperties);
router.get("/:id", authMiddleware(["Host", "Renter"]), getPropertyById);
router.put("/:id", authMiddleware(["Host"]), upload.single('file'), updateProperty);
router.delete("/:id", authMiddleware(["Host"]), deleteProperty);

export default router;
