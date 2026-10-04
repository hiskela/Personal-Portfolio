import About from "../models/About.js";

export const getAbout = async (req, res) => {
  try {
    console.log("Database:", About.db.name);
    console.log("Collection:", About.collection.name);

    const about = await About.findOne();

    console.log("About data:", about);

    res.status(200).json(about);
  } catch (error) {
    console.error("About error:", error);

    res.status(500).json({
      message: "Failed to fetch about information",
    });
  }
};

export const createAbout = async (req, res) => {
  try {
    const existingAbout = await About.findOne();

    if (existingAbout) {
      return res.status(400).json({
        message: "About information already exists",
      });
    }

    const about = await About.create(req.body);

    res.status(201).json(about);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create about information",
    });
  }
};

export const updateAbout = async (req, res) => {
  try {
    const about = await About.findOneAndUpdate(
      {},
      req.body,
      {
        returnDocument: "after",
        runValidators: true,
      }
    );

    if (!about) {
      return res.status(404).json({
        message: "About information not found",
      });
    }

    res.status(200).json(about);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update about information",
    });
  }
};