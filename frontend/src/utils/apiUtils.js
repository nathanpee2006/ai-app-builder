import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function analyseDescription(description) {
  try {
    const response = await axios.post(`${API_URL}/api/analyse`, {
      description: description,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    console.error("Error during POST request:", error);
    throw error;
  }
}
