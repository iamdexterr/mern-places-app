import { z } from "zod";

export const placeSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  description: z.string().min(1, "Description is required"),
});

export type PlaceFormValues = z.infer<typeof placeSchema>;
