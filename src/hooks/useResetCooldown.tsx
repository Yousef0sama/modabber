// imports

// hooks
import { useEffect, useState } from "react";

// Utilities
import { getWaitTime } from "@/utils/countdown";

/**
 * Custom hook to manage cooldown logic for password reset attempts.
 * Tracks the number of attempts, enforces wait time between attempts,
 * and provides a countdown timer until the next allowed attempt.
 *
 * @returns { countdown, attempts, registerAttempt }
 * countdown: seconds remaining until next attempt allowed
 * attempts: current number of password reset attempts
 * registerAttempt: function to call when a new reset attempt is made
 */
export default function useResetCooldown() {
  const [countdown, setCountdown] = useState(0);
  const [attempts, setAttempts] = useState(0);

  // Initialize attempts and countdown from localStorage on component mount
  useEffect(() => {
    const savedAttempts = Number(localStorage.getItem("fp_attempts") || "0");
    const expireTime = Number(localStorage.getItem("fp_expireTime") || "0");
    const now = Date.now();

    setAttempts(savedAttempts);

    if (expireTime > now) {
      // Calculate remaining cooldown time in seconds
      const remainingSeconds = Math.ceil((expireTime - now) / 1000);
      setCountdown(remainingSeconds);
    }
  }, []);

  // Countdown timer effect, updates every second until countdown reaches zero
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
   * Call this function when a new password reset attempt is made.
   * Updates attempts count and cooldown expiration time.
   */
  const registerAttempt = () => {
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    localStorage.setItem("fp_attempts", String(newAttempts));

    const waitTime = getWaitTime(newAttempts - 1); // wait time based on previous attempts
    const expireAt = Date.now() + waitTime;
    localStorage.setItem("fp_expireTime", String(expireAt));

    setCountdown(Math.ceil(waitTime / 1000));
  };

  return { countdown, attempts, registerAttempt };
}
