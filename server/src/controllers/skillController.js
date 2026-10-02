import Skill from "../models/Skill.js";

export const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find().sort({ createdAt: -1 });

    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch skills",
    });
  }
};

export const createSkill = async (req, res) => {
  try {
    const { name, category, level } = req.body;

    if (!name || !category || level === undefined) {
      return res.status(400).json({
        message: "Name, category and level are required",
      });
    }

    const skill = await Skill.create({
      name,
      category,
      level,
    });

    res.status(201).json(skill);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create skill",
    });
  }
};

export const updateSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!skill) {
      return res.status(404).json({
        message: "Skill not found",
      });
    }

    res.status(200).json(skill);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update skill",
    });
  }
};

export const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);

    if (!skill) {
      return res.status(404).json({
        message: "Skill not found",
      });
    }

    res.status(200).json({
      message: "Skill deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete skill",
    });
  }
};

export const getSkillCount = async (req, res) => {
  try {
    const count = await Skill.countDocuments();

    res.status(200).json({
      count,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get skill count",
    });
  }
};