import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, RefreshCw, Globe } from "lucide-react";
import { uiHelpers } from "../utils/uiHelpers";

function MockUIDisplay({ requirements, uiMetadata }) {
  const roles = requirements?.roles || [];

  const defaultTab = roles[0] || "role-0";

  return (
    <div className="w-full max-w-[60rem] mx-auto mt-6 rounded-xl border border-gray-200 bg-white text-gray-900 shadow-lg overflow-hidden">
      <div className="flex items-center gap-3 px-4 py-2 bg-gray-100 border-b border-gray-200">
        <span className="h-3 w-3 rounded-full bg-red-400"></span>
        <span className="h-3 w-3 rounded-full bg-yellow-400"></span>
        <span className="h-3 w-3 rounded-full bg-green-400"></span>

        <div className="flex items-center gap-1 ml-3">
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0 text-gray-600"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0 text-gray-600"
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0 text-gray-600"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex-1 flex items-center gap-2 ml-2">
          <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-full px-3 py-1 w-full">
            <Globe className="h-3.5 w-3.5 text-gray-500" />
            <input
              readOnly
              value="https://preview.local/app"
              className="w-full bg-transparent text-xs text-gray-700 outline-none"
            />
          </div>
        </div>

        <span className="hidden sm:inline text-xs text-gray-500 truncate">
          Generated UI Preview
        </span>
      </div>
      <div className="p-4">
        <Tabs defaultValue={defaultTab} className="w-full">
          <TabsList className="w-full bg-gray-100 text-gray-700">
            {roles.map((role) => (
              <TabsTrigger key={role} value={role}>
                {role}
              </TabsTrigger>
            ))}
          </TabsList>

          {roles.map((role) => (
            <TabsContent key={role} value={role} className="mt-4 space-y-5">
              <div className="rounded-xl border border-gray-200 bg-white p-4">
                <div className="text-gray-900 font-medium mb-2">
                  {role} Features
                </div>
                <ul className="list-disc list-inside text-gray-700">
                  {uiHelpers
                    .getFeaturesForRole(role, uiMetadata)
                    .map((f, idx) => (
                      <li key={`${f}-${idx}`}>{f}</li>
                    ))}
                </ul>
              </div>

              {uiHelpers
                .getFormsForRole(role, uiMetadata)
                .map(({ entityName, fields }) => {
                  return (
                    <div
                      key={`${role}-${entityName}`}
                      className="rounded-xl border border-gray-200 bg-white p-4 space-y-3"
                    >
                      <div className="text-gray-900 font-medium">
                        {entityName} Form
                      </div>
                      <div className="grid grid-cols-1 gap-3">
                        {(fields || []).map((field, idx) => (
                          <div
                            key={`${entityName}-${idx}`}
                            className="space-y-1"
                          >
                            <label className="text-sm text-gray-700">
                              {field.name}
                            </label>
                            {field.type !== "textarea" ? (
                              <Input
                                type={field.type}
                                placeholder={field.name}
                                className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
                              />
                            ) : (
                              <Textarea
                                placeholder={field.name}
                                className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
                              />
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="pt-1">
                        <Button>Save {entityName}</Button>
                      </div>
                    </div>
                  );
                })}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}

export default MockUIDisplay;
