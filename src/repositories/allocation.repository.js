import { AppDataSource } from "../data-source";
import { Allocation } from "../entities";

export default AppDataSource.getRepository(Allocation);