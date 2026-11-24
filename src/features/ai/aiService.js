import api from "@/lib/axios";

// Generate tasks using AI
export const generateAITasks = async (prompt) => {
  const response = await api.post("/ai/generate-tasks", { prompt });
  return response.data;
};

// Save selected AI-generated tasks
export const saveAITasks = async (tasks) => {
  const response = await api.post("/tasks/bulk", { tasks });
  return response.data;
};
