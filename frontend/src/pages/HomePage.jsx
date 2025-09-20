import { useState } from "react";
import { analyseDescription } from "../utils/apiUtils";
import DescriptionInput from "../components/DescriptionInput";
import ProjectResults from "../components/ProjectResults";

function HomePage() {
  const [description, setDescription] = useState("");
  const [projectData, setProjectData] = useState(null);
  console.log(projectData);

  const handleSubmit = async () => {
    try {
      const response = await analyseDescription(description);
      setProjectData(response);
    } catch (error) {
      console.error("Error submitting:", error);
    }
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
          <ProjectResults projectData={projectData} />
        )}
      </div>
    </div>
  );
}

export default HomePage;
