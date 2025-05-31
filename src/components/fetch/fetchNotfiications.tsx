"use client";

// hooks
import useNotifications from "@/hooks/useNotifications";

// components
import { Button, Menu, MenuItem, ListItemIcon } from "@mui/material";

// icons
import { Delete } from "@mui/icons-material";

// utils
import formatDateTime from "@/utils/formatDate";

// interfaces
import { Notification } from "@/interfaces/interfaces";

type FetchNotificationsProps = {
  notifications: Notification[];
  anchorEl: null | HTMLElement;
  open: boolean;
  handleClose: () => void;
};

export default function FetchNotifications({
  notifications,
  anchorEl,
  open,
  handleClose,
}: FetchNotificationsProps) {
  const { deleteNotification, markAsRead } = useNotifications();

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
    >
      {notifications.length > 0 ? (
        notifications.map(({ id, title, message, read, createdAt }) => (
          <MenuItem
            key={id}
            className={`!flex !justify-between ${
              read ? "!bg-gray-200" : "!bg-white"
            }`}
            onClick={() => markAsRead(id)}
          >
            <div>
              <strong>{title}</strong>
              <div>{message}</div>
              <small className="text-gray-500">
                {formatDateTime(createdAt)}
              </small>
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
        ))
      ) : (
        <MenuItem disabled className="text-gray-500">
          No notifications
        </MenuItem>
      )}
    </Menu>
  );
}
