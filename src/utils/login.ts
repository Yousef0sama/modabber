// ===================== Imports ===================== //

// Firebase
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

// Toast
import { toast } from "react-hot-toast";

// Utilities
import createUserIfNotExist from "./createUser";
import { createNotification } from "@/utils/notifications";

// Interfaces
import { Dispatch, SetStateAction } from "react";
import { InputField } from "@/interfaces/interfaces";

// ===================== Utility ===================== //

/**
 * handleLogin
 *
 * @description
 * - Handles user login with email and password using Firebase Authentication.
 * - Sets persistence mode based on user preference (remember me or session only).
 * - Validates input fields and provides feedback via toasts.
 * - Behavior:
 *   - Sets persistence mode.
 *   - Extracts email/password from input fields.
 *   - Attempts sign-in with Firebase.
 *   - Shows relevant toasts or validation errors.
 *   - Creates user in database if not already present.
 *
 * @param {InputField[]} fields - Array of input fields containing email and password values.
 * @param {Dispatch<SetStateAction<InputField[]>>} setFields - React state setter to update fields for validation errors.
 * @param {boolean} remember - Whether to persist login across sessions (localStorage) or just the current session.
 * @returns {Promise<boolean>} - Resolves to true if login succeeds, false otherwise.
 */
export default async function handleLogin(
  fields: InputField[],
  setFields: Dispatch<SetStateAction<InputField[]>>,
  remember: boolean
): Promise<boolean> {
  try {
    // Set Firebase auth persistence mode
    await setPersistence(
      auth,
      remember ? browserLocalPersistence : browserSessionPersistence
    );

    // Helper to get field value by name
    const getFieldValue = (name: string) =>
      fields.find((field) => field.name === name)!.value;

    const email = getFieldValue("email");
    const password = getFieldValue("password");

    // Perform sign-in
    const { user } = await signInWithEmailAndPassword(auth, email, password);

    // Create user in DB if not exists
    createUserIfNotExist(user);

    // Show success toast
    toast.success("Logged in successfully");

    // Notify unverified users
    if (!user.emailVerified) {
      await createNotification(
        user.uid,
        "Welcome!",
        "Please verify your email to access all features."
      );
    }

    return true;
  } catch (error) {
    const code = (error as { code?: string }).code;

    // Reset all fields to remove previous errors
    setFields((prev) =>
      prev.map((field) => ({
        ...field,
        isErr: false,
        error: "",
      }))
    );
    // Handle specific error codes
    if (code === "auth/invalid-credential") {
      setFields((prev) =>
        prev.map((field) => ({
          ...field,
          isErr: true,
          error: "Invalid email or password",
        }))
      );
    } else {
      toast.error("Login failed. Please try again later");
      console.error("Login error:", code);
    }

    return false;
  }
}
