// ===================== Imports ===================== //

// Firebase
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

// Utilities
import createUserIfNotExist from "./createUser";
import { createNotification } from "@/utils/notifications";

// Toast
import { toast } from "react-hot-toast";

// Interfaces
import { InputField } from "@/interfaces/interfaces";
import { Dispatch, SetStateAction } from "react";

// ===================== Functions ===================== //

/**
 * handleRegister
 *
 * @description
 * - Registers a new user using Firebase Authentication with email and password.
 * - Updates the user's display name using first and last name.
 * - Creates a Firestore user document if it does not exist.
 * - Sends a welcome notification if the user's email is not verified.
 * - Handles errors such as 'email already in use' by updating form field errors.
 *
 * @param {InputField[]} fields - Array of input fields with user data.
 * @param {Dispatch<SetStateAction<InputField[]>>} setFields - Setter function to update form fields state.
 * @returns {Promise<boolean>} - Returns true if registration succeeds, otherwise false.
 */
export default async function handleRegister(
  fields: InputField[],
  setFields: Dispatch<SetStateAction<InputField[]>>
): Promise<boolean> {
  try {
    // Helper to get a value from the input fields array by name
    const getFieldValue = (name: string) =>
      fields.find((field) => field.name === name)?.value || "";

    // Extract user input values
    const email = getFieldValue("email");
    const password = getFieldValue("password");
    const firstName = getFieldValue("firstName");
    const lastName = getFieldValue("lastName");

    // Create new user with Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Update user profile displayName
    await updateProfile(userCredential.user, {
      displayName: `${firstName} ${lastName}`.trim(),
    });

    // Create user document in Firestore if not exist
    createUserIfNotExist(userCredential.user);

    // Show success toast notification
    toast.success("User registered successfully");

    // Create email verification notification if email is not verified
    if (userCredential.user.emailVerified === false) {
      await createNotification(
        userCredential.user.uid,
        "Welcome!",
        "Please verify your email to access all features."
      );
    }

    // Return success status
    return true;
  } catch (error: unknown) {
    const code = (error as { code?: string }).code;

    // Handle specific Firebase auth errors
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
      // Handle generic errors
      toast.error("Registration failed. Please try again later");
      console.error("Registration error:", error);
    }

    // Return failure status
    return false;
  }
}
