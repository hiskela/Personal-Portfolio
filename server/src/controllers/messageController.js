import Message from "../models/Messages.js";
import { sendContactEmail } from "../services/emailService.js";
export const createMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const newMessage = await Message.create({
      name,
      email,
      message,
    });

    res.status(201).json({
      message: "Message sent successfully",
      data: newMessage,
    });
} catch (error) {
  console.error(error);

  res.status(500).json({
    message: "Failed to send message",
    error: error.message,
  });
}
};
export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch messages",
    });
  }
};

export const markMessageAsRead = async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { returnDocument: "after" }
    );

    if (!message) {
      return res.status(404).json({
        message: "Message not found",
      });
    }

    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update message",
    });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);

    if (!message) {
      return res.status(404).json({
        message: "Message not found",
      });
    }

    res.status(200).json({
      message: "Message deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete message",
    });
  }
};
export const getMessageCount = async (req, res) => {
  try {
    const count = await Message.countDocuments();

    res.status(200).json({
      count,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get message count",
    });
  }
};