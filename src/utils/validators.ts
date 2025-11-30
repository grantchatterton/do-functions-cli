import { FUNCTION_NAME_REGEX } from '../constants.js';

/**
 * Validates that a function name matches the required format (package/name).
 *
 * @param value - The function name input to validate
 * @returns true if valid, or an error message string if invalid
 */
export function validateFunctionName(value: string) {
  if (!FUNCTION_NAME_REGEX.test(value)) {
    return 'Function name must be in the format "package/name" with lowercase letters only';
  }

  return true;
}
