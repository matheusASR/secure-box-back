import { AppDataSource } from "../data-source";
import { Payment } from "../entities";

export default AppDataSource.getRepository(Payment);