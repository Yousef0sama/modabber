// ===================== Imports ===================== //

// Firebase
import { updateProfile, User } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

// Utilities
import { toast } from "react-hot-toast";

// ===================== Function ===================== //

/**
 * changeName
 *
 * @description
 * Updates the user's display name in both Firebase Authentication and Firestore.
 *
 * @param {string} firstName - User's first name.
 * @param {string} lastName - User's last name.
 * @param {User} user - The currently authenticated Firebase user.
 * @returns {Promise<boolean>} Returns true if the update was successful, otherwise false.
 */
export default async function changeName(
  firstName: string,
  lastName: string,
  user: User
): Promise<boolean> {
  try {
    const fullName = `${firstName} ${lastName}`.trim();

    // 1. Update displayName in Firestore "users" collection
    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, { displayName: fullName });

    // 2. Update displayName in Firebase Authentication
    await updateProfile(user, { displayName: fullName });

    // 3. Show success toast
    toast.success("Name updated successfully");

    return true;
  } catch (error) {
    // Log error and show error toast
    console.error("Error updating name:", error);
    toast.error("Failed to update name. Please try again.");
    return false;
  }
}
