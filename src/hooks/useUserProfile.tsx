// ========== Imports ========== //

// Firebase
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

// Utils
import { useQuery } from "@tanstack/react-query";

// ========== Helper Function ========== //

/**
 * @helper
 *
 * @description
 * - This function fetches user data from Firestore based on the provided UID.
 * - It retrieves the user document from the "users" collection and returns the data.
 * - If the user document does not exist, it throws an error.
 *
 * @param uid - The user ID.
 * @returns The user data from Firestore.
 * @throws If user data does not exist.
 */
async function fetchUserData(uid: string) {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    throw new Error("User data not found");
  }

  return userSnap.data();
}

// ========== Hook ========== //

/**
 *
 * @hook
 * useUserProfile
 *
 * @description
 * Custom hook to fetch user profile data using React Query.
 * Handles:
 * - Fetches user document from Firestore using the UID.
 * - Uses React Query for caching, loading, and error states.
 *
 * @param uid - The Firebase user ID.
 * @returns Query object containing loading, error, and data states.
 */
export default function useUserProfile(uid?: string) {
  return useQuery({
    queryKey: ["userData", uid],
    queryFn: () => fetchUserData(uid!),
    enabled: !!uid, // Only run query if uid exists
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
