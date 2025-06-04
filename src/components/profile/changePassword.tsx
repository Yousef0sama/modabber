"use client";

// ===================== Imports ===================== //

// Hooks
import useChangePasswordLogic from "@/hooks/useChangePassword";

// Components
import Container from "@/components/container";
import FetchFields from "@/components/fetch/fetchFields";
import { Button } from "@mui/material";

// Interfaces
import { JSX } from "react";

// ===================== Component ===================== //

/**
 * ChangePassword Component
 *
 * @component
 * @description
 * Renders a form that allows the user to change their password.
 * Uses a custom hook to manage form fields and submission logic.
 *
 * @returns {JSX.Element} A styled form to update the user's password.
 */
export default function ChangePassword(): JSX.Element {
  const { fields, handleChange, handleSubmit } = useChangePasswordLogic();

  return (
    <Container className="flex justify-center items-center p-4">
        <form
          method="post"
          autoComplete="off"
          className="card flex-col gap-6"
          onSubmit={handleSubmit}
        >
          {/* Form title */}
          <h2 className="text-xl">Change Password</h2>

          {/* Dynamic input fields */}
          <FetchFields fields={fields} handleChange={handleChange} />

          {/* Submit button */}
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Edit
          </Button>
        </form>
    </Container>
  );
}
