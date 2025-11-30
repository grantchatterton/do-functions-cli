import * as z from 'zod';
import { DEFAULT_RUNTIME } from '../constants.js';

/**
 * Zod schema for validating a DigitalOcean function entry in project.yml
 *
 * Properties:
 * - name: The function name (required)
 * - runtime: The Node.js runtime version (defaults to DEFAULT_RUNTIME)
 * - web: Whether the function is web-accessible (defaults to true)
 */
export const DOFunctionSchema = z.object({
  name: z.string(),
  runtime: z
    .enum(['nodejs:14', 'nodejs:18', 'nodejs:default'])
    .optional()
    .default(DEFAULT_RUNTIME as 'nodejs:18'),
  web: z.boolean().optional().default(true),
});

/**
 * TypeScript type derived from the DOFunctionSchema
 */
export type DOFunction = z.infer<typeof DOFunctionSchema>;
