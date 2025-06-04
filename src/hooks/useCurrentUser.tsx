// ===================== Imports ===================== //

// Hooks
import { useState, useEffect } from "react";

// Firebase
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";

// ===================== Hook ===================== //

/**
 * @hook
 * useCurrentUser
 *
 * @description
 * Custom hook to track the currently authenticated Firebase user.
 * This hook listens for authentication state changes and updates the user state accordingly.
 * @returns {User | null} The currently authenticated Firebase user object if logged in, otherwise null.
 */
export default function useCurrentUser() : User | null {
  // State to hold the current user
  // Initialized to null to indicate no user is logged in
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Effect to listen for auth state changes
  // and update the current user state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  return currentUser;
}
