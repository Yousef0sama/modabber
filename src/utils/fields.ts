// imports

// interfaces
import { InputField } from "@/interfaces/interfaces";

/**
 * Determines the HTML input type based on the field name.
 * Useful for dynamically setting input `type` attributes in form components.
 *
 * @param name - The name of the form field.
 * @returns A valid input `type` value such as "text", "email", or "password".
 */
export const getInputType = (name: string): string => {
  switch (name) {
    case "email":
      return "email";
    case "password":
      return "password";
    case "currentPassword":
      return "password";
    default:
      return "text";
  }
};

/**
 * Returns the appropriate autocomplete attribute value based on the field name.
 * Helps browsers autofill form fields correctly.
 *
 * @param name - The name of the form field.
 * @returns A valid `autocomplete` attribute value.
 */
export const getAutoComplete = (name: string): string => {
  switch (name) {
    case "email":
      return "email";
    case "password":
      return "new-password";
    case "currentPassword":
      return "current-password";
    case "firstName":
      return "given-name";
    case "lastName":
      return "family-name";
    default:
      return "off";
  }
};

/**
 * Finds a field by its `name` property from the given fields array.
 *
 * @param name - The name of the field to retrieve.
 * @param fields - The array of input fields.
 * @returns The matching field object or `undefined` if not found.
 */
export const getFieldByName = (name: string, fields: InputField[]): InputField | undefined =>
  fields.find((f) => f.name === name);

/**
 * Updates fields in the state based on a list of updated fields (by `name`).
 * Only fields with matching names will be updated.
 *
 * @param updated - Array of updated field objects.
 * @param setFields - The state setter function for `fields`.
 */
export const updateFieldsByName = (
  updated: InputField[],
  setFields: React.Dispatch<React.SetStateAction<InputField[]>>
) => {
  setFields((prev) =>
    prev.map((field) => {
      const found = updated.find((u) => u.name === field.name);
      return found ? { ...field, ...found } : field;
    })
  );
};
