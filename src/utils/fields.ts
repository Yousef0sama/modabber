/**
 * Returns the input type based on the field name.
 * Used to dynamically set the `type` attribute of input fields.
 *
 * @param name - The name of the form field.
 * @returns Input type as a string (e.g., "email", "password", "text").
 */
export const getInputType = (name: string): string => {
  switch (name) {
    case "email":
      return "email";
    case "password":
      return "password";
    default:
      return "text";
  }
};

/**
 * Returns the appropriate autocomplete value based on the field name.
 * Helps browsers autofill inputs correctly using HTML `autocomplete` attributes.
 *
 * @param name - The name of the form field.
 * @returns Autocomplete value (e.g., "email", "new-password", "given-name").
 */
export const getAutoComplete = (name: string): string => {
  switch (name) {
    case "email":
      return "email";
    case "password":
      return "new-password";
    case "firstName":
      return "given-name";
    case "lastName":
      return "family-name";
    default:
      return "off";
  }
};
