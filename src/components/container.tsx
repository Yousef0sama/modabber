"use client";

// ===================== Imports ===================== //

// Hooks
import { useSelector } from "react-redux";

// Interfaces
import { RootState } from "@/store/index";
import { JSX } from "react";

/**
 * Props for the Container component.
 */
type props = Readonly<{
  children: React.ReactNode;
  className?: string;
}>;

// ===================== Component ===================== //

/**
 * Container component.
 *
 * @component
 * @description
 * A layout wrapper that applies a theme-based class (`dark` or `light`)
 * to the container based on the Redux store's current theme mode.
 * It also allows optional custom classes via `className` prop.
 *
 * @param {props} props - The component props.
 * @param {React.ReactNode} props.children - Elements to render inside the container.
 * @param {string} [props.className] - Optional custom class names.
 *
 * @returns {JSX.Element} The rendered container component.
 */
export default function Container({ children, className }: props) : JSX.Element {
  // Get current theme mode from Redux store
  const mode = useSelector((state: RootState) => state.theme.mode);

  // Add dark or light class based on theme mode and render children inside main container
  return (
    <main
      className={` ${mode === "dark" ? "dark" : "light"} min-h-[90vh] ${
        className || ""
      }`}
    >
      {children}
    </main>
  );
}
