"use client";

// hooks
import { useState } from "react";
import { useRouter } from "next/navigation";
import useCurrentUser from "@/hooks/useCurrentUser";

// firebase
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

// components
import { Avatar, Button, Menu, MenuItem, ListItemIcon, Divider } from "@mui/material";
import ThemeSwitcher from "./themeSwicher";

// icons
import { Logout, Person, Brightness4 } from "@mui/icons-material";

export default function UserMenu() {
  // state to store the anchor element for the menu (null means menu is closed)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const router = useRouter();

  // get the current logged-in user info
  const currentUser = useCurrentUser();

  // open the menu by setting the anchor element
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // close the menu by resetting the anchor element to null
  const handleClose = () => setAnchorEl(null);

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
          <Avatar sx={{ width: 25, height: 25 }}>
            {currentUser?.displayName?.[0] || ""}
          </Avatar>
        }
        className="!capitalize !text-white"
      >
        {currentUser?.displayName || "Account"}
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
          <ListItemIcon><Person fontSize="small" /></ListItemIcon>
          Profile
        </MenuItem>

        <Divider />

        {/* theme switcher menu item */}
        <MenuItem onClick={handleClose}>
          <ListItemIcon><Brightness4 fontSize="small" /></ListItemIcon>
          <ThemeSwitcher color="primary" />
        </MenuItem>

        <Divider />

        {/* logout menu item */}
        <MenuItem onClick={handleLogout}>
          <ListItemIcon><Logout fontSize="small" /></ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}
