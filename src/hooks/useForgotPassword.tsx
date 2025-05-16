// imports

// hooks
import { useState } from "react";
import useResetCooldown from "@/hooks/useResetCooldown";

// Utilities
import { isEmpty, isEmail } from "@/utils/validators";
import validateFormFields from "@/utils/validateFormFields";
import handleFogetPassword from "@/utils/forgotPassword";

// interfaces
import { InputField } from "@/interfaces/interfaces";

/**
 * Custom hook to handle forgot password form logic.
 * Manages form state, validation, cooldown for resending requests,
 * and submitting the reset password request.
 */
export default function useForgotPassword() {
  // State for form fields, initially only email with validators
  const [fields, setFields] = useState<InputField[]>([
    {
      name: "email",
      value: "",
      validators: [isEmpty, isEmail],
      isErr: false,
      error: "",
    },
  ]);

  // Hook to manage cooldown timer to prevent spamming password reset requests
  const { countdown, registerAttempt } = useResetCooldown();

  // Update the value of a specific input field by index
  const handleChange = (index: number, newValue: string) => {
    setFields((prevFields) =>
      prevFields.map((field, i) =>
        i === index ? { ...field, value: newValue } : field
      )
    );
  };

  /**
   * Validate the form and submit a password reset request.
   * Returns true if reset was successful, otherwise false.
   */
  const handleSubmit = async (): Promise<boolean> => {
    // Validate all fields and update state with validation results
    const validatedFields = validateFormFields(...fields);
    setFields(validatedFields);

    // If any field has an error, don't submit
    const hasError = validatedFields.some((field) => field.isErr);
    if (hasError) return false;

    // Get email value from validated fields
    const emailValue = validatedFields[0].value;

    // Call the forgot password handler utility
    const success = await handleFogetPassword(emailValue, setFields);

    // If success, start cooldown timer
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
