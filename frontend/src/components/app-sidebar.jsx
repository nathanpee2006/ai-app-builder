import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProjects } from "../utils/apiUtils";

import { FolderClosed, SquarePen } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";

export function AppSidebar() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        setError(null);
        const response = await getProjects();
        setProjects(response);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
        setError("Failed to load projects");
        setProjects([]);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <h2 className="text-lg font-semibold">ai app builder</h2>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>build. build. build.</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild onClick={() => navigate("/")}>
                  <a>
                    <SquarePen />
                    <span>New Project</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <Collapsible defaultOpen className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      <FolderClosed />
                      <span>Projects</span>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {loading && (
                        <div className="px-3 py-2 text-sm text-gray-400">
                          Loading projects...
                        </div>
                      )}
                      {error && (
                        <div className="px-3 py-2 text-sm text-red-400">
                          {error}
                        </div>
                      )}
                      {!loading && !error && projects.length === 0 && (
                        <div className="px-3 py-2 text-sm text-gray-400">
                          No projects found
                        </div>
                      )}
                      {!loading &&
                        !error &&
                        projects.map((project) => (
                          <SidebarMenuSubButton
                            key={project._id}
                            onClick={() => navigate(`/projects/${project._id}`)}
                          >
                            {project.extractedRequirements.appName}
                          </SidebarMenuSubButton>
                        ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
