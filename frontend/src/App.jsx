import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProjectDetailPage from "./pages/ProjectDetailPage";

function App({ handleProjectRefresh }) {
  return (
    <Routes>
      <Route
        path="/"
        element={<HomePage handleProjectRefresh={handleProjectRefresh} />}
      />
      <Route path="/projects/:id" element={<ProjectDetailPage />} />
    </Routes>
  );
}

export default App;
