// ===================== Imports ===================== //

// Firebase
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  orderBy,
} from "firebase/firestore";

// Interfaces
import { Notification } from "@/interfaces/interfaces";

// ===================== Utilities ===================== //

/**
 * unReadNotificationsCount
 *
 * @description
 * - Counts the number of unread notifications in an array.
 *
 * @param {Notification[]} notifications - Array of notifications
 * @returns {number} - Count of unread notifications
 */
export function unReadNotificationsCount(
  notifications: Notification[]
): number {
  return notifications.filter((notification) => !notification.read).length;
}

/**
 * getNotifications
 *
 * @description
 * - Fetches notifications from the user's subcollection "notifications".
 * - Orders notifications by creation date descending.
 *
 * @param {string} userId - User's UID
 * @returns {Promise<Notification[]>} - Array of notifications
 */
export async function getNotifications(
  userId: string
): Promise<Notification[]> {
  // Reference to user's notifications subcollection
  const notificationsRef = collection(db, "users", userId, "notifications");

  // Query ordered by createdAt descending
  const q = query(notificationsRef, orderBy("createdAt", "desc"));

  // Get snapshot and map docs to Notification objects
  const snapshot = await getDocs(q);
  return snapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as Notification)
  );
}

/**
 * createNotification
 *
 * @description
 * - Creates a new notification inside user's notifications subcollection.
 * - Sets 'read' to false and uses Firestore server timestamp.
 *
 * @param {string} userId - User's UID
 * @param {string} title - Notification title
 * @param {string} message - Notification message
 */
export async function createNotification(
  userId: string,
  title: string,
  message: string
): Promise<void> {
  const notificationsRef = collection(db, "users", userId, "notifications");

  const date = Date.now();
  // Add new notification document with title, message, read status, and timestamp
  await addDoc(notificationsRef, {
    title,
    message,
    read: false,
    createdAt: date,
  });
}

/**
 * markNotificationAsRead
 *
 * @description
 * - Marks a notification as read inside user's notifications subcollection.
 *
 * @param {string} userId - User's UID
 * @param {string} notificationId - Notification document ID
 */
export async function markNotificationAsRead(
  userId: string,
  notificationId: string
): Promise<void> {
  const notificationDocRef = doc(
    db,
    "users",
    userId,
    "notifications",
    notificationId
  );
  await updateDoc(notificationDocRef, { read: true });
}

/**
 * deleteNotification
 *
 * @description
 * - Deletes a notification from user's notifications subcollection.
 *
 * @param {string} userId - User's UID
 * @param {string} notificationId - Notification document ID
 */
export async function deleteNotification(
  userId: string,
  notificationId: string
): Promise<void> {
  const notificationDocRef = doc(
    db,
    "users",
    userId,
    "notifications",
    notificationId
  );
  await deleteDoc(notificationDocRef);
}
