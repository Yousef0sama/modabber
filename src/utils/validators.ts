/**
 * Checks if the input string is empty or contains only whitespace.
 * @param input - The string to check.
 * @returns An error message if empty, otherwise an empty string.
 */
export function isEmpty(input: string): string {
  if (!input.trim()) {
    return "This field is required";
  }
  return "";
}

/**
 * Validates if the input string is a valid email format.
 * @param email - The email string to validate.
 * @returns An error message if invalid, otherwise an empty string.
 */
export function isEmail(email: string): string {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return "Enter a valid email";
  }
  return "";
}

/**
 * Validates if the name contains only letters and is between 2 to 50 characters.
 * Supports Unicode letters.
 * @param name - The name string to validate.
 * @returns An error message if invalid, otherwise an empty string.
 */
export function isNameValid(name: string): string {
  const nameRegex = /^[\p{L}]{2,50}$/u;
  if (!nameRegex.test(name)) {
    return "Name must have only letters";
  }
  return "";
}

/**
 * Validates the password to ensure it contains:
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one number
 * - At least one special character (!@#$%&*?)
 * - Length between 8 to 20 characters
 * @param password - The password string to validate.
 * @returns An error message if invalid, otherwise an empty string.
 */
export function isPasswordValid(password: string): string {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*?])[A-Za-z\d@#$!%*?&]{8,20}$/;
  if (!passwordRegex.test(password)) {
    return "Password must have:\n- Upper case letter\n- Lower case letter\n- Number\n- Special character (!@#$%&*?)";
  }
  return "";
}

/**
 * Checks if the trimmed string length is within a specified range.
 * @param str - The string to check.
 * @param minLength - Minimum length inclusive.
 * @param maxLength - Maximum length inclusive.
 * @returns An error message if length is out of range, otherwise an empty string.
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
