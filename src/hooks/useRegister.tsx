// ========== Imports ========== //

// Hooks
import { useState } from "react";
import { useRouter } from "next/navigation";

// Utilities
import handleRegister from "@/utils/register";
import validateFormFields from "@/utils/validateFormFields";
import {
  isEmpty,
  isEmail,
  isNameValid,
  isPasswordValid,
  checkLength,
} from "@/utils/validators";

// Interfaces
import { InputField } from "@/interfaces/interfaces";

interface RegisterHook {
  fields: InputField[];
  setFields: React.Dispatch<React.SetStateAction<InputField[]>>;
  handleChange: (index: number, newValue: string) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

// ========== Hook ========== //

/**
 * @hook
 * useRegisterLogic
 *
 * @description
 * Custom hook to manage registration form logic.
 * Handles:
 * - Manages form fields state and validation.
 * - Handles input changes.
 * - Submits registration and redirects on success.
 *
 * @returns {{
 *  fields: InputField[],
 *  setFields: React.Dispatch<React.SetStateAction<InputField[]>>,
 *  handleChange: (index: number, newValue: string) => void,
 *  handleSubmit: (e: React.FormEvent) => Promise<void>
 * }}
 */
export default function useRegisterLogic() : RegisterHook {
  const router = useRouter();

  // Initial form fields state with validators and error flags
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
    {
      name: "email",
      value: "",
      validators: [isEmpty, isEmail],
      isErr: false,
      error: "",
    },
    {
      name: "password",
      value: "",
      validators: [isEmpty, isPasswordValid],
      isErr: false,
      error: "",
    },
  ]);

  /**
   * Updates the value of a form field by its index.
   *
   * @param index - index of the field to update
   * @param newValue - new input value
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
   *
   * - Prevents default browser submission.
   * - Validates all fields.
   * - If valid, attempts registration.
   * - Redirects to login on success.
   *
   * @param e - form event
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validatedFields = validateFormFields(...fields);
    setFields(validatedFields);

    const hasError = validatedFields.some((field) => field.isErr);
    if (!hasError) {
      const success = await handleRegister(fields, setFields);
      if (success) {
        router.push("/auth/login");
      }
    }
  };

  return {
    fields,
    setFields,
    handleChange,
    handleSubmit,
  };
}
