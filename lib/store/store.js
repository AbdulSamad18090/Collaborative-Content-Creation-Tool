import { configureStore } from "@reduxjs/toolkit";
import documentSlice from "@/lib/slices/documentSlice"
const store = configureStore({
  reducer: {
    documentSlice
  },
});

export default store;
