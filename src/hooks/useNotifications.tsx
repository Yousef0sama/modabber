// ========== Imports ========== //

// Hooks
import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import useCurrentUser from "./useCurrentUser";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Firebase
import { db } from "@/lib/firebase";
import {
  collection,
  onSnapshot,
  query as firestoreQuery,
  orderBy,
} from "firebase/firestore";

// Redux
import { setNotifications } from "@/store/features/notificationsSlice";

// Utils
import {
  createNotification as createNotificationUtil,
  deleteNotification as deleteNotificationUtil,
  getNotifications,
  markNotificationAsRead as markNotificationAsReadUtil,
} from "@/utils/notifications";

// Interfaces
import { Notification } from "@/interfaces/interfaces";

interface NotificationHook {
  notifications: Notification[];
  isLoading: boolean;
  error: unknown;
  createNotification: (data: {
    userId: string;
    title: string;
    message: string;
  }) => void;
  markAsRead: (notificationId: string) => void;
  deleteNotification: (notificationId: string) => void;
}

// ========== Hook ========== //

/**
 * @hook
 * useNotifications
 *
 * @description
 * Custom hook to manage notifications.
 * Handles:
 * - Fetches notifications for the current user.
 * - Listens for real-time updates from Firestore.
 * - Provides functions to create, mark as read, and delete notifications.
 *
 * @returns {{
 *  notifications: Notification[],
 *  isLoading: boolean,
 *  error: unknown,
 *  createNotification: Function,
 *  markAsRead: Function,
 *  deleteNotification: Function,
 * }}
 */
export default function useNotifications(): NotificationHook {
  const currentUser = useCurrentUser();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  // Memoize query key based on current user's UID
  const queryKey = useMemo(() => ["notifications", currentUser?.uid], [
    currentUser?.uid,
  ]);

  // Fetch notifications once (real-time is main source)
  const query = useQuery({
    queryKey,
    queryFn: () => getNotifications(currentUser!.uid),
    enabled: !!currentUser,
  });

  // Update Redux store when query data changes
  useEffect(() => {
    if (query.data) {
      dispatch(setNotifications(query.data));
    }
  }, [query.data, dispatch]);

  // Set up Firestore real-time listener
  useEffect(() => {
    if (!currentUser) return;

    // Create a Firestore query to the subcollection users/{userId}/notifications
    const notificationsRef = collection(
      db,
      "users",
      currentUser.uid,
      "notifications"
    );

    const q = firestoreQuery(
      notificationsRef,
      orderBy("createdAt", "desc")
    );

    // Listen for real-time updates on the notifications subcollection
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notifications: Notification[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Notification[];

      // Update Redux store and react-query cache with real-time data
      dispatch(setNotifications(notifications));
      queryClient.setQueryData(queryKey, notifications);
    });

    // Clean up listener on unmount
    return () => unsubscribe();
  }, [currentUser, dispatch, queryClient, queryKey]);

  // Mutation to create a notification
  const { mutate: createNotificationMutation } = useMutation({
    mutationFn: ({
      userId,
      title,
      message,
    }: {
      userId: string;
      title: string;
      message: string;
    }) => createNotificationUtil(userId, title, message),
  });

  // Mutation to mark a notification as read
  const { mutate: markAsReadMutation } = useMutation({
    mutationFn: async (notificationId: string) => {
      if (!currentUser) return;
      await markNotificationAsReadUtil(currentUser.uid, notificationId);
    },
  });

  // Mutation to delete a notification
  const { mutate: deleteNotificationMutation } = useMutation({
    mutationFn: async (notificationId: string) => {
      if (!currentUser) return;
      await deleteNotificationUtil(currentUser.uid, notificationId);
    },
  });

  // Return all data and methods for use in components
  return {
    notifications: query.data || [],
    isLoading: query.isLoading,
    error: query.error,
    createNotification: createNotificationMutation,
    markAsRead: markAsReadMutation,
    deleteNotification: deleteNotificationMutation,
  };
}
