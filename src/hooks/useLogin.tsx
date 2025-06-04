// ========== Imports ========== //

// Hooks
import { useState } from "react";
import { useRouter } from "next/navigation";

// Utilities
import handleLogin from "@/utils/login";
import validateFormFields from "@/utils/validateFormFields";
import { isEmpty, isEmail } from "@/utils/validators";

// Interfaces
import { InputField } from "@/interfaces/interfaces";

interface LoginHook {
  fields: InputField[];
  setFields: React.Dispatch<React.SetStateAction<InputField[]>>;
  setRemember: React.Dispatch<React.SetStateAction<boolean>>;
  handleChange: (index: number, newValue: string) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

// ========== Hook ========== //

/**
 * @hook
 * useLoginLogic
 *
 * @description
 * Custom hook to manage:
 * - Form field state and validation.
 * - Manages login form input state and validation.
 * - Handles "Remember Me" checkbox.
 * - Submits form and redirects on successful login.
 *
 * @returns {{
 *  - fields: InputField[]
 *  - setFields: React.Dispatch<React.SetStateAction<InputField[]>>
 *  - setRemember: React.Dispatch<React.SetStateAction<boolean>>
 *  - handleChange: (index: number, newValue: string) => void
 *  - handleSubmit: (e: React.FormEvent) => Promise<void>
 * }}
 */
export default function useLoginLogic() : LoginHook {
  const router = useRouter();
  const [remember, setRemember] = useState(false);

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
   * Update the value of a specific input field by its index.
   *
   * @param {number} index - Index of the field in the fields array.
   * @param {string} newValue - New value to assign to the field.
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
   * - Validates form fields.
   * - Calls login handler and redirects if successful.
   *
   * @param {React.FormEvent} e - The form submission event.
   * @returns {Promise<void>} - No return value but handles login logic.
   */
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    const validatedFields = validateFormFields(...fields);
    setFields(validatedFields);

    const hasError = validatedFields.some((field) => field.isErr);
    if (!hasError) {
      const success = await handleLogin(fields, setFields, remember);
      if (success) router.push("/");
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
