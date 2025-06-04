// ===================== Imports ===================== //

// Hooks
import { useState } from "react";
import useCurrentUser from "@/hooks/useCurrentUser";

// Utilities
import toast from "react-hot-toast";
import validateFormFields from "@/utils/validateFormFields";
import { isEmpty, isEmail, checkLength } from "@/utils/validators";
import changeEmail from "@/utils/changeEmail";
import { getFieldByName, updateFieldsByName } from "@/utils/fields";

// Interfaces
import { InputField } from "@/interfaces/interfaces";
import { User } from "firebase/auth";

interface ChangeEmailHook {
  fields: InputField[];
  setFields: React.Dispatch<React.SetStateAction<InputField[]>>;
  handleChange: (index: number, newValue: string) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

// ===================== Hook ===================== //

/**
 * @hook
 * useChangeEmailLogic
 *
 * @description
 * Custom hook to manage the change email form logic.
 * Handles:
 * - Form state and validation.
 * - Updating email securely.
 * - Providing user feedback via toasts.
 *
 * @returns {{
 *  - fields: InputField[],
 *  - setFields: React.Dispatch<React.SetStateAction<InputField[]>>,
 *  - handleChange: (index: number, newValue: string) => void,
 *  -  handleSubmit: (e: React.FormEvent) => Promise<void>
 * }}
 */
export default function useChangeEmailLogic() : ChangeEmailHook {
  const currentUser: User = useCurrentUser()!;

  const [fields, setFields] = useState<InputField[]>([
    {
      name: "email",
      value: "",
      validators: [isEmpty, isEmail],
      isErr: false,
      error: "",
    },
    {
      name: "currentPassword",
      value: "",
      validators: [isEmpty, (val) => checkLength(val, 8, 20)],
      isErr: false,
      error: "",
    },
  ]);

  /**
   * Updates the value of a specific form field by index.
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
   * Handles the form submission logic:
   * - Validates inputs.
   * - Shows error messages via toast.
   * - Triggers the email change logic if valid.
   *
   * @param e - Form submission event.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const email = getFieldByName("email", fields)!;
    const currentPassword = getFieldByName("currentPassword", fields)!;

    const validatedFields = validateFormFields(email, currentPassword);
    updateFieldsByName(validatedFields, setFields);

    const hasError = validatedFields.some((field) => field.isErr);
    if (hasError) return;

    const isEmailChanged = email.value !== currentUser.email;

    if (!isEmailChanged) {
      toast.error("No changes detected in name or email fields.");
      return;
    }

    await changeEmail(
      email.value,
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
