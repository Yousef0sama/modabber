"use client";

// ===================== Imports ===================== //

// Hooks
import useDeleteAccountLogic from "@/hooks/useDeleteAccount";

// Components
import Container from "@/components/container";
import FetchFields from "@/components/fetch/fetchFields";
import { Button } from "@mui/material";

// Interfaces
import { JSX } from "react";

// ===================== Component ===================== //

/**
 * DeleteAccount Component
 *
 * @component
 * @description
 * Renders a form to allow the user to delete their account.
 * It uses a custom hook to handle form state and submission logic.
 *
 * @returns {JSX.Element} A form component for deleting the user's account.
 */
export default function DeleteAccount(): JSX.Element {
  const { fields, handleChange, handleSubmit } = useDeleteAccountLogic();

  return (
    <Container className="flex justify-center items-center p-4">
      <form
        method="post"
        autoComplete="off"
        className="card flex-col gap-6"
        onSubmit={handleSubmit}
      >
        {/* Form title */}
        <h2 className="text-xl">Delete Account</h2>

        {/* Dynamic input fields */}
        <FetchFields fields={fields} handleChange={handleChange} />

        {/* Submit button */}
        <Button variant="contained" color="error" type="submit" fullWidth>
          Delete
        </Button>
      </form>
    </Container>
  );
}
