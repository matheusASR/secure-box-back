import { z } from "zod";
import {
    paymentSchema, paymentCreateSchema
} from "../schemas";
import { Repository } from "typeorm";
import { Payment } from "../entities";

type IPayment = z.infer<typeof paymentSchema>;
type PaymentCreate = z.infer<typeof paymentCreateSchema>

type PaymentRepo = Repository<Payment>;

export { IPayment, PaymentCreate, PaymentRepo };