import { z } from "zod";
import {
    addressSchema, addressCreateSchema
} from "../schemas";
import { Repository } from "typeorm";
import { Address } from "../entities";

type IAddress = z.infer<typeof addressSchema>;
type AddressCreate = z.infer<typeof addressCreateSchema>

type AddressRepo = Repository<Address>;

export { IAddress, AddressCreate, AddressRepo };