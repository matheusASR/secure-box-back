import { z } from "zod";

const cageSchema = z.object({
  id: z.number().positive(),
  number: z.number().positive(),
  location: z.string().max(150),
  availability: z.boolean().default(true),
  open: z.boolean().default(false),
});

const cageCreateSchema = cageSchema.omit({ id: true, availability: true, open: true });
const cageReadSchema = cageSchema.array();

export {
  cageSchema,
  cageCreateSchema,
  cageReadSchema,
};
