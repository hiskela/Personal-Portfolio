import express from "express";
import {
  getHome,
  createHome,
  updateHome,
} from "../controllers/homeController.js";
import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/cvUploadMiddleware.js";

const router = express.Router();

router.get("/", getHome);

router.post(
  "/",
  protect,
  upload.single("cv"),
  createHome
);

router.put(
  "/",
  protect,
  upload.single("cv"),
  updateHome
);

export default router;