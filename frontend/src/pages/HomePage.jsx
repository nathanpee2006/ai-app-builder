import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUpIcon } from "lucide-react";
import { analyseDescription } from "../utils/apiUtils";

function HomePage() {
  const [description, setDescription] = useState("");
  const [projectData, setProjectData] = useState({});
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
      <div className="text-center space-y-8 max-w-2xl w-full">
        <h1 className="text-6xl font-bold text-white mb-4">ai app builder</h1>

        <p className="text-xl text-gray-400 mb-12">
          build with a single prompt. no coding needed.
        </p>

        <div className="relative flex items-center justify-center">
          <div className="relative w-full max-w-2xl">
            <Textarea
              placeholder="ask to build..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full h-14 px-6 text-lg bg-gray-800 border-gray-700 text-white placeholder-gray-400 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />

            <Button
              onClick={handleSubmit}
              className="absolute bottom-2 right-2 h-10 w-10 bg-white text-gray-900 hover:bg-gray-100 rounded-lg"
              size="icon"
            >
              <ArrowUpIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
