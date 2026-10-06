import Home from "../models/Home.js";
import cloudinary from "../config/cloudinary.js";

const uploadProfileImage = async (file) => {
  if (!file) return "";

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "portfolio/profile",
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.secure_url);
        }
      }
    );

    uploadStream.end(file.buffer);
  });
};

const uploadCv = async (file) => {
  if (!file) return "";

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "portfolio/cv",
        resource_type: "raw",
        public_id: `cv-${Date.now()}.pdf`,
        format: "pdf",
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.secure_url);
        }
      }
    );

    uploadStream.end(file.buffer);
  });
};

export const getHome = async (req, res) => {
  try {
    const home = await Home.findOne();

    res.status(200).json(home);
  } catch {
    res.status(500).json({
      message: "Failed to fetch home information",
    });
  }
};

export const createHome = async (req, res) => {
  try {
    const existingHome = await Home.findOne();

    if (existingHome) {
      return res.status(400).json({
        message: "Home information already exists",
      });
    }

    const cvFile = req.files?.cv?.[0];
    const profileFile = req.files?.profileImage?.[0];

    const profileImage = await uploadProfileImage(profileFile);
    const cv = await uploadCv(cvFile);

    const home = await Home.create({
      name: req.body.name,
      title: req.body.title,
      description: req.body.description,
      github: req.body.github || "",
      linkedin: req.body.linkedin || "",
      status: req.body.status || "Available for opportunities",
      cv,
      profileImage,
    });

    res.status(201).json(home);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create home information",
    });
  }
};

export const updateHome = async (req, res) => {
  try {
    const home = await Home.findOne();

    if (!home) {
      return res.status(404).json({
        message: "Home information not found",
      });
    }

    home.name = req.body.name;
    home.title = req.body.title;
    home.description = req.body.description;
    home.github = req.body.github || "";
    home.linkedin = req.body.linkedin || "";
    home.status = req.body.status || "";

    const cvFile = req.files?.cv?.[0];
    const profileFile = req.files?.profileImage?.[0];

    if (cvFile) {
      home.cv = await uploadCv(cvFile);
    }

    if (profileFile) {
      home.profileImage = await uploadProfileImage(profileFile);
    }

    await home.save();

    res.status(200).json(home);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update home information",
    });
  }
};