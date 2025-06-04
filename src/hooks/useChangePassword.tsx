// ===================== Imports ===================== //

// Hooks
import { useState } from "react";
import useCurrentUser from "@/hooks/useCurrentUser";

// Utilities
import toast from "react-hot-toast";
import validateFormFields from "@/utils/validateFormFields";
import { isEmpty, checkLength, isPasswordValid } from "@/utils/validators";
import changePassword from "@/utils/changePassword";
import { getFieldByName, updateFieldsByName } from "@/utils/fields";

// Interfaces
import { InputField } from "@/interfaces/interfaces";
import { User } from "firebase/auth";

interface ChangePasswordHook {
  fields: InputField[];
  setFields: React.Dispatch<React.SetStateAction<InputField[]>>;
  handleChange: (index: number, newValue: string) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

// ===================== Hook ===================== //

/**
 * @hook
 * useChangePasswordLogic
 *
 * @description
 * Custom hook to manage the change password form:
 * - Form state & validation
 * - Password updates
 * - User feedback
 *
 * @returns {{
 *  - fields: InputField[];
 *  - setFields: React.Dispatch<React.SetStateAction<InputField[]>>;
 *  - handleChange: (index: number, newValue: string) => void;
 *  - handleSubmit: (e: React.FormEvent) => Promise<void>;
 * }}
 */
export default function useChangePasswordLogic() : ChangePasswordHook {
  const currentUser: User = useCurrentUser()!;

  const [fields, setFields] = useState<InputField[]>([
    {
      name: "currentPassword",
      value: "",
      validators: [isEmpty],
      isErr: false,
      error: "",
    },
    {
      name: "newPassword",
      value: "",
      validators: [isEmpty, (val) => checkLength(val, 8, 20), isPasswordValid],
      isErr: false,
      error: "",
    },
    {
      name: "confirmPassword",
      value: "",
      validators: [isEmpty],
      isErr: false,
      error: "",
    },
  ]);

  /**
   * Updates the value of a form field by its index.
   *
   * @param {number} index - The index of the field in the fields array.
   * @param {string} newValue - The new value to set for the field.
   */
  const handleChange = (index: number, newValue: string) => {
    setFields((prevFields) =>
      prevFields.map((field, i) =>
        i === index ? { ...field, value: newValue } : field
      )
    );
  };

  /**
   * Handles form submission.
   * - Validates all fields.
   * - Checks if new password matches confirmation.
   * - Prevents submission if no changes or validation errors.
   * - Calls changePassword util to update password.
   *
   * @param {React.FormEvent} e - The form submission event.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    // Prevent default form submission behavior
    e.preventDefault();

    const currentPassword = getFieldByName("currentPassword", fields)!;
    const newPassword = getFieldByName("newPassword", fields)!;
    const confirmPassword = getFieldByName("confirmPassword", fields)!;

    // Validate all fields
    const validatedFields = validateFormFields(currentPassword, newPassword, confirmPassword);
    updateFieldsByName(validatedFields, setFields);

    const hasError = validatedFields.some((field) => field.isErr);
    if (hasError) return;

    // Check if new password matches confirm password
    if (newPassword.value !== confirmPassword.value) {
      toast.error("New password and confirmation do not match.");
      return;
    }

    // Check if new password is different from current password
    const isPasswordChanged = currentPassword.value !== newPassword.value;

    if (!isPasswordChanged) {
      toast.error("No changes detected in password field.");
      return;
    }

    await changePassword(
      newPassword.value,
      confirmPassword.value,
      currentPassword.value,
      currentUser,
      setFields
    );
  };

  return {
    fields,
    setFields,
    handleChange,
    handleSubmit,
  };
}
