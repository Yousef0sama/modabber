// ===================== Imports ===================== //

// Firebase
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";

// Toast
import { toast } from "react-hot-toast";

// Interfaces
import { InputField } from "@/interfaces/interfaces";
import { Dispatch, SetStateAction } from "react";

// ===================== handleForgetPassword ===================== //

/**
 * handleForgetPassword
 *
 * @description
 * This function handles the password reset process by sending a reset email to the user.
 * It takes the user's email and a state setter function to update form fields in case of errors.
 * Behavior:
 * - Attempts to send a password reset email using Firebase Authentication.
 * - On success, shows a success toast.
 * - If user is not found, marks the email field with an error and shows an error toast.
 * - For other errors, shows a generic failure toast and logs the error.
 *
 * @param {string} email - The user's email address to send the reset link.
 * @param {Dispatch<SetStateAction<InputField[]>>} setFields - React state setter for updating form input fields, mainly to show errors.
 * @returns {Promise<boolean>} - Resolves to true if email sent successfully, otherwise false.
 */
export default async function handleForgetPassword(
  email: string,
  setFields: Dispatch<SetStateAction<InputField[]>>
): Promise<boolean> {
  try {
    await sendPasswordResetEmail(auth, email);
    toast.success("Password reset email sent successfully");
    return true;
  } catch (error: unknown) {
    const code = (error as { code?: string })?.code;

    if (code === "auth/user-not-found") {
      setFields((prevFields) =>
        prevFields.map((field) =>
          field.name === "email"
            ? { ...field, isErr: true, error: "User not found" }
            : field
        )
      );
      toast.error("User not found");
    } else {
      toast.error("Failed to send reset email. Please try again later");
      console.error("Reset password error:", error);
    }

    return false;
  }
}
