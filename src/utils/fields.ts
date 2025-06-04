// ===================== Imports ===================== //

import { InputField } from "@/interfaces/interfaces";

// ===================== Form Utils ===================== //

/**
 * getInputType
 *
 * @description
 * - Determines the HTML input type based on the field name.
 * - Useful for dynamically setting input `type` attributes in form components.
 *
 * @param {string} name - The name of the form field.
 * @returns {string} - A valid input `type` value such as "text", "email", or "password".
 */
export const getInputType = (name: string): string => {
  switch (name) {
    case "email":
      return "email";
    case "password":
    case "newPassword":
    case "confirmPassword":
    case "currentPassword":
      return "password";
    default:
      return "text";
  }
};

/**
 * getAutoComplete
 *
 * @description
 * - Returns the appropriate autocomplete attribute value based on the field name.
 * - Helps browsers autofill form fields correctly.
 *
 * @param {string} name - The name of the form field.
 * @returns {string} - A valid `autocomplete` attribute value.
 */
export const getAutoComplete = (name: string): string => {
  switch (name) {
    case "email":
      return "email";
    case "password":
      return "new-password";
    case "currentPassword":
      return "current-password";
    case "confirmPassword":
      return "confirm-password";
    case "firstName":
      return "given-name";
    case "lastName":
      return "family-name";
    default:
      return "off";
  }
};

/**
 * getFieldByName
 *
 * @description
 * Finds a field by its `name` property from the given fields array.
 *
 * @param {string} name - The name of the field to retrieve.
 * @param {InputField[]} fields - The array of input fields.
 * @returns {InputField | undefined} - The matching field object or `undefined` if not found.
 */
export const getFieldByName = (
  name: string,
  fields: InputField[]
): InputField | undefined => fields.find((f) => f.name === name);

/**
 * updateFieldsByName
 *
 * @description
 * Updates fields in the state based on a list of updated fields (by `name`).
 * Only fields with matching names will be updated.
 *
 * @param {InputField[]} updated - Array of updated field objects.
 * @param {React.Dispatch<React.SetStateAction<InputField[]>>} setFields - The state setter function for `fields`.
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
