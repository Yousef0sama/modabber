// ===================== Imports ===================== //

// Firebase
import { auth } from "@/lib/firebase";
import { deleteUser, signOut, User, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { db } from "@/lib/firebase";
import { doc, deleteDoc } from "firebase/firestore";

// Utilties
import toast from "react-hot-toast";

// ===================== Auth Utility ===================== //

/**
 * deleteAccount
 *
 * @description
 * Deletes the user's account from Firebase Auth and Firestore.
 * This function performs the following steps:
 * - Checks if the user is logged in.
 * - Re-authenticates the user with their current password.
 * - Deletes the user's document from Firestore.
 * - Deletes the user from Firebase Auth.
 * - Signs out the user after deletion.
 *
 * @param {User | null} user - The currently authenticated user
 * @param {string} currentPassword - The user's current password for re-authentication
 * @returns {Promise<boolean>} - Whether the operation succeeded
 */
export default async function deleteAccount(
  user: User | null,
  currentPassword: string,
): Promise<boolean> {
  try {

    // Check if user is logged in
    if (!user) {
      toast.error("You must be logged in to delete your account.");
      return false;
    }

    // 1. Re-authenticate the user with the current password
    const credential = EmailAuthProvider.credential(user.email!, currentPassword);
    await reauthenticateWithCredential(user, credential);

    // 2. Delete user document from Firestore
    const userRef = doc(db, "users", user.uid);
    await deleteDoc(userRef);

    // 3. Delete user from Firebase Auth
    await deleteUser(user);

    // 4. Sign out the user after deletion
    await signOut(auth);

    // 5. Show success toast
    toast.success("Account deleted successfully.");
    return true;
  } catch (error) {
    console.error("Error deleting user account:", error);
    toast.error("Failed to delete account. Please try again later.");
    return false;
  }
}
