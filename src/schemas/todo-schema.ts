import { z } from "zod";

const todoItemSchema = z.object({
  description: z.string().min(1, "Description is required"),
  finished: z.boolean().optional(),
});

export const todoSchema = z.object({
  description: z.string().min(1, "Description is required"),
  items: z.array(todoItemSchema).min(1, "At least one item is required"),
});
