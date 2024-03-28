import { z } from "zod";

const walletSchema = z.object({
  id: z.number().positive(),
  balance: z.number(),
  user: z.any()
});

const walletCreateSchema = walletSchema.omit({ id: true, user: true });

export {
  walletSchema,
  walletCreateSchema,
};