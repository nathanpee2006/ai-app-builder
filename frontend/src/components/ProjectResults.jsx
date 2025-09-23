import RequirementsDisplay from "./RequirementsDisplay";
import MockUIDisplay from "./MockUIDisplay";
import { Button } from "@/components/ui/button";

function ProjectResults({ projectData, handleNewProject }) {
  return (
    <>
      {/* Requirements */}
      <h2 className="text-2xl font-semibold text-white mb-3">
        AI Captured Requirements
      </h2>
      <RequirementsDisplay requirements={projectData.extractedRequirements} />

      {/* Mock UI */}
      <h2 className="text-2xl font-semibold text-white mt-8 mb-3">
        Generated UI
      </h2>
      <MockUIDisplay
        requirements={projectData.extractedRequirements}
        uiMetadata={projectData.uiMetadata}
      />

      <Button onClick={handleNewProject}>Generate New Project</Button>
    </>
  );
}

export default ProjectResults;
