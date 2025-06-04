// ===================== Imports ===================== //

// Hooks
import { useState } from "react";
import useResetCooldown from "@/hooks/useResetCooldown";

// Utilities
import { isEmpty, isEmail } from "@/utils/validators";
import validateFormFields from "@/utils/validateFormFields";
import handleFogetPassword from "@/utils/forgotPassword";

// Interfaces
import { InputField } from "@/interfaces/interfaces";

interface ForgotPasswordHook {
  fields: InputField[];
  setFields: React.Dispatch<React.SetStateAction<InputField[]>>;
  countdown: number;
  handleChange: (index: number, newValue: string) => void;
  handleSubmit: () => Promise<boolean>;
}

// ===================== Hook ===================== //

/**
 * @hook
 * useForgotPassword
 *
 * @description
 * Custom hook to handle:
 * - Form fields state and validation.
 * - Initializes form fields state with email input.
 * - Validates fields on submit.
 * - Calls password reset utility function.
 * - Manages cooldown timer to prevent spamming requests.
 *
 * @returns {{
 *  - fields: InputField[]
 *  - setFields: React.Dispatch<React.SetStateAction<InputField[]>>
 *  - countdown: number
 *  - handleChange: function
 *  - handleSubmit: async function
 * }}
 */
export default function useForgotPassword(): ForgotPasswordHook {
  // Form fields state: only email field with validators
  const [fields, setFields] = useState<InputField[]>([
    {
      name: "email",
      value: "",
      validators: [isEmpty, isEmail],
      isErr: false,
      error: "",
    },
  ]);

  // Cooldown timer hook to prevent spamming password reset requests
  const { countdown, registerAttempt } = useResetCooldown();

  /**
   * Updates value of a specific input field by index.
   *
   * @param {number} index - Index of the field to update
   * @param {string} newValue - New value for the field
   */
  const handleChange = (index: number, newValue: string) => {
    setFields((prevFields) =>
      prevFields.map((field, i) =>
        i === index ? { ...field, value: newValue } : field
      )
    );
  };

  /**
   * Validates form fields and submits password reset request.
   *
   * @async
   * @function handleSubmit
   * @returns {Promise<boolean>} - Returns true if reset request succeeded, false otherwise
   */
  const handleSubmit = async (): Promise<boolean> => {
    // Validate fields and update state
    const validatedFields = validateFormFields(...fields);
    setFields(validatedFields);

    // If any validation error, abort submission
    const hasError = validatedFields.some((field) => field.isErr);
    if (hasError) return false;

    const emailValue = validatedFields[0].value;

    // Call utility to handle forgot password request
    const success = await handleFogetPassword(emailValue, setFields);

    // If successful, start cooldown timer
    if (success) registerAttempt();

    return success;
  };

  return {
    fields,
    setFields,
    countdown,
    handleChange,
    handleSubmit,
  };
}
