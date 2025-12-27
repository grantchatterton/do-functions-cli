/**
 * Default runtime environment for DigitalOcean Functions.
 */
export const DEFAULT_RUNTIME = 'nodejs:18';

/**
 * Regex pattern to validate function names.
 * Function names must be in the format: package/name (e.g., 'myapp/hello', 'MyApp/HelloWorld', or 'my-api/hello-world')
 * Both the package and function name must contain only letters (uppercase or lowercase) and hyphens.
 */
export const FUNCTION_NAME_REGEX = /^[a-zA-Z-]+\/[a-zA-Z-]+$/;
