// ========== Imports ========== //

// Hooks
import { useEffect, useState } from "react";

// Utilities
import { getWaitTime } from "@/utils/countdown";

// ========== Hook ========== //

/**
 * @hook
 * useResetCooldown
 *
 * @description
 * Custom hook to manage cooldown logic for password reset attempts.
 * Handles:
 * - Countdown timer for next allowed attempt.
 * - Tracks number of attempts.
 * - Enforces wait time between attempts.
 * - Provides countdown timer until next allowed attempt.
 *
 * @returns {{
 *  countdown: number, // seconds remaining until next attempt allowed
 *  attempts: number,  // current number of attempts
 *  registerAttempt: () => void // function to register a new attempt
 * }}
 */
export default function useResetCooldown() {
  const [countdown, setCountdown] = useState(0);
  const [attempts, setAttempts] = useState(0);

  // Initialize attempts and countdown from localStorage on mount
  useEffect(() => {
    const savedAttempts = Number(localStorage.getItem("fp_attempts") || "0");
    const expireTime = Number(localStorage.getItem("fp_expireTime") || "0");
    const now = Date.now();

    setAttempts(savedAttempts);

    if (expireTime > now) {
      // Calculate remaining cooldown in seconds
      const remainingSeconds = Math.ceil((expireTime - now) / 1000);
      setCountdown(remainingSeconds);
    }
  }, []);

  // Countdown timer updates every second until zero
  useEffect(() => {
    if (countdown <= 0) return;

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [countdown]);

  /**
   * Register a new password reset attempt.
   * Updates attempts count and cooldown expiration time.
   */
  const registerAttempt = () => {
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    localStorage.setItem("fp_attempts", String(newAttempts));

    const waitTime = getWaitTime(newAttempts - 1); // based on previous attempts
    const expireAt = Date.now() + waitTime;
    localStorage.setItem("fp_expireTime", String(expireAt));

    setCountdown(Math.ceil(waitTime / 1000));
  };

  return { countdown, attempts, registerAttempt };
}
