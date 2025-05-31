// imports

// firebase
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  verifyBeforeUpdateEmail,
} from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

// toast
import { toast } from "react-hot-toast";

// utilities
import isEmailTaken from "@/utils/isEmailTaken";

// interfaces
import { User } from "firebase/auth";
import { InputField } from "@/interfaces/interfaces";

/**
 * Updates user's email in both Firebase Auth and Firestore,
 * and resets email verification status.
 *
 * @param newEmail - The new email address to update
 * @param currentPassword - The current password for re-authentication
 * @param user - The authenticated user object
 * @param setFields - State setter to update field errors
 * @returns boolean indicating success or failure
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
      setFields((prevFields) =>
        prevFields.map((field) =>
          field.name === "email"
            ? {
                ...field,
                isErr: true,
                error: "This email is already in use.",
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

    // 3. Update email in Firebase Auth
    await verifyBeforeUpdateEmail(user, newEmail);

    // 4. Update email in Firestore
    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, {
      email: newEmail,
      emailVerified: false,
    });

    // 5. Show success message
    toast.success("Email updated successfully. Please verify your new email.");
    return true;
  } catch (error) {
    const code = (error as { code?: string }).code;

    // Handle wrong password
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

    console.error("Error updating email:", error);
    toast.error("Failed to update email. Please try again.");
    return false;
  }
}
