import express from "express";
import {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
} from "../controllers/propertyController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import upload from '../middlewares/uploadMiddleware.js';

const router = express.Router();

router.post("/", authMiddleware(["Host"]), upload.single('file'), createProperty);
router.get("/", authMiddleware(["Host"]), getAllProperties);
router.get("/:id", authMiddleware(["Host"]), getPropertyById);
router.put("/:id", authMiddleware(["Host"]), upload.single('file'), updateProperty);
router.delete("/:id", authMiddleware(["Host"]), deleteProperty);

export default router;
