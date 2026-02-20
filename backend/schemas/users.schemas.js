import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address."),
  password: z.string().min(8, "Password should be at least 8 characters long."),
});

export const signupSchema = z.object({
  name: z.string().min(2, "Name should be at least 2 characters long."),
  email: z.string().email("Invalid email address."),
  password: z.string().min(8, "Password should be at least 8 characters long."),
});
