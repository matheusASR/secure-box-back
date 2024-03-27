import { z } from "zod";

const addressSchema = z.object({
  id: z.number().positive(),
  street: z.string().max(100),
  number: z.string().max(50),
  city: z.string().max(100),
  state: z.string().max(100),
  complement: z.string().max(255),
  zipCode: z.string().max(20),
  user: z.any()
});

const addressCreateSchema = addressSchema.omit({ id: true, user: true });

export {
  addressSchema,
  addressCreateSchema,
};