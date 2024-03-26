import { AppDataSource } from "../data-source";
import { PaymentMethod } from "../entities";

export default AppDataSource.getRepository(PaymentMethod);