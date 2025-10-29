import { Project } from "../models/Project.js";

export const projectController = {
  getAllProjects: async (req, res) => {
    try {
      const projects = await Project.find({}).select(
        "_id extractedRequirements.appName"
      );
      res.json({ projects: projects });
    } catch (error) {
      console.error("Error fetching all projects:", error);
      res.status(500).json({
        error: "Failed to fetch projects",
        message: error.message,
      });
    }
  },
  getProjectById: async (req, res) => {
    try {
      const projectId = req.params.id;

      // Validate projectId format (MongoDB ObjectId)
      if (!projectId || projectId.length !== 24) {
        return res.status(400).json({
          error: "Invalid project ID format",
        });
      }

      const project = await Project.findById(projectId);

      if (!project) {
        return res.status(404).json({
          error: "Project not found",
        });
      }

      res.json({ project: project });
    } catch (error) {
      console.error("Error fetching project by ID:", error);
      res.status(500).json({
        error: "Failed to fetch project",
        message: error.message,
      });
    }
  },
  deleteProject: async (req, res) => {
    try {
      const projectId = req.params.id;

      // Validate projectId format (MongoDB ObjectId)
      if (!projectId || projectId.length !== 24) {
        return res.status(400).json({
          error: "Invalid project ID format",
        });
      }

      const deletedProject = await Project.findByIdAndDelete(projectId);

      if (!deletedProject) {
        return res.status(404).json({
          error: "Project not found",
        });
      }

      res.json({
        success: true,
        message: "Project deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting project:", error);
      res.status(500).json({
        error: "Failed to delete project",
        message: error.message,
      });
    }
  },
};
