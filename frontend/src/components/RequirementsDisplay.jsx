import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

function RequirementsDisplay({ requirements }) {
  if (!requirements) return null;

  const { appName, entities = [], roles = [], features = [] } = requirements;

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-md bg-gray-800 border-gray-700 text-white">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-white">
          {appName || "App Requirements"}
        </CardTitle>
        <CardDescription className="text-gray-400">
          Extracted entities, roles, and features
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Entities */}
        <div>
          <p className="text-sm font-medium text-gray-300 mb-2">Entities</p>
          <div className="flex flex-wrap gap-2">
            {entities.length ? (
              entities.map((e, idx) => (
                <Badge
                  key={`${e}-${idx}`}
                  variant="outline"
                  className="border-gray-600 text-gray-200"
                >
                  {e}
                </Badge>
              ))
            ) : (
              <span className="text-sm text-gray-400">None</span>
            )}
          </div>
        </div>

        <Separator className="bg-gray-700" />

        {/* Roles */}
        <div>
          <p className="text-sm font-medium text-gray-300 mb-2">Roles</p>
          <div className="flex flex-wrap gap-2">
            {roles.length ? (
              roles.map((r, idx) => (
                <Badge
                  key={`${r}-${idx}`}
                  variant="outline"
                  className="border-gray-600 text-gray-200"
                >
                  {r}
                </Badge>
              ))
            ) : (
              <span className="text-sm text-gray-400">None</span>
            )}
          </div>
        </div>

        <Separator className="bg-gray-700" />

        {/* Features */}
        <div>
          <p className="text-sm font-medium text-gray-300 mb-2">Features</p>
          <div className="flex flex-wrap gap-2">
            {features.length ? (
              features.map((f, idx) => (
                <Badge
                  key={`${f}-${idx}`}
                  variant="outline"
                  className="border-gray-600 text-gray-200"
                >
                  {f}
                </Badge>
              ))
            ) : (
              <span className="text-sm text-gray-400">None</span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default RequirementsDisplay;
