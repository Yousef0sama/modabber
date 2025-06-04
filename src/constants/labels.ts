// ===================== Constants ===================== //

/**
 * A mapping between form field keys and their display labels.
 *
 * This mapping is used to dynamically render user-friendly labels in forms
 * or UI components based on the field's name.
 *
 * Example:
 * - `firstName` will render as "First Name"
 * - `email` will render as "Email"
 *
 * This ensures the UI can use descriptive, readable labels for users when filling out forms.
 *
 * @constant
 * @type {Record<string, string>}
 */
export const labelsMap: Record<string, string> = {
  firstName: "First Name",
  lastName: "Last Name",
  email: "Email",
  password: "Password",
  currentPassword: "Current Password",
  confirmPassword: "Confirm Password",
};
