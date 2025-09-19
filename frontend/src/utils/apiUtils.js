import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function analyseDescription(description) {
  try {
    const response = await axios.post(`${API_URL}/api/analyse`, {
      description: description,
    });
    return response.data;
  } catch (error) {
    console.error("Error during POST request:", error);
    throw error;
  }
}

export async function getProjects() {
  try {
    const response = await axios.get(`${API_URL}/api/projects`);
    return response.data.projects;
  } catch (error) {
    console.error("Error during GET request:", error);
    throw error;
  }
}

export async function getProject(projectId) {
  try {
    const response = await axios.get(`${API_URL}/api/projects/${projectId}`);
    return response.data.project;
  } catch (error) {
    console.error("Error during GET request:", error);
    throw error;
  }
}
