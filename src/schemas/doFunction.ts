import * as z from 'zod';

/**
 * Zod schema for validating a DigitalOcean function entry in project.yml
 *
 * Uses .passthrough() to preserve custom properties (e.g., environment variables,
 * limits, annotations) that may exist in function configurations
 */
export const DOFunctionSchema = z
  .object({
    name: z.string(),
    runtime: z.string().optional(),
    web: z.boolean().optional().default(true),
  })
  .passthrough();

/**
 * TypeScript type derived from the DOFunctionSchema
 */
export type DOFunction = z.infer<typeof DOFunctionSchema>;
