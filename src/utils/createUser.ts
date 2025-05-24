// Firebase imports
import { db } from "@/lib/firebase";
import { User } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";

/**
 * Creates a new user document in Firestore if it doesn't already exist.
 *
 * @param user - The authenticated Firebase user object.
 */
export default async function createUserIfNotExist(user: User) {
  // 1. Reference the user's document in the "users" collection
  const userRef = doc(db, "users", user.uid);

  // 2. Check if the user document already exists
  const userSnap = await getDoc(userRef);

  // 3. If it doesn't exist, create it with default values
  if (!userSnap.exists()) {
    await setDoc(userRef, {
      displayName: user.displayName,     // User's display name
      email: user.email,                 // User's email
      createdAt: serverTimestamp(),      // Timestamp for when the user was created
      totalIncome: 0,                    // Default total income
      totalExpense: 0,                   // Default total expense
      budget: 0,                         // Default budget
    });
  }
}
