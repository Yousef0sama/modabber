"use client";

// ===================== Imports ===================== //

// Hooks
import { useState, useEffect } from "react";
import { useThemeMode } from "@/hooks/useThemeMode";

// Components
import { Switch, Skeleton } from "@mui/material";

// Interfaces
import { JSX } from "react";

/**
 * Defines the allowed MUI color types for the switch.
 */
type ColorType =
  | "primary"
  | "secondary"
  | "error"
  | "info"
  | "success"
  | "warning"
  | "default";

interface ThemeSwitcherProps {
  color?: ColorType;
}

// ===================== Component ===================== //

/**
 * ThemeSwitcher component.
 *
 * @component
 * @description
 * Renders a toggle switch to switch between light and dark themes.
 * Uses a custom hook to manage the theme mode. Shows a skeleton
 * placeholder during server-side rendering to avoid hydration issues.
 *
 * @param {ThemeSwitcherProps} props - The props object.
 * @param {ColorType} [props.color="primary"] - MUI color type for the switch.
 *
 * @returns {JSX.Element} The rendered theme switcher.
 */
export default function ThemeSwitcher({ color = "primary" }: ThemeSwitcherProps) : JSX.Element {
  // get current theme mode and toggle function from custom hook
  const { mode, toggle } = useThemeMode();

  // state to check if component is mounted on client side
  const [isClient, setIsClient] = useState(false);

  // mark component as mounted on client after first render
  useEffect(() => {
    setIsClient(true);
  }, []);

  // while server-side rendering, show skeleton placeholder
  if (!isClient) {
    return <Skeleton variant="rounded" width={100} height={26} />;
  }

  // render the switch with the current mode and toggle handler
  return <Switch color={color} checked={mode === "dark"} onChange={toggle} />;
}
