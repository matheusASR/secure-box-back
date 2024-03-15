import { z } from "zod";
import {
  allocationCreateSchema,
  allocationReadSchema,
  allocationSchema,
} from "../schemas";
import { Repository } from "typeorm";
import { Allocation } from "../entities";

type IAllocationReturn = z.infer<typeof allocationSchema>;
type AllocationCreate = z.infer<typeof allocationCreateSchema>;
type AllocationRead = z.infer<typeof allocationReadSchema>;

type AllocationRepo = Repository<Allocation>;

export {
  AllocationCreate,
  AllocationRead,
  AllocationRepo,
  IAllocationReturn,
};