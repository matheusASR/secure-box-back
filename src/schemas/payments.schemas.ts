import { z } from "zod";

const paymentSchema = z.object({
  id: z.number().positive(),
  price: z.string().max(100),
  paymentDate: z.string().max(100),
  type: z.string().max(100),
  user: z.any()
});

const paymentCreateSchema = paymentSchema.omit({ id: true, user: true });

export {
  paymentSchema,
  paymentCreateSchema,
};