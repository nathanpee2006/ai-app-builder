import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

import {
  FolderClosed,
  SquarePen,
  MoreHorizontal,
  Trash2,
  Share2,
} from "lucide-react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { deleteProject } from "../utils/apiUtils";

export function AppSidebar({ projects, onProjectDeleted }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const currentProjectId =
    location.pathname.match(/\/projects\/([a-zA-Z0-9]{24})/)?.[1] || null;

  console.log(`Current project id: ${currentProjectId}`);
  console.log(`Project to delete: ${projectToDelete}`);

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
                <SidebarMenuButton onClick={() => navigate("/")}>
                  <SquarePen />
                  <span>New Project</span>
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
                      {projects.length === 0 && (
                        <div className="px-3 py-2 text-sm text-gray-400">
                          No projects found
                        </div>
                      )}
                      {projects.map((project) => (
                        <div
                          key={project._id}
                          className="flex items-center justify-between group"
                        >
                          <SidebarMenuSubButton
                            onClick={() => navigate(`/projects/${project._id}`)}
                            className="flex-1 text-left p-1"
                          >
                            {project.extractedRequirements.appName}
                          </SidebarMenuSubButton>
                          <DropdownMenu modal={false}>
                            <DropdownMenuTrigger asChild>
                              <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-700 rounded">
                                <MoreHorizontal className="h-4 w-4" />
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => {
                                  setProjectToDelete(project);
                                  setDeleteDialogOpen(true);
                                }}
                                className="text-red-400 focus:text-red-400"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                              <DropdownMenuItem disabled>
                                <Share2 className="h-4 w-4 mr-2" />
                                Share
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Project</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "
              {projectToDelete?.extractedRequirements?.appName}"? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={async () => {
                try {
                  await deleteProject(projectToDelete._id);
                  setDeleteDialogOpen(false);

                  // Refresh project list
                  if (onProjectDeleted) {
                    await onProjectDeleted();
                  }

                  // If viewing the deleted project, redirect to home
                  if (currentProjectId === projectToDelete._id) {
                    console.log("Navigate to home executed");
                    navigate("/");
                  }
                } catch (error) {
                  console.error("Failed to delete project:", error);
                }
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Sidebar>
  );
}
