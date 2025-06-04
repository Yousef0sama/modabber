// ===================== Validators ===================== //

/**
 * isEmpty
 *
 * @description
 * - Checks if the input string is empty or contains only whitespace.
 *
 * @param {string} input - The string to check.
 * @returns {string} - Returns an error message if empty, else empty string.
 */
export function isEmpty(input: string): string {
  if (!input.trim()) {
    return "This field is required";
  }
  return "";
}

/**
 * isEmail
 *
 * @description
 * - Validates if the input string is a valid email format.
 *
 * @param {string} email - The email string to validate.
 * @returns {string} - Returns an error message if invalid, else empty string.
 */
export function isEmail(email: string): string {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return "Enter a valid email";
  }
  return "";
}

/**
 * isNameValid
 *
 * @description
 * - Validates if the name contains only letters and is between 2 to 50 characters.
 * - Supports Unicode letters.
 *
 * @param {string} name - The name string to validate.
 * @returns {string} - Returns an error message if invalid, else empty string.
 */
export function isNameValid(name: string): string {
  const nameRegex = /^[\p{L}]{2,50}$/u;
  if (!nameRegex.test(name)) {
    return "Name must have only letters";
  }
  return "";
}

/**
 * isPasswordValid
 *
 * @description
 * - Validates the password to ensure it contains:
 *   - At least one uppercase letter
 *   - At least one lowercase letter
 *   - At least one number
 *   - At least one special character (!@#$%&*?)
 *   - Length between 8 to 20 characters
 *
 * @param {string} password - The password string to validate.
 * @returns {string} - Returns an error message if invalid, else empty string.
 */
export function isPasswordValid(password: string): string {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*?])[A-Za-z\d@#$!%*?&]{8,20}$/;
  if (!passwordRegex.test(password)) {
    return `Password must have:
- Upper case letter
- Lower case letter
- Number
- Special character (!@#$%&*?)`;
  }
  return "";
}

/**
 * checkLength
 *
 * @description
 * - Checks if the trimmed string length is within a specified range.
 *
 * @param {string} str - The string to check.
 * @param {number} minLength - Minimum length inclusive.
 * @param {number} maxLength - Maximum length inclusive.
 * @returns {string} - Returns an error message if length is out of range, else empty string.
 */
export function checkLength(
  str: string,
  minLength: number,
  maxLength: number
): string {
  if (str.trim().length < minLength || str.trim().length > maxLength) {
    return `It must be between ${minLength} and ${maxLength}`;
  }
  return "";
}
