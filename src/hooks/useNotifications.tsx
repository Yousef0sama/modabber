// imports

// hooks
import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import useCurrentUser from "./useCurrentUser";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// firebase
import { db } from "@/lib/firebase";
import {
  collection,
  onSnapshot,
  query as firestoreQuery,
  where,
  orderBy,
} from "firebase/firestore";

// redux
import { setNotifications } from "@/store/features/notificationsSlice";

// utils
import {
  createNotification,
  deleteNotification,
  getNotifications,
  markNotificationAsRead,
} from "@/utils/notifications";

// interfaces
import { Notification } from "@/interfaces/interfaces";

export default function useNotifications() {
  const currentUser = useCurrentUser();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const queryKey = useMemo(
    () => ["notifications", currentUser?.uid],
    [currentUser?.uid]
  );

  // Fetch notifications once (just in case, real-time is main)
  const query = useQuery({
    queryKey,
    queryFn: () => getNotifications(currentUser!.uid),
    enabled: !!currentUser,
  });

  useEffect(() => {
    if (query.data) {
      dispatch(setNotifications(query.data));
    }
  }, [query.data, dispatch]);

  // Realtime listener to Firestore
  useEffect(() => {
    if (!currentUser) return;

    const q = firestoreQuery(
      collection(db, "notifications"),
      where("userId", "==", currentUser.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notifications: Notification[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Notification[];

      // Update Redux and Query Cache
      dispatch(setNotifications(notifications));
      queryClient.setQueryData(queryKey, notifications);
    });

    return () => unsubscribe();
  }, [currentUser, dispatch, queryClient, queryKey]);

  // Create notification
  const { mutate: createNotificationMutation } = useMutation({
    mutationFn: ({
      userId,
      title,
      message,
    }: {
      userId: string;
      title: string;
      message: string;
    }) => createNotification(userId, title, message),
  });

  // Mark notification as read
  const { mutate: markAsReadMutation } = useMutation({
    mutationFn: async (id: string) => {
      await markNotificationAsRead(id);
    },
  });

  // Delete notification
  const { mutate: deleteNotificationMutation } = useMutation({
    mutationFn: async (id: string) => {
      await deleteNotification(id);
    },
  });

  return {
    notifications: query.data || [],
    isLoading: query.isLoading,
    error: query.error,
    createNotification: createNotificationMutation,
    markAsRead: markAsReadMutation,
    deleteNotification: deleteNotificationMutation,
  };
}
