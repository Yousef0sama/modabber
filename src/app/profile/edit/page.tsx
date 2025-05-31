"use client";

// imports

// hooks
import useEditProfileLogic from "@/hooks/useEditProfile";

// components
import Container from "@/components/container";
import FetchFields from "@/components/fetch/fetchFields";
import { Button } from "@mui/material";

// providers
import ThemeProviderWraper from "@/providers/themeProvider";

/**
 * EditProfile component - Renders a user profile editing form.
 * Uses custom hook to manage form state and submission.
 */
export default function EditProfile() {
  // Extract form logic
  const { fields, handleChange, handleSubmit } = useEditProfileLogic();

  return (
    <Container className="flex justify-center items-center p-4">
      <ThemeProviderWraper>
        <form
          method="post"
          autoComplete="off"
          className="card flex-col gap-6"
          onSubmit={handleSubmit}
        >
          {/* Form title */}
          <h2 className="text-xl">Edit Profile</h2>

          {/* Render form fields dynamically */}
          <FetchFields
            fields={fields}
            handleChange={handleChange}
            inlineFields={[0, 1]}
          />

          {/* Submit button */}
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Edit
          </Button>
        </form>
      </ThemeProviderWraper>
    </Container>
  );
}
