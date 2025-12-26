import * as z from 'zod';

import { DOPackageSchema } from './doPackage.js';

/**
 * Zod schema for validating a project.yml configuration structure
 *
 * Properties:
 * - packages: Array of packages that make up the project (defaults to empty array)
 *
 * Uses .passthrough() to preserve custom properties (e.g., environment, targetNamespace)
 * that may exist in the project.yml file
 */
export const DOProjectYmlSchema = z
  .object({
    packages: z.array(DOPackageSchema).optional().default([]),
  })
  .passthrough();

/**
 * TypeScript type derived from the DOProjectYmlSchema
 */
export type DOProjectYml = z.infer<typeof DOProjectYmlSchema>;
