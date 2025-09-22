import { useState, useEffect } from "react";
import { getProjects } from "../utils/apiUtils";
import { AppSidebar } from "./app-sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import App from "../App";

function ProjectManager() {
  const [projects, setProjects] = useState([]);

  async function refreshProjects() {
    try {
      const response = await getProjects();
      setProjects(response);
    } catch (err) {
      console.error("Failed to fetch projects:", err);
      setProjects([]);
    }
  }

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await getProjects();
        setProjects(response);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
        setProjects([]);
      }
    }
    fetchProjects();
  }, []);

  return (
    <>
      <AppSidebar projects={projects} />
      <SidebarTrigger
        className="fixed top-4 left-4 z-50 transition-[left]
                     duration-200 ease-linear
                     md:peer-data-[state=expanded]:left-[calc(var(--sidebar-width)+1rem)]
                     md:peer-data-[collapsible=icon]:left-[calc(var(--sidebar-width-icon)+1rem)]
                     bg-sidebar text-sidebar-foreground border border-sidebar-border
                     hover:bg-sidebar-accent hover:text-sidebar-accent-foreground
                     shadow rounded-md size-9"
      />
      <main className="flex-1 min-h-screen bg-gray-900">
        <App handleProjectRefresh={refreshProjects} />
      </main>
    </>
  );
}

export default ProjectManager;
