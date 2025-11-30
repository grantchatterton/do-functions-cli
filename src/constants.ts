/**
 * Default runtime environment for DigitalOcean Functions.
 */
export const DEFAULT_RUNTIME = 'nodejs:18';

/**
 * Regex pattern to validate function names.
 * Function names must be in the format: package/name (e.g., 'myapp/hello')
 * Both the package and function name must contain only lowercase letters.
 */
export const FUNCTION_NAME_REGEX = /^[a-z]+\/[a-z]+$/;
