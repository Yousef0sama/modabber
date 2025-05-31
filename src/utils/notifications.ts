// imports

// firebase
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  orderBy,
} from "firebase/firestore";

// interfaces
import { Notification } from "@/interfaces/interfaces";

/**
 * Utility function to count unread notifications.
 *
 * @param notifications - Array of notification objects
 * @returns The count of unread notifications
 */
export function unReadNotificationsCount(
  notifications: Notification[]
): number {
  // Filter notifications to count only unread ones
  return notifications.filter((notification) => !notification.read).length;
}

/**
 * Fetches notifications for a specific user from Firestore.
 *
 * @param userId - The user's UID
 * @returns An array of Notification objects
 */
export async function getNotifications(
  userId: string
): Promise<Notification[]> {
  const q = query(
    collection(db, "notifications"),
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as Notification)
  );
}

/**
 * Creates a new notification for a user in Firestore.
 *
 * @param userId - The user’s UID
 * @param title - Notification title
 * @param message - Notification message
 */

const date = Date.now();

export async function createNotification(
  userId: string,
  title: string,
  message: string
) {
  await addDoc(collection(db, "notifications"), {
    userId,
    title,
    message,
    read: false,
    createdAt: date,
  });
}

/**
 * Marks a specific notification as read.
 *
 * @param id - Notification document ID
 */
export async function markNotificationAsRead(id: string) {
  const docRef = doc(db, "notifications", id);
  await updateDoc(docRef, { read: true });
}

/**
 * Deletes a specific notification from Firestore.
 *
 * @param id - Notification document ID
 */
export async function deleteNotification(id: string) {
  const docRef = doc(db, "notifications", id);
  await deleteDoc(docRef);
}
