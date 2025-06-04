"use client";

// ===================== Imports ===================== //

// Hooks
import useForgotPassword from "@/hooks/useForgotPassword";

// Components
import Container from "@/components/container";
import { TextField, Button, Typography } from "@mui/material";

// Providers
import ThemeProviderWraper from "@/providers/themeProvider";

// Utilities
import { formatCountdown } from "@/utils/countdown";

// Interfaces
import { JSX } from "react";

// ===================== Component ===================== //

/**
 * ForgotPassword component - Renders a form for requesting a password reset link.
 *
 * @component
 * @returns {JSX.Element} A password reset request form.
 *
 * @description
 * - Uses `useForgotPassword` hook to manage form state:
 *    - `fields`: Array of form input field objects
 *    - `countdown`: Timer in seconds to prevent spamming
 *    - `handleChange(index, value)`: Updates the input value
 *    - `handleSubmit(event)`: Submits the form and triggers reset logic
 *
 * - Utilizes Material UI and Tailwind for styling
 * - Disables the submit button during countdown
 */
export default function ForgotPassword(): JSX.Element {
  const { fields, countdown, handleChange, handleSubmit } = useForgotPassword();

  return (
    <Container className="flex justify-center items-center min-h-screen p-4">
      <ThemeProviderWraper>
        <form
          method="post"
          className="card flex-col gap-6 w-full max-w-sm"
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          {/* Title */}
          <Typography variant="h5" className="text-center">
            Forgot Password?
          </Typography>

          {/* Email Input Field */}
          <TextField
            label="Email"
            id={fields[0].name}
            name={fields[0].name}
            type="email"
            variant="standard"
            fullWidth
            size="small"
            value={fields[0].value}
            error={fields[0].isErr}
            helperText={fields[0].error}
            autoComplete="new-email"
            onChange={(e) => handleChange(0, e.target.value)}
          />

          {/* Submit Button */}
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            disabled={countdown > 0}
          >
            {countdown > 0
              ? `Try again in ${formatCountdown(countdown)}`
              : "Send Reset Link"}
          </Button>
        </form>
      </ThemeProviderWraper>
    </Container>
  );
}
