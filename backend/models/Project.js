import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  userDescription: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true,
  },

  extractedRequirements: {
    type: {
      appName: {
        type: String,
        required: true,
      },
      entities: {
        type: [String],
        required: true,
      },
      roles: {
        type: [String],
        required: true,
      },
      features: {
        type: [String],
        required: true,
      },
    },
    required: true,
  },

  uiMetadata: {
    type: {
      formConfig: [
        {
          entity: {
            type: String,
            required: true,
          },
          fields: [
            {
              name: { type: String, required: true },
              type: { type: String, required: true },
            },
          ],
        },
      ],
      roleFeatureMapping: [
        {
          role: {
            type: String,
            required: true,
          },
          features: [{ type: String }],
        },
      ],
    },
    required: true,
  },
});

export const Project = mongoose.model("Project", projectSchema);
