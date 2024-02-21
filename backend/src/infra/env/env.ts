import { z } from "zod";

export const envSchema = z.object({
  DATABASE_URL: z.string().url().default("file:./dev.db"), // In case forgot to set DATABASE_URL
  PORT: z.coerce.number().optional().default(3001),
});

export type Env = z.infer<typeof envSchema>;
