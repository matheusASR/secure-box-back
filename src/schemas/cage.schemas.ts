import { z } from "zod";

const cageSchema = z.object({
  id: z.number().positive(),
  location: z.string().max(150),
  availability: z.boolean().default(true),
});

const cageCreateSchema = cageSchema.omit({ id: true, availability: true });
const cageReadSchema = cageSchema.array();

export {
  cageSchema,
  cageCreateSchema,
  cageReadSchema,
};
