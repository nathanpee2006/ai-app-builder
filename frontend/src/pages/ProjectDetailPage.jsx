import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { getProject } from "../utils/apiUtils";

function ProjectDetailPage() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const projectData = await getProject(id);
        setProject(projectData);
      } catch (err) {
        setError("Failed to load project");
        console.error("Error fetching project:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProject();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-white text-xl">Loading project...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-red-400 text-xl">{error}</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-white text-xl">Project not found</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-4">
          {project.extractedRequirements.appName}
        </h1>

        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-white mb-3">
            Project Details
          </h2>
          <div className="space-y-2">
            <p className="text-gray-300">
              <span className="font-medium">ID:</span> {project._id}
            </p>
            <div className="text-gray-300">
              <span className="font-medium">AI Captured Requirements:</span>
              <div className="ml-4 mt-2 space-y-1">
                <p>App Name: {project.extractedRequirements.appName}</p>
                <p>
                  Entities: {project.extractedRequirements.entities.join(", ")}
                </p>
                <p>Roles: {project.extractedRequirements.roles.join(", ")}</p>
                <p>
                  Features: {project.extractedRequirements.features.join(", ")}
                </p>
              </div>
            </div>
            <p className="text-gray-300">
              <span className="font-medium">Created:</span>{" "}
              {new Date(project.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-3">Description</h2>
          <p className="text-gray-300">{project.userDescription}</p>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetailPage;
