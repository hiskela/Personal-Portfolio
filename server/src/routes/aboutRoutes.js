import express from "express";
import {
  getAbout,
  createAbout,
  updateAbout,
} from "../controllers/aboutController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/",getAbout);
router.post("/", protect, createAbout);
router.put("/", protect, updateAbout);

export default router;