import { z } from "zod";

const allocationSchema = z.object({
  id: z.number().positive(),
  initialDatetime: z.string().max(50),
  finalDatetime: z.string().max(50),
  price: z.string().max(10),
  paymentStatus: z.boolean(),
  finished: z.boolean(),
  pressed: z.boolean(),
  userId: z.number().positive(),
  cageId: z.number().positive()
});

const allocationCreateSchema = allocationSchema.omit({ id: true, finalDatetime: true, price: true, userId: true, cageId: true, paymentStatus: true, pressed: true, finished: true });
const allocationNotFinishedSchema =  allocationSchema.omit({ finalDatetime: true, price: true });
const allocationReadSchema = allocationSchema.array();
const updateReturn = allocationSchema.omit({ userId: true, cageId: true });

export {
  allocationSchema,
  allocationCreateSchema,
  allocationReadSchema,
  allocationNotFinishedSchema,
  updateReturn
};