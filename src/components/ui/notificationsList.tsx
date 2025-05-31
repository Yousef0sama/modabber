"use client";

// imports

// hooks
import useMenu from "@/hooks/useMenu";
import useNotifications from "@/hooks/useNotifications";

// components
import { Button, Badge } from "@mui/material";
import FetchNotifications from "../fetch/fetchNotfiications";

// icons
import { Notifications } from "@mui/icons-material";

// utils
import { unReadNotificationsCount } from "@/utils/notifications";

export default function NotificationList() {
  const { anchorEl, open, handleClick, handleClose } = useMenu();
  const { notifications } = useNotifications();

  return (
    <div>
      {/* button with avatar and user name to open the menu */}
      <Button
        onClick={handleClick}
        startIcon={
          notifications.length > 0 ?
          <Badge badgeContent={unReadNotificationsCount(notifications)} color="warning" className="!text-sm">
            <Notifications color="inherit" />
          </Badge>
          :
          <Notifications color="inherit" />
        }
        className="!text-white"
      ></Button>
      {/* menu with notifications */}
      <FetchNotifications
        notifications={notifications}
        anchorEl={anchorEl}
        open={open}
        handleClose={handleClose}
      />
    </div>
  );
}
