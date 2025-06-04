"use client";

// ===================== Imports ===================== //

// Hooks
import useRegisterLogic from "@/hooks/useRegister";

// Components
import Container from "@/components/container";
import FetchFields from "@/components/fetch/fetchFields";
import { Button } from "@mui/material";
import Link from "next/link";

// Providers
import ThemeProviderWraper from "@/providers/themeProvider";

// Interfaces
import { JSX } from "react";

// ===================== Component ===================== //

/**
 * Register component - Renders a registration form for new users.
 *
 * @component
 * @returns {JSX.Element} The user registration UI with name, email, and password fields.
 *
 * @description
 * - Uses `useRegisterLogic` hook to manage:
 *    - `fields`: array of input field objects (first name, last name, email, password)
 *    - `handleChange(index, value)`: updates a specific field's value
 *    - `handleSubmit(event)`: handles form submission logic
 *
 * - Displays first name and last name side-by-side using `inlineFields` prop
 * - Responsive form layout using Tailwind + MUI
 * - Includes link to login page for existing users
 */
export default function Register(): JSX.Element {
  const { fields, handleChange, handleSubmit } = useRegisterLogic();

  return (
    <Container className="flex justify-center items-center p-4">
      <ThemeProviderWraper>
        <form
          method="post"
          className="card flex-col gap-6"
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          {/* Title */}
          <h2 className="text-xl">Create an Account</h2>

          {/* Inline Input Fields (First Name & Last Name) */}
          <FetchFields
            fields={fields}
            handleChange={handleChange}
            inlineFields={[0, 1]}
          />

          {/* Submit Button */}
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Sign Up
          </Button>

          {/* Link to Login Page */}
          <p className="center text-sm">
            Have an account?{" "}
            <Link href="/auth/login" className="text-primary hover:text-hover">
              Log in
            </Link>
          </p>
        </form>
      </ThemeProviderWraper>
    </Container>
  );
}
