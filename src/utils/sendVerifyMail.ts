// ===================== Imports ===================== //

// Firebase
import { User, sendEmailVerification } from "firebase/auth";

// Utils
import { toast } from "react-hot-toast";
import { createNotification } from "@/utils/notifications";

// ===================== Functions ===================== //

/**
 * handleVerifyEmail
 *
 * @description
 * - Sends a verification email to the currently logged-in Firebase user.
 * - Displays loading, success, and error toasts accordingly.
 *
 * @param {User | null} currentUser - The currently authenticated Firebase user.
 */
export default async function handleVerifyEmail(currentUser: User | null) {
  // Exit early if no user is provided
  if (!currentUser) return;

  // Show loading toast while sending email
  const toastId = toast.loading("Sending verification email...");

  try {
    // Send verification email via Firebase
    await sendEmailVerification(currentUser);

    // Send Notification to the user
    await createNotification(
      currentUser.uid,
      "Verification Email Sent",
      "A verification email has been sent to your registered email address. Please check your inbox."
    );

    // Show success toast with existing toast ID to update
    toast.success("Verification email sent successfully", { id: toastId });
  } catch (error) {
    // Log error and show error toast with existing toast ID
    console.log("Error sending verification email:", error);
    toast.error("Something went wrong. Please try again later.", { id: toastId });
  }
}
