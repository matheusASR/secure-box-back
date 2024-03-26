import { z } from "zod";

const notificationSchema = z.object({
  id: z.number().positive(),
  title: z.string().max(100),
  content: z.string(),
  sentAt: z.string().max(100),
  status: z.boolean().default(false),
  type: z.string().max(255),
  user: z.any()
});

const notificationCreateSchema = notificationSchema.omit({ id: true, user: true });

export {
  notificationSchema,
  notificationCreateSchema,
};