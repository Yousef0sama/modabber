// imports

// firebase
import { User, sendEmailVerification } from "firebase/auth";

// utils
import { toast } from "react-hot-toast";

/**
 * Sends a verification email to the currently logged-in user.
 *
 * This function:
 * - Shows a loading toast while the email is being sent.
 * - Sends the verification email using Firebase.
 * - Shows a success toast if the email was sent successfully.
 * - Catches and logs any errors, and displays an error toast.
 *
 * @param {User | null} currentUser - The currently authenticated Firebase user.
 */
export default async function handleVerifyEmail(currentUser: User | null) {
  // Exit if no user is provided
  if (!currentUser) return;

  // Show loading toast
  const toastId = toast.loading("Sending verification email...");

  try {
    // Send the verification email
    await sendEmailVerification(currentUser);

    // Show success toast
    toast.success("Verification email sent successfully", { id: toastId });
  } catch (error) {
    // Log and show error toast
    console.log("Error sending verification email:", error);
    toast.error("Something went wrong. Please try again later.", { id: toastId });
  }
}
