import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  createMessage,
  getMessages,
  markMessageAsRead,
  deleteMessage,
getMessageCount,
} from "../controllers/messageController.js";

const router = express.Router();

router.post("/", createMessage);
router.get("/", protect, getMessages);
router.get("/count", protect, getMessageCount);

router.patch("/:id/read", protect, markMessageAsRead);
router.delete("/:id", protect, deleteMessage);

export default router;