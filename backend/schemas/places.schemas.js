import { z } from "zod";

export const createPlaceSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title should be at least 3 characters long." }),
  description: z.string().min(1, "Description is required."),
  creator: z.string().min(1, "Creator is required."),
  address: z.string().min(5, "Address should be at least 5 characters long."),
});

export const updatePlaceSchema = z.object({
  title: z.string().min(3, "Title should be at least 3 characters long."),
  description: z.string().min(1, "Description is required."),
});
