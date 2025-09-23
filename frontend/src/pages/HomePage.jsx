import { useProjectForm } from "../hooks/useProjectForm";
import DescriptionInput from "../components/DescriptionInput";
import ProjectResults from "../components/ProjectResults";

function HomePage({ handleProjectRefresh }) {
  const {
    description,
    setDescription,
    loading,
    error,
    projectData,
    handleSubmit,
    handleNewProject,
  } = useProjectForm(handleProjectRefresh);

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
        {!projectData && (
          <DescriptionInput
            description={description}
            setDescription={setDescription}
            onSubmit={handleSubmit}
            loading={loading}
            error={error}
          />
        )}
        {loading && !projectData && (
          <p className="text-xl text-gray-400">Generating mock UI...</p>
        )}
        {projectData && !loading && !error && (
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
