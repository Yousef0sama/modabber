"use client";

// ===================== Imports ===================== //

// Hooks
import useChangeEmailLogic from "@/hooks/useChangeEmail";

// Components
import Container from "@/components/container";
import FetchFields from "@/components/fetch/fetchFields";
import { Button } from "@mui/material";

// Interfaces
import { JSX } from "react";

// ===================== Component ===================== //

/**
 * ChangeEmail Component
 *
 * @component
 * @description
 * Renders a form to allow the user to change their email address.
 * It uses a custom hook to handle form state and submission logic.
 *
 * @returns {JSX.Element} A form component for editing the user's email.
 */
export default function ChangeEmail(): JSX.Element {
  const { fields, handleChange, handleSubmit } = useChangeEmailLogic();

  return (
    <Container className="flex justify-center items-center p-4">
      <form
        method="post"
        autoComplete="off"
        className="card flex-col gap-6"
        onSubmit={handleSubmit}
      >
        {/* Form title */}
        <h2 className="text-xl">Change Email</h2>

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
