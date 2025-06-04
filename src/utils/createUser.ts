// ===================== Firebase Imports ===================== //

import { db } from "@/lib/firebase";
import { User } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";

// ===================== Firestore Utility ===================== //

/**
 * createUserIfNotExist
 *
 * @description
 * - Creates a new user document in Firestore if it doesn't already exist.
 * - This function is typically called after a user signs up or logs in.
 * - It initializes the user's document with default values such as displayName, email,
 * createdAt timestamp, and initial financial values (totalIncome, totalExpense, budget).
 *
 *
 * @param {User} user - The authenticated Firebase user object.
 * @returns {Promise<void>}
 */
export default async function createUserIfNotExist(user: User): Promise<void> {
  // 1. Reference the user's document in the "users" collection
  const userRef = doc(db, "users", user.uid);

  // 2. Check if the document already exists
  const userSnap = await getDoc(userRef);

  // 3. If it doesn't exist → create it with default values
  if (!userSnap.exists()) {
    await setDoc(userRef, {
      displayName: user.displayName,   // User's display name
      email: user.email,               // User's email
      createdAt: serverTimestamp(),    // Timestamp for account creation
      totalIncome: 0,                  // Initial income
      totalExpense: 0,                 // Initial expense
      budget: 0,                       // Initial budget
    });
  }
}
