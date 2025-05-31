"use client";

// imports

// providers
import { ThemeProvider } from "@mui/material/styles";

// components
import CssBaseline from "@mui/material/CssBaseline";

// hooks
import { useSelector } from "react-redux";

// theme
import { getTheme } from "@/lib/theme";

// interfaces
import { RootState } from "@/store/index";

type props = {
  children: React.ReactNode;
};

export default function ThemeProviderWraper({ children }: props) {
  const mode = useSelector((state: RootState) => state.theme.mode);
  const theme = getTheme(mode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
