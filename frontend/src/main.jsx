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
        <main className="flex-1 min-h-screen bg-gray-900">
          <SidebarTrigger className="fixed top-4 left-4 z-50" />
          <App />
        </main>
      </SidebarProvider>
    </BrowserRouter>
  </StrictMode>
);
