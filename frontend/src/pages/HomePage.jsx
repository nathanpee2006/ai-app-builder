import { useState } from "react";
import { analyseDescription, getProjects } from "../utils/apiUtils";
import DescriptionInput from "../components/DescriptionInput";
import ProjectResults from "../components/ProjectResults";

function HomePage({ handleProjectRefresh }) {
  const [description, setDescription] = useState("");
  const [projectData, setProjectData] = useState(null);

  const handleSubmit = async () => {
    try {
      const response = await analyseDescription(description);
      setProjectData(response);
      await handleProjectRefresh();
    } catch (error) {
      console.error("Error submitting:", error);
    }
  };

  const handleNewProject = () => {
    setProjectData(null);
    setDescription(null);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <div
        className={`${
          projectData
            ? "space-y-8 max-w-5xl w-full"
            : "text-center space-y-8 max-w-2xl w-full"
        }`}
      >
        <h1
          className={`text-6xl font-bold text-white mb-4 ${
            projectData ? "text-left" : "text-center"
          }`}
        >
          ai app builder
        </h1>

        <p
          className={`text-xl text-gray-400 mb-12 ${
            projectData ? "text-left" : "text-center"
          }`}
        >
          build with a single prompt. no coding needed.
        </p>
        {!projectData ? (
          <DescriptionInput
            description={description}
            setDescription={setDescription}
            onSubmit={handleSubmit}
          />
        ) : (
          <ProjectResults
            projectData={projectData}
            handleNewProject={handleNewProject}
          />
        )}
      </div>
    </div>
  );
}

export default HomePage;
