// imports

// Hooks
import { useState } from "react";
import { useRouter } from "next/navigation";

// Utilities
import handleLogin from "@/utils/login";
import validateFormFields from "@/utils/validateFormFields";
import { isEmpty, isEmail } from "@/utils/validators";

// Interfaces
import { InputField } from "@/interfaces/interfaces";

/**
 * Custom hook to manage login form logic including:
 * - form state and validation
 * - handling "remember me"
 * - submission and redirection on success
 */
export default function useLoginLogic() {
  const router = useRouter();
  const [remember, setRemember] = useState(false);

  // Form fields with initial values, validators, and error states
  const [fields, setFields] = useState<InputField[]>([
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
      validators: [isEmpty],
      isErr: false,
      error: "",
    },
  ]);

  /**
   * Update the value of a field based on its index in the fields array
   * @param index - the index of the field to update
   * @param newValue - the new value to set for that field
   */
  const handleChange = (index: number, newValue: string) => {
    setFields((prevFields) =>
      prevFields.map((field, i) =>
        i === index ? { ...field, value: newValue } : field
      )
    );
  };

  /**
   * Handle form submission:
   * - prevents default submit event
   * - validates all fields
   * - if no errors, attempts login and redirects on success
   * @param e - form submission event
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields and update state
    const validatedFields = validateFormFields(...fields);
    setFields(validatedFields);

    // If no errors, try to login
    const hasError = validatedFields.some((field) => field.isErr);
    if (!hasError) {
      const success = await handleLogin(fields, setFields, remember);
      if (success) router.push("/"); // redirect on success
    }
  };

  return {
    setRemember,
    fields,
    setFields,
    handleChange,
    handleSubmit,
  };
}
