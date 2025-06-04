// ===================== Imports ===================== //

// Hooks
import { useState } from "react";
import useCurrentUser from "@/hooks/useCurrentUser";

// Utilities
import toast from "react-hot-toast";
import validateFormFields from "@/utils/validateFormFields";
import { isEmpty, isNameValid, checkLength } from "@/utils/validators";
import changeName from "@/utils/changeName";
import { getFieldByName, updateFieldsByName } from "@/utils/fields";

// Interfaces
import { InputField } from "@/interfaces/interfaces";
import { User } from "firebase/auth";

interface ChangeNameHook {
  fields: InputField[];
  setFields: React.Dispatch<React.SetStateAction<InputField[]>>;
  handleChange: (index: number, newValue: string) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

// ===================== Hook ===================== //

/**
 * @hook
 * useChangeNameLogic
 *
 * @description
 * Custom hook to manage the change name form logic.
 * Handles:
 * - Form state and validation.
 * - Updating user name.
 * - Providing user feedback via toasts.
 *
 * @returns {{
 *  - fields: InputField[],
 *  - setFields: React.Dispatch<React.SetStateAction<InputField[]>>,
 *  - handleChange: (index: number, newValue: string) => void,
 *  - handleSubmit: (e: React.FormEvent) => Promise<void>
 * }}
 */
export default function useChangeNameLogic() : ChangeNameHook {
  const currentUser: User = useCurrentUser()!;

  const [fields, setFields] = useState<InputField[]>([
    {
      name: "firstName",
      value: "",
      validators: [isEmpty, isNameValid, (val) => checkLength(val, 2, 30)],
      isErr: false,
      error: "",
    },
    {
      name: "lastName",
      value: "",
      validators: [isEmpty, isNameValid, (val) => checkLength(val, 2, 30)],
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
   * - Triggers the name change logic if valid and changed.
   *
   * @param e - Form submission event.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const firstName = getFieldByName("firstName", fields)!;
    const lastName = getFieldByName("lastName", fields)!;

    // Compose full name for comparison
    const fullNameInput = `${firstName.value} ${lastName.value}`.trim();
    const fullNameCurrent = currentUser.displayName?.trim() || "";

    const validatedFields = validateFormFields(firstName, lastName);
    updateFieldsByName(validatedFields, setFields);

    const hasError = validatedFields.some((field) => field.isErr);
    if (hasError) return;

    const isNameChanged = fullNameInput.toLowerCase() !== fullNameCurrent.toLowerCase();

    if (!isNameChanged) {
      toast.error("No changes detected in name or email fields.");
      return;
    }

    await changeName(
      firstName.value,
      lastName.value,
      currentUser
    );
  };

  return {
    fields,
    setFields,
    handleChange,
    handleSubmit,
  };
}
