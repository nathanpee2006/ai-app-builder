import express from "express";
import { analyseController } from "../controllers/analyseController.js";

const router = express.Router();

router.post("/", analyseController);

export default router;
