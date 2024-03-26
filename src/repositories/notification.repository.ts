import { AppDataSource } from "../data-source";
import { Notification } from "../entities";

export default AppDataSource.getRepository(Notification);