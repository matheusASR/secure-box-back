import { z } from "zod";
import {
  cageCreateSchema,
  cageReadSchema,
  cageSchema,
} from "../schemas";
import { Repository } from "typeorm";
import { Cage } from "../entities";

type ICageReturn = z.infer<typeof cageSchema>;
type CageCreate = z.infer<typeof cageCreateSchema>;
type CageRead = z.infer<typeof cageReadSchema>;

type CageRepo = Repository<Cage>;

export {
  CageCreate,
  CageRead,
  CageRepo,
  ICageReturn,
};
