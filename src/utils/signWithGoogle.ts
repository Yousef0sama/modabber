// ===================== Imports ===================== //

// Firebase
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";

// Utilities
import createUserIfNotExist from "./createUser";

// Toast
import { toast } from "react-hot-toast";

// ===================== Functions ===================== //

/**
 * handleGoogle
 *
 * @description
 * - Handles user login via Google OAuth using Firebase's popup method.
 * - On success, creates the user if not exist, shows success toast, and returns true.
 * - On failure, shows error toast and returns false.
 *
 * @returns {Promise<boolean>} - Resolves to true if login succeeds, false otherwise.
 */
export default async function handleGoogle(): Promise<boolean> {
  try {
    // Trigger Google sign-in popup
    const { user } = await signInWithPopup(auth, googleProvider);

    // Create user in Firestore if not existing
    createUserIfNotExist(user);

    // Show success notification
    toast.success("Logged in with Google successfully");

    return true;
  } catch (error) {
    // Show error notification on failure
    toast.error("Login failed: " + (error as Error).message);
    return false;
  }
}
