// ===================== Imports ===================== //

// Interfaces
import { InputField } from "@/interfaces/interfaces";

// ===================== Utilities ===================== //

/**
 * validateFormFields
 *
 * @description
 * - Validates an array of input fields by running each field's validators.
 * - Stops at the first validation error per field.
 * - Updates each field's error state (`isErr`) and error message (`error`).
 *
 * @param {...InputField[]} fields - One or more InputField objects to validate.
 * @returns {InputField[]} - Array of InputField objects with updated error state.
 */
export default function validateFormFields(
  ...fields: InputField[]
): InputField[] {
  return fields.map((field) => {
    let error: string | null = null;

    // Run validators sequentially until error found
    for (const validate of field.validators) {
      error = validate(field.value);
      if (error) break; // Stop on first error
    }

    // Return updated field with error info
    return {
      ...field,
      isErr: !!error,
      error: error || "",
    };
  });
}
