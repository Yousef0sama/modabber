// imports

// firebase
import { updateProfile, User } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

// toast
import { toast } from "react-hot-toast";

/**
  * Updates the user's display name in both Firebase Auth and Firestore
  @param firstName - User's first name
  @param lastName - User's last name
  @param user - Firebase User object
  @returns boolean indicating success or failure
*/

export default async function changeName(
  firstName: string,
  lastName: string,
  user: User
): Promise<boolean> {
  try {
    const fullName = `${firstName} ${lastName}`.trim();

    // 1. Update displayName in Firestore "users" collection
    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, { displayName: fullName });

    // 2. Update displayName in Firebase Authentication
    await updateProfile(user, {
      displayName: fullName,
    });

    // 3. Show success toast
    toast.success("Name updated successfully");

    return true;
  } catch (error) {
    // Handle error and show toast
    console.error("Error updating name:", error);
    toast.error("Failed to update name. Please try again.");
    return false;
  }
}
