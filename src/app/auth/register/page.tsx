"use client";

// Hooks
import useRegisterLogic from "@/hooks/useRegister";

// Components
import Container from "@/components/container";
import FetchFields from "@/components/fetch/fetchFields";
import Button from "@mui/material/Button";
import ThemeProviderWraper from "@/providers/themeProvider";
import Link from "next/link";

export default function Register() {
  // Custom hook for managing form state and logic
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
          <h2 className="text-xl">Create an Account</h2>

          {/* Render input fields for firstName and lastName inline */}
          <FetchFields
            fields={fields}
            handleChange={handleChange}
            inlineFields={[0, 1]}
          />

          {/* Submit button */}
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Sign Up
          </Button>

          {/* Link to login page */}
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
