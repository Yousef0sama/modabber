// ========== MUI Custom Theme ========== //

// MUI
import { createTheme } from "@mui/material/styles";

// Constants
const primaryColor = "#2563eb";

// Light Mode Palette
const lightPalette = {
  background: {
    default: "#f1f1f1",
    paper: "#ffffff",
  },
  text: {
    primary: "#222222",
  },
  primary: {
    main: primaryColor,
  },
};

// Dark Mode Palette
const darkPalette = {
  background: {
    default: "#222222",
    paper: "#333333",
  },
  text: {
    primary: "#ffffff",
  },
  primary: {
    main: primaryColor,
  },
};

// Theme Generator
export const getTheme = (mode: "light" | "dark") =>
  createTheme({
    palette: {
      mode,
      ...(mode === "dark" ? darkPalette : lightPalette),
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              backgroundColor: mode === "dark" ? "#444" : "#fff",
              color: mode === "dark" ? "#fff" : "#000",
              borderRadius: "8px",

              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: mode === "dark" ? "#90caf9" : primaryColor,
              },
            },
            "& label.Mui-focused": {
              color: mode === "dark" ? "#90caf9" : primaryColor,
            },
            "& label": {
              color: mode === "dark" ? "#aaa" : "#333",
            },
          },
        },
      },
    },
  });
