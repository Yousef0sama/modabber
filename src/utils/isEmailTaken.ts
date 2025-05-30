// Imports

// firebase
import { fetchSignInMethodsForEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";

/**
 * Checks if the given email is already associated with an existing account.
 *
 * Uses Firebase Auth's `fetchSignInMethodsForEmail` to determine
 * whether the email is in use.
 *
 * @param email - The email address to check.
 * @returns A boolean indicating if the email is already taken.
 */
export default  async function isEmailTaken (email: string): Promise<boolean> {
  try {
    const methods = await fetchSignInMethodsForEmail(auth, email);
    return methods.length > 0; // If sign-in methods exist, the email is taken
  } catch (error) {
    console.error("Error checking email availability:", error);
    return true; // Assume taken in case of error for safety
  }
};
