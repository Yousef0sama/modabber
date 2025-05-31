"use client";

// imports

// hooks
import { useState, useEffect } from "react";
import { useThemeMode } from "@/hooks/useThemeMode";

// components
import { Switch, Skeleton } from "@mui/material";

// interfaces
type ColorType =
  | "primary"
  | "secondary"
  | "error"
  | "info"
  | "success"
  | "warning"
  | "default";

interface Props {
  color?: ColorType;
}

export default function ThemeSwitcher({ color = "primary" }: Props) {
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
