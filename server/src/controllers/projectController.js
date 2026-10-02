import Project from "../models/Project.js";

const parseTechnologies = (technologies) => {
  if (!technologies) return [];

  if (Array.isArray(technologies)) {
    return technologies;
  }

  return technologies
    .split(",")
    .map((technology) => technology.trim())
    .filter(Boolean);
};

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch projects" });
  }
};

export const getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch project" });
  }
};

export const createProject = async (req, res) => {
  try {
    const {
      title,
      description,
      technologies,
      github,
      live,
      featured,
    } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        message: "Title and description are required",
      });
    }

    const project = await Project.create({
      title,
      description,
      technologies: parseTechnologies(technologies),
      github: github || "",
      live: live || "",
      featured: featured === true || featured === "true",
      image: req.file
        ? `/uploads/projects/${req.file.filename}`
        : "",
    });

    res.status(201).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to create project",
    });
  }
};

export const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    const {
      title,
      description,
      technologies,
      github,
      live,
      featured,
    } = req.body;

    project.title = title;
    project.description = description;
    project.technologies = parseTechnologies(technologies);
    project.github = github || "";
    project.live = live || "";
    project.featured = featured === true || featured === "true";

    if (req.file) {
      project.image = `/uploads/projects/${req.file.filename}`;
    }

    await project.save();

    res.status(200).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to update project",
    });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.status(200).json({
      message: "Project deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete project",
    });
  }
};
export const getProjectCount = async (req, res) => {
  try {
    const count = await Project.countDocuments();

    res.status(200).json({
      count,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get project count",
    });
  }
};