// imports

// firebase
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";

// toast
import { toast } from "react-hot-toast";

/**
 * Handles user login via Google OAuth using Firebase's popup method.
 *
 * @returns A Promise that resolves to true if login succeeds, or false if it fails.
 *
 * Behavior:
 * - Opens a popup window for Google sign-in.
 * - On success, resolves true and shows success toast.
 * - On failure, shows error toast and resolves false.
 */
export default async function handleGoogle(): Promise<boolean> {
  try {
    await signInWithPopup(auth, googleProvider);
    toast.success("Logged in with Google successfully");
    return true;
  } catch (error) {
    toast.error("Login failed: " + (error as Error).message);
    return false;
  }
};
