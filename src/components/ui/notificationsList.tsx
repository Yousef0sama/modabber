"use client";

// ===================== Imports ===================== //

// Hooks
import useMenu from "@/hooks/useMenu";
import useNotifications from "@/hooks/useNotifications";

// Components
import { Button, Badge } from "@mui/material";
import FetchNotifications from "../fetch/fetchNotfiications";

// Icons
import { Notifications } from "@mui/icons-material";

// Utils
import { unReadNotificationsCount } from "@/utils/notifications";

// Interfaces
import { JSX } from "react";

// ===================== Component ===================== //

/**
 * NotificationList component.
 *
 * @component
 * @description
 * Displays a notifications button with a badge showing the count of unread notifications.
 * Opens a menu listing all notifications when clicked.
 *
 * @returns {JSX.Element} The rendered notification button and menu.
 */
export default function NotificationList() : JSX.Element {
  const { anchorEl, open, handleClick, handleClose } = useMenu();
  const { notifications } = useNotifications();

  return (
    <div>
      {/* Notification icon button with unread badge */}
      <Button
        onClick={handleClick}
        startIcon={
          notifications.length > 0 ? (
            <Badge
              badgeContent={unReadNotificationsCount(notifications)}
              color="warning"
              className="!text-sm"
            >
              <Notifications color="inherit" />
            </Badge>
          ) : (
            <Notifications color="inherit" />
          )
        }
        className="!text-white"
      ></Button>

      {/* Menu displaying the list of notifications */}
      <FetchNotifications
        notifications={notifications}
        anchorEl={anchorEl}
        open={open}
        handleClose={handleClose}
      />
    </div>
  );
}
