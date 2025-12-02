import * as z from 'zod';

export const CreateOptionsSchema = z.object({
  packagesDir: z.string().optional(),
  func: z
    .string()
    .regex(/^[a-z]+\/[a-z]+$/)
    .optional(),
});

export type CreateOptions = z.infer<typeof CreateOptionsSchema>;
