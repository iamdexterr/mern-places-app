import { z } from "zod";
import { loginSchema } from "./login";

const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/jpg"];
const MAX_SIZE = 500_000; // 500KB — match your Multer limit
export const signupSchema = loginSchema.extend({
  name: z.string().min(2, "Name must be at least 2 characters"),
  image: z
    .instanceof(File, { message: "Please pick an image" })
    .refine((f) => f.size <= MAX_SIZE, "Image must be under 500KB")
    .refine((f) => ACCEPTED_TYPES.includes(f.type), "Only PNG or JPG allowed"),
});
export type SignupFormValues = z.infer<typeof signupSchema>;
