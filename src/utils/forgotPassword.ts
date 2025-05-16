// imports

// firebase
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";

// toast
import { toast } from "react-hot-toast";

// interfaces
import { InputField } from "@/interfaces/interfaces";
import { Dispatch, SetStateAction } from "react";

/**
 * Attempts to send a password reset email to the specified address.
 *
 * @param email - The user's email address to send the reset link.
 * @param setFields - React state setter for updating form input fields, mainly to show errors.
 * @returns A Promise that resolves to true if email sent successfully, otherwise false.
 *
 * Behavior:
 * - On success, shows a success toast.
 * - If user is not found, marks the email field with an error and shows an error toast.
 * - For other errors, shows a generic failure toast and logs the error.
 */
export default async function handleForgetPassword(
  email: string,
  setFields: Dispatch<SetStateAction<InputField[]>>
): Promise<boolean> {
  try {
    // Send password reset email using Firebase Auth
    await sendPasswordResetEmail(auth, email);
    toast.success("Password reset email sent successfully");
    return true;
  } catch (error: unknown) {
    // Extract error code if possible
    const code = (error as { code?: string }).code;

    if (code === "auth/user-not-found") {
      // Specific handling: user email not found
      setFields((prevFields) =>
        prevFields.map((field) =>
          field.name === "email"
            ? { ...field, isErr: true, error: "User not found" }
            : field
        )
      );
      toast.error("User not found");
    } else {
      // General error handler
      toast.error("Failed to send reset email. Please try again later");
      console.error("Reset password error:", error);
    }

    return false;
  }
}
