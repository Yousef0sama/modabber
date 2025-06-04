"use client";

// ===================== Imports ===================== //

// Hooks
import useNotifications from "@/hooks/useNotifications";

// Components
import { Button, MenuItem, ListItemIcon } from "@mui/material";

// Icons
import { Delete } from "@mui/icons-material";

// Utils
import formatDateTime from "@/utils/formatDate";

// Interfaces
import { Notification } from "@/interfaces/interfaces";
import { JSX } from "react";

interface RenderNotificationsProps {
  notification: Notification;
}

// ===================== Component ===================== //

/**
 * RenderNotification component.
 *
 * @component
 * @description
 * Renders a single notification inside a menu list.
 * Handles marking the notification as read and deleting it.
 *
 * @param {RenderNotificationsProps} props - Component props.
 * @param {Notification} props.notification - Notification object containing id, title, message, etc.
 *
 * @returns {JSX.Element} The rendered notification item.
 */
export default function RenderNotification({
  notification,
}: RenderNotificationsProps): JSX.Element {
  const { deleteNotification, markAsRead } = useNotifications();
  const { id, title, message, createdAt, read } = notification;

  return (
    <MenuItem
      className={`!flex !justify-between ${
        read ? "!bg-gray-200" : "!bg-white"
      }`}
      onClick={() => markAsRead(id)}
    >
      <div>
        <strong>{title}</strong>
        <p>{message}</p>
        <small className="text-gray-500">{formatDateTime(createdAt)}</small>
      </div>

      <ListItemIcon className="!justify-end">
        <Button
          onClick={(e) => {
            e.stopPropagation();
            deleteNotification(id);
          }}
        >
          <Delete fontSize="small" color="error" />
        </Button>
      </ListItemIcon>
    </MenuItem>
  );
}
