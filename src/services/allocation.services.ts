import {
  AllocationCreate,
  AllocationRead,
  IAllocationReturn,
} from "../interfaces";
import { allocationRepository } from "../repositories";
import {
  allocationReadSchema,
  allocationSchema,
  updateReturn,
} from "../schemas";
import { DeepPartial } from "typeorm";
import { Allocation } from "../entities";

const create = async (
  payload: AllocationCreate
): Promise<any> => {
  const allocationCreated: any = allocationRepository.create(payload);
  await allocationRepository.save(allocationCreated);

  return allocationCreated;
};

const read = async (): Promise<AllocationRead> => {
  const allocations: any = await allocationRepository.find({
    relations: ["user", "cage"],
  });

  const allocationRead = allocations.map(
    (allocation: {
      id: any;
      initialDatetime: any;
      finalDatetime: any;
      price: any;
      paymentStatus: any;
      finished: any;
      user: { id: any };
      cage: { id: any };
    }): IAllocationReturn => ({
      id: allocation.id,
      initialDatetime: allocation.initialDatetime,
      finalDatetime: allocation.finalDatetime,
      price: allocation.price,
      paymentStatus: allocation.paymentStatus,
      finished: allocation.finished,
      userId: allocation.user.id,
      cageId: allocation.cage.id,
    })
  );

  return allocationReadSchema.parse(allocationRead);
};

const retrieve = async (id: number): Promise<IAllocationReturn> => {
  const allocation: Allocation | null = await allocationRepository.findOne({
    relations: ["user", "cage"],
    where: { id },
  });

  const allocationFormatted = {
    id: allocation?.id,
    initialDatetime: allocation?.initialDatetime,
    finalDatetime: allocation?.finalDatetime,
    price: allocation?.price,
    paymentStatus: allocation?.paymentStatus,
    finished: allocation?.finished,
    userId: allocation?.user.id,
    cageId: allocation?.cage.id,
  };

  return allocationSchema.parse(allocationFormatted);
};

const userInUseAllocations = async (userId: number): Promise<any> => {
  const allocations: any = await allocationRepository.find({
    where: { user: { id: userId }, finished: false },
    relations: ["user", "cage"] 
  });

  if (!allocations || allocations.length === 0) {
    return []; 
  }

  const allocationRead = allocations.map(
    (allocation: any): IAllocationReturn => ({
      id: allocation.id,
      initialDatetime: allocation.initialDatetime,
      finalDatetime: allocation.finalDatetime,
      price: allocation.price,
      paymentStatus: allocation.paymentStatus,
      finished: allocation.finished,
      userId: allocation.user ? allocation.user.id : null, 
      cageId: allocation.cage ? allocation.cage.id : null, 
    })
  );

  return allocationReadSchema.parse(allocationRead);
};

const userFinishedAllocations = async (userId: number): Promise<any> => {
  const allocations: any = await allocationRepository.find({
    where: { user: { id: userId }, finished: true },
    relations: ["user", "cage"] 
  });

  if (!allocations || allocations.length === 0) {
    return []; 
  }

  const allocationRead = allocations.map(
    (allocation: any): IAllocationReturn => ({
      id: allocation.id,
      initialDatetime: allocation.initialDatetime,
      finalDatetime: allocation.finalDatetime,
      price: allocation.price,
      paymentStatus: allocation.paymentStatus,
      finished: allocation.finished,
      userId: allocation.user ? allocation.user.id : null,
      cageId: allocation.cage ? allocation.cage.id : null, 
    })
  );

  return allocationReadSchema.parse(allocationRead);
};

const update = async (
  foundAllocation: any,
  payload: DeepPartial<any>
): Promise<any> => {
  return updateReturn.parse(
    await allocationRepository.save({ ...foundAllocation, ...payload })
  );
};

const destroy = async (allocation: Allocation): Promise<void> => {
  await allocationRepository.remove(allocation);
};

export default { create, read, retrieve, userInUseAllocations, userFinishedAllocations, update, destroy };
