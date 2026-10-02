import multer from "multer";
import path from "path";
import fs from "fs";

const cvDirectory = "uploads/cv";
const profileDirectory = "uploads/profile";

if (!fs.existsSync(cvDirectory)) {
  fs.mkdirSync(cvDirectory, { recursive: true });
}

if (!fs.existsSync(profileDirectory)) {
  fs.mkdirSync(profileDirectory, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "cv") {
      cb(null, cvDirectory);
    } else if (file.fieldname === "profileImage") {
      cb(null, profileDirectory);
    }
  },

  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);

    if (file.fieldname === "cv") {
      cb(null, `cv-${Date.now()}${extension}`);
    } else {
      cb(null, `profile-${Date.now()}${extension}`);
    }
  },
});

const fileFilter = (req, file, cb) => {
  if (file.fieldname === "cv") {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed for CV"));
    }
    return;
  }

  if (file.fieldname === "profileImage") {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/jpg",
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only JPG, PNG, and WebP images are allowed"));
    }
    return;
  }

  cb(new Error("Invalid file field"));
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

export default upload;