import * as z from 'zod';

/**
 * Zod schema for validating a DigitalOcean function entry in project.yml
 */
export const DOFunctionSchema = z.object({
  name: z.string(),
  runtime: z.string().optional(),
  web: z.boolean().optional().default(true),
});

/**
 * TypeScript type derived from the DOFunctionSchema
 */
export type DOFunction = z.infer<typeof DOFunctionSchema>;
