import { z } from "zod";

const paymentMethodSchema = z.object({
  id: z.number().positive(),
  cardNumber: z.string().max(100),
  cardHolderName: z.string().max(100),
  expirationDate: z.string().max(5),
  cvv: z.string().max(3),
  cardType: z.string().max(100),
  isDefault: z.boolean(),
  user: z.any()
});

const paymentMethodCreateSchema = paymentMethodSchema.omit({ id: true, user: true });

export {
  paymentMethodSchema,
  paymentMethodCreateSchema,
};