import * as z from 'zod';

/**
 * Zod schema for validating a function template entry
 */
export const FunctionTemplateSchema = z.object({
  name: z.string(),
  dirName: z.string(),
  runtime: z.string(),
});

/**
 * TypeScript type derived from the FunctionTemplateSchema
 */
export type FunctionTemplate = z.infer<typeof FunctionTemplateSchema>;
