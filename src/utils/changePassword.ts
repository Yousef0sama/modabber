// ===================== Imports ===================== //

// Firebase
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
  User,
} from "firebase/auth";

// Utilities
import { toast } from "react-hot-toast";

// Interfaces
import { InputField } from "@/interfaces/interfaces";

// ===================== Function ===================== //

/**
 * changePassword
 *
 * @description
 * Updates the user's password in Firebase Authentication after re-authenticating them.
 *
 * @param {string} newPassword - The new password to be set.
 * @param {string} confirmPassword - Confirmation of the new password.
 * @param {string} currentPassword - The user's current password for re-authentication.
 * @param {User} user - The authenticated Firebase user object.
 * @param {Function} setFields - State setter for updating form field error states.
 * @returns {Promise<boolean>} Returns true if password update succeeded, otherwise false.
 */
export default async function changePassword(
  newPassword: string,
  confirmPassword: string,
  currentPassword: string,
  user: User,
  setFields: React.Dispatch<React.SetStateAction<InputField[]>>
): Promise<boolean> {
  try {
    // 1. Check if new password and confirm password match
    if (newPassword !== confirmPassword) {
      setFields((prevFields) =>
        prevFields.map((field) =>
          field.name === "confirmPassword"
            ? {
                ...field,
                isErr: true,
                error: "Passwords do not match.",
              }
            : field
        )
      );
      return false;
    }

    // 2. Re-authenticate user
    const credential = EmailAuthProvider.credential(
      user.email!,
      currentPassword
    );
    await reauthenticateWithCredential(user, credential);

    // 3. Update password in Firebase Auth
    await updatePassword(user, newPassword);

    // 4. Show success toast
    toast.success("Password updated successfully!");
    return true;
  } catch (error) {
    const code = (error as { code?: string }).code;

    // Handle invalid credentials
    if (code === "auth/invalid-credential") {
      setFields((prevFields) =>
        prevFields.map((field) =>
          field.name === "currentPassword"
            ? {
                ...field,
                isErr: true,
                error: "Wrong password",
              }
            : field
        )
      );
      return false;
    }

    // Log and show general error
    console.error("Error updating password:", error);
    toast.error("Failed to update password. Please try again.");
    return false;
  }
}
