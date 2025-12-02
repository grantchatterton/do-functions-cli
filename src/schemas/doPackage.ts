import * as z from 'zod';

import { DOFunctionSchema } from './doFunction.js';

/**
 * Zod schema for validating a DigitalOcean function package entry in project.yml
 *
 * Properties:
 * - name: The package name (required, used for namespacing functions)
 * - functions: Array of functions belonging to this package (defaults to empty array)
 */
export const DOPackageSchema = z.object({
  name: z.string(),
  functions: z.array(DOFunctionSchema).optional().default([]),
});

/**
 * TypeScript type derived from the DOPackageSchema
 */
export type DOPackage = z.infer<typeof DOPackageSchema>;
