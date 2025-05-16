// imports

// interfaces
import { InputField } from "@/interfaces/interfaces";

/**
 * Validates an array of input fields using their assigned validators.
 *
 * For each field, runs its validators sequentially until one returns an error.
 * Sets `isErr` to true if an error is found, and attaches the error message.
 *
 * @param fields - One or more InputField objects to validate.
 * @returns A new array of InputField objects with updated error state and message.
 */
export default function validateFormFields(...fields: InputField[]): InputField[] {
  return fields.map((field) => {
    let error: string | null = null;

    for (const validate of field.validators) {
      error = validate(field.value);
      if (error) break;  // Stop at first validation error
    }

    return {
      ...field,
      isErr: !!error,
      error: error || "",
    };
  });
}
