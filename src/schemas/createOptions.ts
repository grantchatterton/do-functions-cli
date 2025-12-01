import * as z from "zod";

export const CreateOptionsSchema = z.object({
  packagesDir: z.string().optional(),
});

export type CreateOptions = z.infer<typeof CreateOptionsSchema>;
