import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { AppSidebar } from "./components/app-sidebar.jsx";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <SidebarProvider>
        <AppSidebar />
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
          <App />
        </main>
      </SidebarProvider>
    </BrowserRouter>
  </StrictMode>
);
