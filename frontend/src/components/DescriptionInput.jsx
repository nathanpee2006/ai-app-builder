import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUpIcon } from "lucide-react";

function DescriptionInput({
  description,
  setDescription,
  onSubmit,
  loading,
  error,
}) {
  return (
    <>
      <div className="relative flex items-center justify-center">
        <div className="relative w-full max-w-2xl">
          <Textarea
            placeholder="ask to build..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full h-14 px-6 text-lg bg-gray-800 border-gray-700 text-white placeholder-gray-400 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            disabled={loading}
          />

          <Button
            onClick={onSubmit}
            className="absolute bottom-2 right-2 h-10 w-10 bg-white text-gray-900 hover:bg-gray-100 rounded-lg"
            size="icon"
            disabled={loading}
          >
            <ArrowUpIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>
      {error && <p className="text-lg text-red-400 text-center">{error}</p>}
    </>
  );
}

export default DescriptionInput;
