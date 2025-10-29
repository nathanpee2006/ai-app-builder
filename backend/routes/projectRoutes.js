import express from "express";
import { projectController } from "../controllers/projectController.js";

const router = express.Router();

router.get("/", projectController.getAllProjects);

router.get("/:id", projectController.getProjectById);

router.delete("/:id", projectController.deleteProject);

export default router;
