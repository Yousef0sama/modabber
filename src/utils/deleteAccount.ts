// imports

// firebase
import { auth } from "@/lib/firebase";
import { deleteUser, signOut } from "firebase/auth";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

// toast
import toast from "react-hot-toast";

// interfaces
import { User } from "firebase/auth";

/**
 * Deletes the user's account from Firebase Auth and Firestore.
 *
 * @param currentUser - The currently authenticated user
 * @returns boolean indicating success or failure
 */
export default async function deleteAccount(
  currentUser: User | null
): Promise<boolean> {
  try {
    // 1. Check if a user is logged in
    if (!currentUser) {
      toast.error("No user is currently logged in.");
      return false;
    }

    // 2. Delete user document from Firestore
    const userRef = doc(db, "users", currentUser.uid);
    await deleteDoc(userRef);

    // 3. Delete user from Firebase Auth
    await deleteUser(currentUser);

    // 4. Sign out the user after deletion
    await signOut(auth);

    // 5. Show success message
    toast.success("Account deleted successfully.");
    return true;
  } catch (error) {
    console.error("Error deleting user account:", error);
    toast.error("Failed to delete account. Please try again later.");
    return false;
  }
}
