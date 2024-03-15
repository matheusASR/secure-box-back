import { AppDataSource } from "../data-source";
import { Cage } from "../entities";

export default AppDataSource.getRepository(Cage);