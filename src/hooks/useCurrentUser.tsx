// imports

// hooks
import { useState, useEffect } from "react";

// firebase
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";

/**
 * Custom hook to track the currently authenticated Firebase user.
 * Returns `User` object when logged in, or `null` when not authenticated.
 */
export default function useCurrentUser() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) =>
      setCurrentUser(user)
    );
    return () => unsubscribe();
  }, []);

  return currentUser;
}
