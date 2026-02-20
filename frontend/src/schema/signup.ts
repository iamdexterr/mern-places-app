import { z } from "zod";
import { loginSchema } from "./login";

export const signupSchema = loginSchema.extend({
  name: z.string().min(2, "Name must be at least 2 characters"),
});

export type SignupFormValues = z.infer<typeof signupSchema>;
