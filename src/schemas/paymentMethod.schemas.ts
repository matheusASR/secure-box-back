import { z } from "zod";

const paymentMethodSchema = z.object({
  id: z.number().positive(),
  cardNumber: z.string().max(100),
  cardHolderName: z.string().max(100),
  expirationDate: z.string().max(5),
  cvv: z.string(),
  cardType: z.string().max(100),
  user: z.any()
});

const paymentMethodUpdateSchema = z.object({
  isDefault: z.boolean()
})
const paymentMethodCreateSchema = paymentMethodSchema.omit({ id: true, user: true });

export {
  paymentMethodSchema,
  paymentMethodCreateSchema,
  paymentMethodUpdateSchema
};