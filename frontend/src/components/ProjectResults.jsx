import RequirementsDisplay from "./RequirementsDisplay";
import MockUIDisplay from "./MockUIDisplay";

function ProjectResults({ projectData }) {
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
    </>
  );
}

export default ProjectResults;
