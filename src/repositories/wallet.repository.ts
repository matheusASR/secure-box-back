import { AppDataSource } from "../data-source";
import { Wallet } from "../entities";

export default AppDataSource.getRepository(Wallet);