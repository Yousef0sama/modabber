// ===================== Imports ===================== //

// Hooks
import { useState } from "react";
import useCurrentUser from "./useCurrentUser";

// Utilities
import validateFormFields from "@/utils/validateFormFields";
import { isEmpty, checkLength } from "@/utils/validators";
import deleteAccount from "@/utils/deleteAccount";
import { getFieldByName, updateFieldsByName } from "@/utils/fields";

// Interfaces
import { InputField } from "@/interfaces/interfaces";

interface ChangeEmailHook {
  fields: InputField[];
  setFields: React.Dispatch<React.SetStateAction<InputField[]>>;
  handleChange: (index: number, newValue: string) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

// ===================== Hook ===================== //

/**
 * Custom hook to manage the delete account form logic.
 *
 * Handles:
 * - Form state and validation.
 * - Calling the deleteAccount utility with re-authentication.
 * - Showing validation errors and feedback.
 *
 * @returns {{
 *   fields: InputField[],
 *   setFields: React.Dispatch<React.SetStateAction<InputField[]>>,
 *   handleChange: (index: number, newValue: string) => void,
 *   handleSubmit: (e: React.FormEvent) => Promise<void>
 * }}
 */
export default function useDeleteAccountLogic(): ChangeEmailHook {
  const currentUser = useCurrentUser();

  // Form fields state: only current password input with validators
  const [fields, setFields] = useState<InputField[]>([
    {
      name: "currentPassword",
      value: "",
      validators: [isEmpty, (val) => checkLength(val, 8, 20)],
      isErr: false,
      error: "",
    },
  ]);

  /**
   * Updates the value of a field at a given index.
   *
   * @param index - Index of the field in the fields array.
   * @param newValue - New value to assign to the field.
   */
  const handleChange = (index: number, newValue: string) => {
    setFields((prevFields) =>
      prevFields.map((field, i) =>
        i === index ? { ...field, value: newValue } : field
      )
    );
  };

  /**
   * Handles form submission:
   * - Prevents default form behavior.
   * - Validates fields and updates error states.
   * - If valid, calls deleteAccount to re-authenticate and delete user.
   * - Shows feedback via toast inside deleteAccount utility.
   *
   * @param e - Form submission event.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Get the current password field
    const currentPassword = getFieldByName("currentPassword", fields)!;

    // Validate the current password field
    const validatedFields = validateFormFields(currentPassword);

    // Update form fields with validation results
    updateFieldsByName(validatedFields, setFields);

    // Check if there are validation errors
    const hasError = validatedFields.some((field) => field.isErr);
    if (hasError) return;

    // Attempt to delete the user account with the current password
    await deleteAccount(currentUser, currentPassword.value);
  };

  return {
    fields,
    setFields,
    handleChange,
    handleSubmit,
  };
}
