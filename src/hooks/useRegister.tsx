// imports

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

/**
 * Custom hook to manage registration form logic including:
 * - form state with validation rules
 * - handling input changes
 * - submitting registration and redirecting on success
 */
export default function useRegisterLogic() {
  const router = useRouter();

  // Initial form fields state with validators and error tracking
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
   * Updates the value of a specific input field by its index.
   * @param index - index of the field to update
   * @param newValue - new value to set
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
   * - prevents default form behavior
   * - validates all form fields
   * - triggers registration if validation passes
   * - redirects to login page on successful registration
   * @param e - form submission event
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
    handleChange,
    handleSubmit,
  };
}
