// ===================== Imports ===================== //

// Components
import { Menu, MenuItem } from "@mui/material";
import RenderNotification from "@/components/renders/renderNotification";

// Interfaces
import { Notification } from "@/interfaces/interfaces";
import { JSX } from "react";

// ===================== Props Interface ===================== //

interface FetchNotificationsProps {
  notifications: Notification[];
  anchorEl: null | HTMLElement;
  open: boolean;
  handleClose: () => void;
}

// ===================== Component ===================== //

/**
 * FetchNotifications Component
 *
 * @component
 * @description
 * Renders a dropdown menu containing a list of user notifications.
 * If no notifications exist, a placeholder message is displayed.
 *
 * @param {Notification[]} notifications - Array of notification objects to display.
 * @param {HTMLElement | null} anchorEl - The DOM element to anchor the menu to.
 * @param {boolean} open - Whether the menu is currently open.
 * @param {() => void} handleClose - Callback to close the menu.
 *
 * @returns {JSX.Element} A Material UI Menu component with notification items.
 */

export default function FetchNotifications({
  notifications,
  anchorEl,
  open,
  handleClose,
}: FetchNotificationsProps) : JSX.Element {
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
    >
      {/* Render notifications or a message if none */}
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <RenderNotification
            key={notification.id}
            notification={notification}
          />
        ))
      ) : (
        <MenuItem disabled className="text-gray-500">
          No notifications
        </MenuItem>
      )}
    </Menu>
  );
}
