import { z } from "zod";
import {
    paymentMethodSchema, paymentMethodCreateSchema
} from "../schemas";
import { Repository } from "typeorm";
import { PaymentMethod } from "../entities";

type IPaymentMethod = z.infer<typeof paymentMethodSchema>;
type PaymentMethodCreate = z.infer<typeof paymentMethodCreateSchema>

type PaymentMethodRepo = Repository<PaymentMethod>;

export { IPaymentMethod, PaymentMethodCreate, PaymentMethodRepo };