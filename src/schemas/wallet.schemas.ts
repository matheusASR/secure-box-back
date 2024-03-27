import { z } from "zod";

const walletSchema = z.object({
  id: z.number().positive(),
  balance: z.string().max(100),
  user: z.any()
});

const walletCreateSchema = walletSchema.omit({ id: true, user: true });

export {
  walletSchema,
  walletCreateSchema,
};