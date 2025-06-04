"use client";

// ===================== Imports ===================== //

// Hooks
import useLoginLogic from "@/hooks/useLogin";
import { useRouter } from "next/navigation";

// Components
import Container from "@/components/container";
import FetchFields from "@/components/fetch/fetchFields";
import Link from "next/link";
import { Checkbox, Divider, FormControlLabel, Button } from "@mui/material";

// Providers
import ThemeProviderWraper from "@/providers/themeProvider";

// Icons
import { Google } from "@mui/icons-material";

// Utilities
import handleGoogle from "@/utils/signWithGoogle";

// Interfaces
import { JSX } from "react";

// ===================== Component ===================== //

/**
 * Login component - Renders a login form with email/password and Google authentication.
 *
 * @component
 * @returns {JSX.Element} Login form UI with "Remember Me", password reset, and Google login support.
 *
 * @description
 * - Uses `useLoginLogic` hook to manage:
 *    - `fields`: array of input field objects (email, password)
 *    - `handleChange(index, value)`: updates a field's value
 *    - `handleSubmit(event)`: handles form submission
 *    - `setRemember(checked: boolean)`: toggles "Remember me" option
 *
 * - Uses `handleGoogle()` for Google authentication
 * - Redirects to home on successful login
 * - Responsive and styled using Tailwind + MUI
 */
export default function Login(): JSX.Element {
  const router = useRouter();
  const { setRemember, fields, handleChange, handleSubmit } = useLoginLogic();

  return (
    <Container className="flex justify-center items-center p-4">
      <ThemeProviderWraper>
        <form
          method="post"
          autoComplete="off"
          onSubmit={handleSubmit}
          className="card flex-col gap-6"
        >
          {/* Title */}
          <h2 className="text-xl">Sign in to your account</h2>

          {/* Input Fields */}
          <FetchFields fields={fields} handleChange={handleChange} />

          {/* Submit Button */}
          <Button variant="contained" type="submit" fullWidth>
            Log in
          </Button>

          {/* Remember Me + Forgot Password */}
          <div className="flex justify-between items-center w-full">
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  onChange={(e) => setRemember(e.target.checked)}
                />
              }
              label="Remember me"
            />

            <Link
              href="/auth/forgotPassword"
              className="text-primary hover:text-hover text-sm"
            >
              Forgot your password?
            </Link>
          </div>

          {/* Divider */}
          <Divider className="text-xs w-full">OR</Divider>

          {/* Google Sign-In */}
          <Button
            variant="outlined"
            startIcon={<Google />}
            fullWidth
            onClick={async () => {
              const success = await handleGoogle();
              if (success) router.push("/");
            }}
          >
            Continue with Google
          </Button>

          {/* Sign Up Link */}
          <p className="center text-sm">
            Don&apos;t have an account?&nbsp;
            <Link
              href="/auth/register"
              className="text-primary hover:text-hover"
            >
              Create an account
            </Link>
          </p>
        </form>
      </ThemeProviderWraper>
    </Container>
  );
}
