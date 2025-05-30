// imports

// firebase
import { signInWithEmailAndPassword, setPersistence, browserLocalPersistence, browserSessionPersistence } from "firebase/auth";
import { auth } from "@/lib/firebase";

// toast
import { toast } from "react-hot-toast";

// Utilities
import createUserIfNotExist from "./createUser";

// interfaces
import { Dispatch, SetStateAction } from "react";
import { InputField } from "@/interfaces/interfaces";

/**
 * Handles user login with email and password using Firebase Authentication.
 *
 * @param fields - Array of input fields containing email and password values.
 * @param setFields - React state setter to update fields, mainly for showing validation errors.
 * @param remember - Boolean indicating whether to persist login across sessions (localStorage) or just current session.
 * @returns A Promise resolving to true if login succeeds, false otherwise.
 *
 * Behavior:
 * - Sets persistence based on 'remember' flag.
 * - Extracts email and password from input fields.
 * - Attempts login via Firebase.
 * - On failure, marks all fields as error if credentials invalid, or shows generic error toast.
 */
export default async function handleLogin(
  fields: InputField[],
  setFields: Dispatch<SetStateAction<InputField[]>>,
  remember: boolean
): Promise<boolean> {
  try {
    // Set Firebase auth persistence mode
    await setPersistence(auth, remember ? browserLocalPersistence : browserSessionPersistence);

    // Helper function to get value from fields by name
    const getFieldValue = (name: string) => fields.find((field) => field.name === name)!.value;

    const email = getFieldValue("email");
    const password = getFieldValue("password");

    // Perform sign-in with email and password
    const { user } = await signInWithEmailAndPassword(auth, email, password);

    // Create user in Firestore if they don't exist
    createUserIfNotExist(user);

    // Notify user of successful login
    toast.success("Logged in successfully");
    return true;

  } catch (error) {
    const code = (error as { code?: string }).code;

    // Handle invalid credentials error specifically
    if (code === "auth/invalid-credential") {
      setFields((prevFields) =>
        prevFields.map((field) => ({
          ...field,
          isErr: true,
          error: "Invalid email or password",
        }))
      );
    } else {
      // Fallback for other errors
      toast.error("Login failed. Please try again later");
      console.error("Login error:", code);
    }

    return false;
  }
}
