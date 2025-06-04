// ===================== Imports ===================== //

// Hooks
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

// Firebase
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";


// ===================== Hook ===================== //

/**
 * @hook
 * useAuthListener
 *
 * @description
 * Custom hook to handle user redirection based on authentication status.
 *
 * Behavior:
 * - If the user is **not logged in** and tries to access any route **outside** `/auth/*`,
 *   they are redirected to `/auth/login`.
 * - If the user **is logged in** and tries to access any route **inside** `/auth/*`,
 *   they are redirected to the home page `/`.
 *
 * This hook is meant to be used on client-side pages to guard routes via Firebase auth.
 *
 * @returns {void}
 */
export default function useAuthListener(): void {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const isAuthPage = pathname.startsWith("/auth");

      if (!user && !isAuthPage) {
        // Not logged in and visiting a protected route → redirect to login
        router.push("/auth/login");
      } else if (user && isAuthPage) {
        // Logged in and visiting an auth route → redirect to home
        router.push("/");
      }
    });

    return () => unsubscribe();
  }, [pathname, router]);
}
