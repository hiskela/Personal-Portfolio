import express from "express";
import { getHome, createHome, updateHome } from "../controllers/homeController.js";
import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/homeUploadMiddleware.js";

const router = express.Router();

router.get("/", getHome);
router.post("/", protect, upload.fields([
  { name: "cv", maxCount: 1 },
  { name: "profileImage", maxCount: 1 },
]), createHome);

router.put("/", protect, upload.fields([
  { name: "cv", maxCount: 1 },
  { name: "profileImage", maxCount: 1 },
]), updateHome);

export default router;