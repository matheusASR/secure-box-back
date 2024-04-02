import { CageCreate, CageRead, ICageReturn } from "../interfaces";
import { cageRepository } from "../repositories";
import { cageReadSchema, cageSchema } from "../schemas";
import { DeepPartial } from "typeorm";
import { Cage } from "../entities";

const create = async (payload: CageCreate): Promise<ICageReturn> => {
  const cageCreated: ICageReturn = cageRepository.create(payload);
  await cageRepository.save(cageCreated);

  return cageSchema.parse(cageCreated);
};

const read = async (location: any): Promise<CageRead> => {
  const cages: ICageReturn[] | null = await cageRepository.find({where: {location}});

  if (cages.length === 0) {
    return []
  }

  return cageReadSchema.parse(cages);
};

const retrieve = async (id: number): Promise<ICageReturn> => {
  const cage: ICageReturn | null = await cageRepository.findOne({
    where: { id },
  });
  return cageSchema.parse(cage);
};

const update = async (
  foundCage: ICageReturn | null,
  payload: DeepPartial<ICageReturn>
): Promise<ICageReturn> => {
  return cageSchema.parse(
    await cageRepository.save({ ...foundCage, ...payload })
  );
};

const destroy = async (cage: Cage): Promise<void> => {
  await cageRepository.remove(cage);
};

export default { create, read, retrieve, update, destroy };
