// imports

// redux
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interfaces
import { ThemeState } from "@/interfaces/interfaces";

// initial state
const initialState: ThemeState = {
  mode: "light",
};

// create slice
const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    /**
     * Toggles between light and dark mode
     */
    toggleTheme(state) {
      state.mode = state.mode === "light" ? "dark" : "light";
    },

    /**
     * Sets theme mode explicitly
     * @param action - "light" | "dark"
     */
    setTheme(state, action: PayloadAction<"light" | "dark">) {
      state.mode = action.payload;
    },
  },
});

// exports
export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
