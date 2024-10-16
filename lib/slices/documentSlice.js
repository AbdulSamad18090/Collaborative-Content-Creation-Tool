import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || ""; // Set the API base URL in env

export const saveDocument = createAsyncThunk(
  "saveDocument",
  async ({ fileName, type, content, createdBy }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/doc/create`, {
        fileName,
        type,
        content,
        createdBy,
      });

      // Return the saved document data from the response
      return response?.data?.document;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data
          ? error.response.data
          : error.message
      );
    }
  }
);


// Document slice
const documentSlice = createSlice({
  name: "documentSlice",
  initialState: {
    error: null, // Error state
    loading: false, // Loading state
    savedDocument: null, // Saved document data after successful save
  },
  reducers: {},
  extraReducers: (builder) => {
    // Handle loading state when saving starts
    builder.addCase(saveDocument.pending, (state) => {
      state.loading = true;
      state.error = null; // Clear previous errors
    });

    // Handle successful document save
    builder.addCase(saveDocument.fulfilled, (state, action) => {
      state.loading = false;
      state.savedDocument = action.payload; // Store the saved document data
    });

    // Handle failure in document save
    builder.addCase(saveDocument.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload; // Store the error message
    });
  },
});

export default documentSlice.reducer;
