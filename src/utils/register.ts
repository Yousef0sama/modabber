// imports

// firebase
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

// utilities
import createUserIfNotExist from "./createUser";
import { createNotification } from "@/utils/notifications";

// toast
import { toast } from "react-hot-toast";

// interfaces
import { InputField } from "@/interfaces/interfaces";
import { Dispatch, SetStateAction } from "react";

/**
 * Handles user registration by creating a new Firebase Auth user with email and password,
 * then updating the user's profile with their full name.
 *
 * @param fields - Array of input fields containing user registration data.
 * @param setFields - React state setter to update input fields, mainly for error handling.
 * @returns A Promise that resolves to true on successful registration, false on failure.
 *
 * Behavior:
 * - Extracts email, password, firstName, and lastName from input fields.
 * - Creates user account with Firebase Auth.
 * - Updates the user's display name.
 * - Shows success toast on success.
 * - Handles 'email already in use' error by marking the email field with an error.
 * - Shows generic error toast for other failures.
 */
export default async function handleRegister(
  fields: InputField[],
  setFields: Dispatch<SetStateAction<InputField[]>>
): Promise<boolean> {
  try {
    // Helper to get field value by name or empty string if not found
    const getFieldValue = (name: string) =>
      fields.find((field) => field.name === name)?.value || "";

    const email = getFieldValue("email");
    const password = getFieldValue("password");
    const firstName = getFieldValue("firstName");
    const lastName = getFieldValue("lastName");

    // Create user with email and password in Firebase
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Update user's display name with first and last name
    await updateProfile(userCredential.user, {
      displayName: `${firstName} ${lastName}`.trim(),
    });

    // Create user in Firestore if they don't exist
    createUserIfNotExist(userCredential.user);

    // Notify user of successful registration
    toast.success("User registered successfully");

    // Create a notification for verification if the user is not verified
    if (userCredential.user.emailVerified === false) {
      await createNotification(
        userCredential.user.uid,
        "Welcome!",
        "Please verify your email to access all features."
      );
    }

    return true;
  } catch (error: unknown) {
    const code = (error as { code?: string }).code;

    // Handle email already in use error
    if (code === "auth/email-already-in-use") {
      setFields((prevFields) =>
        prevFields.map((field) =>
          field.name === "email"
            ? {
                ...field,
                isErr: true,
                error: "Email is already in use",
              }
            : field
        )
      );
    } else {
      // General error fallback
      toast.error("Registration failed. Please try again later");
      console.error("Registration error:", error);
    }

    return false;
  }
}
