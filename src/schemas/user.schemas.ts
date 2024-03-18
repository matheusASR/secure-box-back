import { z } from "zod";

const userSchema = z.object({
  id: z.number().positive(),
  name: z.string().max(45),
  email: z.string().max(45).email(),
  password: z.string().max(120),
  cpf: z.string().max(11),
  cel: z.string().max(20),
  address: z.object({
    street: z.string(),
    number: z.string(),
    city: z.string(),
    state: z.string(),
    complement: z.string().optional(),
  }),
  birthdate: z.string().max(10),
  admin: z.boolean().default(false),
});

const userLoginSchema = z.object({
  email: z.string().max(45).email(),
  password: z.string().max(120),
});

const userCreateSchema = userSchema.omit({ id: true });
const userReturnSchema = userSchema.omit({
  password: true,
  address: true,
  admin: true,
});
const userReadSchema = userReturnSchema.array();
const userSchemaUpdate = userSchema.omit({ password: true });
export {
  userSchema,
  userCreateSchema,
  userReturnSchema,
  userReadSchema,
  userLoginSchema,
  userSchemaUpdate,
};
