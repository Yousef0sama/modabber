// imports

// hooks
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

// firebase
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

/**
 * Client-side hook to manage user redirection based on authentication status and current route.
 * Hook to manage user redirection based on auth status and current route.
 *
 * Redirects:
 * - If NOT logged in and tries to access any page NOT under /auth/*, redirect to /auth/login
 * - If logged in and tries to access any page under /auth/*, redirect to /
 */
export default function useAuthListener() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const isAuthPage = pathname.startsWith("/auth");

      if (!user && !isAuthPage) {
        // Not logged in & trying to visit protected page → redirect to login
        router.push("/auth/login");
      } else if (user && isAuthPage) {
        // Logged in & trying to visit auth pages → redirect to home
        router.push("/");
      }
    });

    return () => unsubscribe();
  }, [pathname, router]);
}
