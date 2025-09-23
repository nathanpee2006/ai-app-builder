import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import RequirementsDisplay from "../components/RequirementsDisplay";
import MockUIDisplay from "../components/MockUIDisplay";

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
    <div className="w-full flex justify-center p-4">
      <div className="w-full max-w-5xl space-y-8">
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-3">Description</h2>
          <p className="text-gray-300">{project.userDescription}</p>
        </div>

        {/* Requirements */}
        <h2 className="text-2xl font-semibold text-white mb-3">
          AI Captured Requirements
        </h2>
        <RequirementsDisplay requirements={project.extractedRequirements} />

        {/* Mock UI */}
        <h2 className="text-2xl font-semibold text-white mt-8 mb-3">
          Generated UI
        </h2>
        <MockUIDisplay
          requirements={project.extractedRequirements}
          uiMetadata={project.uiMetadata}
        />
      </div>
    </div>
  );
}

export default ProjectDetailPage;
