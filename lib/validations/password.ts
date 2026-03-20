import { z } from "zod";

export const passwordSchema = z.object({
  platform: z.string().min(1, "Platform is required."),
  link: z.string().url("Please enter a valid URL.").or(z.literal("")),
  user_email: z.string().email("Invalid email.").or(z.literal("")),
  password: z.string().min(1, "Password is required."),
});

export type PasswordFormValues = z.infer<typeof passwordSchema>;
