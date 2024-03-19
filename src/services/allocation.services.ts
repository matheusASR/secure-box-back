import { AllocationCreate, AllocationRead, IAllocationReturn, IAllocationNotFinished } from "../interfaces";
import { allocationRepository } from "../repositories";
import { allocationNotFinishedSchema, allocationReadSchema, allocationSchema } from "../schemas";
import { DeepPartial } from "typeorm";
import { Allocation } from "../entities";

const create = async (payload: AllocationCreate): Promise<IAllocationNotFinished> => {
  const allocationCreated: Allocation = allocationRepository.create(payload);
  await allocationRepository.save(allocationCreated);

  return allocationNotFinishedSchema.parse(allocationCreated);
};

const read = async (): Promise<AllocationRead> => {
  const allocations: Allocation[] = await allocationRepository.find();
  return allocationReadSchema.parse(allocations);
};

const retrieve = async (id: number): Promise<IAllocationReturn> => {
  const allocation: Allocation | null = await allocationRepository.findOne({
    where: { id },
  });
  return allocationSchema.parse(allocation);
};

const retrieveUserAllocations = async (userId: any): Promise<any> => {
  const allocations: any = await allocationRepository.find({ where: {user: userId} });
  return allocations;
};

const update = async (
  foundAllocation: IAllocationReturn,
  payload: DeepPartial<IAllocationReturn>
): Promise<IAllocationReturn> => {
  return allocationSchema.parse(
    await allocationRepository.save({ ...foundAllocation, ...payload })
  );
};

export default { create, read, retrieve, retrieveUserAllocations, update };