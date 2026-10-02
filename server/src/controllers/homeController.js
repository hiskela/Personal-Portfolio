import Home from "../models/Home.js";

export const getHome = async (req, res) => {
  try {
    const home = await Home.findOne();

    res.status(200).json(home);
  } catch (error) {
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

    const home = await Home.create({
      name: req.body.name,
      title: req.body.title,
      description: req.body.description,
      github: req.body.github || "",
      linkedin: req.body.linkedin || "",
      status: req.body.status || "Available for opportunities",
      cv: req.file
        ? `/uploads/cv/${req.file.filename}`
        : "",
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

    if (req.file) {
      home.cv = `/uploads/cv/${req.file.filename}`;
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