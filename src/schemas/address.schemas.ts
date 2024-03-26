import { z } from "zod";

const addressSchema = z.object({
  id: z.number().positive(),
  street: z.string().max(100),
  number: z.string().max(50),
  city: z.string().max(100),
  state: z.string().max(100),
  complement: z.string().max(255),
  user: z.number().positive()
});

const addressCreateSchema = addressSchema.omit({ id: true, user: true });

export {
  addressSchema,
  addressCreateSchema,
};