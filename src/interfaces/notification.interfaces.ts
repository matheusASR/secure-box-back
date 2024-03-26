import { z } from "zod";
import {
    notificationSchema, notificationCreateSchema
} from "../schemas";
import { Repository } from "typeorm";
import { Notification } from "../entities";

type INotification = z.infer<typeof notificationSchema>;
type NotificationCreate = z.infer<typeof notificationCreateSchema>

type NotificationRepo = Repository<Notification>;

export { INotification, NotificationCreate, NotificationRepo };