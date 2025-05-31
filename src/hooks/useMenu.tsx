// imports

// hooks
import { useState } from "react";

/**
 * Custom hook to handle the open/close logic of a menu (e.g., dropdown or user menu).
 *
 * @returns An object with:
 *  - `anchorEl`: The current anchor element (null if menu is closed)
 *  - `open`: Boolean representing whether the menu is open
 *  - `handleClick`: Function to open the menu
 *  - `handleClose`: Function to close the menu
 */

export default function useMenu() {
  // State to store the anchor element (the element that triggers the menu)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Boolean to track if the menu is open
  const open = Boolean(anchorEl);

  // Function to open the menu by setting the anchor element
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Function to close the menu by resetting the anchor element
  const handleClose = () => setAnchorEl(null);

  // Expose all values/functions needed to control the menu
  return {
    anchorEl,
    open,
    handleClick,
    handleClose,
  };
}