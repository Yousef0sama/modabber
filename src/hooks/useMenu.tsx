// ========== Imports ========== //

// Hooks
import { useState } from "react";

// Interfaces

interface MenuHook {
  anchorEl: HTMLElement | null;
  open: boolean;
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleClose: () => void;
}

// ========== Hook ========== //

/**
 * @hook
 * useMenu
 *
 * @description
 * Custom hook to handle:
 * - the open/close logic of a menu (e.g., dropdown or user menu).
 * - Manages the anchor element for a menu.
 * - Tracks whether the menu is open or closed.
 * - Provides handlers to open and close the menu.
 *
 * @returns {{
 *  - anchorEl: HTMLElement | null
 *  - open: boolean
 *  - handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void
 *  - handleClose: () => void
 * }}
 */
export default function useMenu() : MenuHook {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  return {
    anchorEl,
    open,
    handleClick,
    handleClose,
  };
}
