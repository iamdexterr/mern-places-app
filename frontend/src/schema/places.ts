import { z } from "zod";

const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/jpg"];
const MAX_SIZE = 500_000; // 500KB — match your Multer limit

export const placeSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  description: z.string().min(1, "Description is required"),
  image: z
    .instanceof(File, { message: "Please pick an image" })
    .refine((f) => f.size <= MAX_SIZE, "Image must be under 500KB")
    .refine((f) => ACCEPTED_TYPES.includes(f.type), "Only PNG or JPG allowed"),
});

export type PlaceFormValues = z.infer<typeof placeSchema>;
