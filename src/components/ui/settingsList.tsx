"use client";

// ===================== Imports ===================== //

// Hooks
import useMenu from "@/hooks/useMenu";
import { useRouter } from "next/navigation";

// Firebase
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

// Components
import {
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
} from "@mui/material";
import ThemeSwitcher from "./themeSwicher";

// Icons
import { Logout, Person, Brightness4, Settings } from "@mui/icons-material";

// Interfaces
import { JSX } from "react";

// ===================== Component ===================== //

/**
 * SettingsList component.
 *
 * @component
 * @description
 * Displays a dropdown settings menu with options to navigate to the profile page,
 * toggle the theme, and log out of the application.
 *
 * @returns {JSX.Element} The rendered settings button and dropdown menu.
 */
export default function SettingsList() : JSX.Element {
  const { anchorEl, open, handleClick, handleClose } = useMenu();
  const router = useRouter();

  /**
   * Logs out the current user, closes the menu, and redirects to the login page.
   */
  const handleLogout = () => {
    signOut(auth);
    handleClose();
    router.push("/auth/login");
  };

  return (
    <div>
      {/* Button to open the settings menu */}
      <Button
        onClick={handleClick}
        startIcon={<Settings />}
        className="!capitalize !text-white"
      >
        settings
      </Button>

      {/* Dropdown menu with profile, theme toggle, and logout options */}
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {/* Navigate to profile */}
        <MenuItem
          onClick={() => {
            handleClose();
            router.push("/profile");
          }}
        >
          <ListItemIcon>
            <Person fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>

        <Divider />

        {/* Theme switcher */}
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Brightness4 fontSize="small" />
          </ListItemIcon>
          <ThemeSwitcher color="primary" />
        </MenuItem>

        <Divider />

        {/* Logout option */}
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}
