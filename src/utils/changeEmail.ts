// ===================== Imports ===================== //

// Firebase
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  verifyBeforeUpdateEmail,
} from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";


// Utilities
import isEmailTaken from "@/utils/isEmailTaken";
import { toast } from "react-hot-toast";

// Interfaces
import { User } from "firebase/auth";
import { InputField } from "@/interfaces/interfaces";

// ===================== Function ===================== //

/**
 * changeEmail
 *
 * @description
 * Updates the user's email in Firebase Authentication and Firestore,
 * then resets the email verification status.
 *
 * @param {string} newEmail - The new email address to update to.
 * @param {string} currentPassword - The current password for user re-authentication.
 * @param {User} user - The currently authenticated user.
 * @param {React.Dispatch<React.SetStateAction<InputField[]>>} setFields - Setter function for updating input field errors.
 * @returns {Promise<boolean>} Returns true if the update was successful, otherwise false.
 */
export default async function changeEmail(
  newEmail: string,
  currentPassword: string,
  user: User,
  setFields: React.Dispatch<React.SetStateAction<InputField[]>>
): Promise<boolean> {
  try {
    // 1. Check if the new email is already taken
    const alreadyUsed = await isEmailTaken(newEmail);
    if (alreadyUsed) {
      setFields((prev) =>
        prev.map((field) =>
          field.name === "email"
            ? { ...field, isErr: true, error: "This email is already in use." }
            : field
        )
      );
      return false;
    }

    // 2. Re-authenticate the user with the current password
    const credential = EmailAuthProvider.credential(user.email!, currentPassword);
    await reauthenticateWithCredential(user, credential);

    // 3. Send verification email and update email in Firebase Auth
    await verifyBeforeUpdateEmail(user, newEmail);

    // 4. Update email and reset verification status in Firestore
    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, {
      email: newEmail,
      emailVerified: false,
    });

    // 5. Notify success
    toast.success("Email updated successfully. Please verify your new email.");
    return true;
  } catch (error) {
    const code = (error as { code?: string }).code;

    // Handle wrong password error specifically
    if (code === "auth/invalid-credential") {
      setFields((prev) =>
        prev.map((field) =>
          field.name === "currentPassword"
            ? { ...field, isErr: true, error: "Wrong password." }
            : field
        )
      );
      return false;
    }

    // Log and notify other errors
    console.error("Error updating email:", error);
    toast.error("Failed to update email. Please try again.");
    return false;
  }
}
