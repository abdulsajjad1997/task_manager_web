import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { generateAITasks, saveAITasks } from "./aiService";

// Generate AI tasks
export const generateTasks = createAsyncThunk(
  "ai/generateTasks",
  async (prompt, { rejectWithValue }) => {
    try {
      return await generateAITasks(prompt);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error ||
          error.response?.data?.message ||
          error.message,
      );
    }
  },
);

// Save selected AI-generated tasks
export const saveGeneratedTasks = createAsyncThunk(
  "ai/saveGeneratedTasks",
  async (tasks, { rejectWithValue }) => {
    try {
      return await saveAITasks(tasks);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error ||
          error.response?.data?.message ||
          error.message,
      );
    }
  },
);

const initialState = {
  generatedPlan: null,
  generating: false,
  saving: false,
  error: null,
};

const aiSlice = createSlice({
  name: "ai",
  initialState,
  reducers: {
    clearGeneratedPlan: (state) => {
      state.generatedPlan = null;
      state.error = null;
    },
    clearAIError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Generate tasks
      .addCase(generateTasks.pending, (state) => {
        state.generating = true;
        state.error = null;
      })
      .addCase(generateTasks.fulfilled, (state, action) => {
        state.generating = false;
        state.generatedPlan = action.payload.tasks;
      })
      .addCase(generateTasks.rejected, (state, action) => {
        state.generating = false;
        state.error = action.payload || "Unable to generate tasks.";
      })

      // Save selected tasks
      .addCase(saveGeneratedTasks.pending, (state) => {
        state.saving = true;
        state.error = null;
      })
      .addCase(saveGeneratedTasks.fulfilled, (state) => {
        state.saving = false;
      })
      .addCase(saveGeneratedTasks.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload || "Unable to save tasks.";
      });
  },
});

export const { clearGeneratedPlan, clearAIError } = aiSlice.actions;

export default aiSlice.reducer;
