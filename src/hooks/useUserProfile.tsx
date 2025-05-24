// imports

// firebase
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

// utils
import { useQuery } from "@tanstack/react-query";

/**
 * Fetches user data from Firestore using the provided UID.
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

/**
 * Custom hook to fetch user profile data using React Query.
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
