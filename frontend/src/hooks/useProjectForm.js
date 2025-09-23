import { useState } from "react";
import { analyseDescription } from "../utils/apiUtils";
import { validateDescription } from "../utils/validation";

export const useProjectForm = (onProjectRefresh) => {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [projectData, setProjectData] = useState(null);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);
      validateDescription(description);

      const response = await analyseDescription(description);
      setProjectData(response);
      await onProjectRefresh?.();
    } catch (err) {
      console.error("Error submitting:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleNewProject = () => {
    setProjectData(null);
    setDescription("");
    setError(null);
  };

  return {
    description,
    setDescription,
    loading,
    error,
    projectData,
    handleSubmit,
    handleNewProject,
  };
};
