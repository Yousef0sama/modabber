// =============== Imports ===================

// Redux
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Interfaces
import { ThemeState } from "@/interfaces/interfaces";

// =============== Slice ===================

// Initial state
const initialState: ThemeState = {
  mode: "light",
};

// create slice
const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    /**
     *
     * @description
     * Toggles the theme mode between "light" and "dark".
     *
     * @param state - The current theme state.
     */
    toggleTheme(state) {
      state.mode = state.mode === "light" ? "dark" : "light";
    },

    /**
     * @description
     * Sets the theme mode explicitly to either "light" or "dark".
     *
     * @param state - The current theme state.
     * @param action - Redux action carrying the desired theme mode.
     */
    setTheme(state, action: PayloadAction<"light" | "dark">) {
      state.mode = action.payload;
    },
  },
});

// exports
export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
