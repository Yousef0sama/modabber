"use client";

// imports

// hooks
import useMenu from "@/hooks/useMenu";
import { useRouter } from "next/navigation";

// firebase
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

// components
import {
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
} from "@mui/material";
import ThemeSwitcher from "./themeSwicher";

// icons
import { Logout, Person, Brightness4, Settings } from "@mui/icons-material";

export default function SettingsList() {

  const { anchorEl, open, handleClick, handleClose } = useMenu();
  const router = useRouter();

  // logout user, close menu and redirect to login page
  const handleLogout = () => {
    signOut(auth);
    handleClose();
    router.push("/auth/login");
  };

  return (
    <div>
      {/* button with avatar and user name to open the menu */}
      <Button
        onClick={handleClick}
        startIcon={
          <Settings />
        }
        className="!capitalize !text-white"
      >
        settings
      </Button>

      {/* menu that shows profile, theme switcher, and logout */}
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {/* profile menu item */}
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

        {/* theme switcher menu item */}
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Brightness4 fontSize="small" />
          </ListItemIcon>
          <ThemeSwitcher color="primary" />
        </MenuItem>

        <Divider />

        {/* logout menu item */}
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
