import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import analyseRoutes from "./routes/analyseRoutes.js";

dotenv.config();

const getMongoURI = () => {
  if (process.env.NODE_ENV === "production") {
    return process.env.MONGODB_URI_PROD;
  }
  return process.env.MONGODB_URI_DEV;
};

mongoose
  .connect(getMongoURI())
  .then(() => {
    console.log("Connected to MongoDB server");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/analyse", analyseRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
