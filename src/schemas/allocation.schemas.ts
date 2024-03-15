import { z } from "zod";

const allocationSchema = z.object({
  id: z.number().positive(),
  initialDatetime: z.string().max(50),
  finalDatetime: z.string().max(50),
  price: z.string().max(10),
  paymentStatus: z.boolean().default(false),
  userId: z.any(),
  cageId: z.any()
});

const allocationCreateSchema = allocationSchema.omit({ id: true });
const allocationReadSchema = allocationSchema.array();

export {
  allocationSchema,
  allocationCreateSchema,
  allocationReadSchema,
};