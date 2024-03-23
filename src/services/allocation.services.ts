import {
  AllocationCreate,
  AllocationRead,
  IAllocationReturn,
  IAllocationNotFinished,
} from "../interfaces";
import { allocationRepository } from "../repositories";
import {
  allocationNotFinishedSchema,
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
      unlocked: boolean;
      pressed: boolean;
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
      pressed: allocation.pressed,
      unlocked: allocation.unlocked,
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
    pressed: allocation?.pressed,
    unlocked: allocation?.unlocked,
    userId: allocation?.user.id,
    cageId: allocation?.cage.id,
  };

  return allocationSchema.parse(allocationFormatted);
};

const userNotFinishedAllocations = async (userId: number): Promise<any> => {
  const allocations: any = await allocationRepository.find({
    where: { user: { id: userId }, finished: false },
    relations: ["user", "cage"] // Certifique-se de carregar as relações necessárias
  });

  if (!allocations || allocations.length === 0) {
    return []; // Retorna um array vazio se não houver alocações associadas ao usuário
  }

  const allocationRead = allocations.map(
    (allocation: any): IAllocationReturn => ({
      id: allocation.id,
      initialDatetime: allocation.initialDatetime,
      finalDatetime: allocation.finalDatetime,
      price: allocation.price,
      paymentStatus: allocation.paymentStatus,
      finished: allocation.finished,
      pressed: allocation.pressed,
      unlocked: allocation.unlocked,
      userId: allocation.user ? allocation.user.id : null, // Verifica se o usuário está definido antes de acessar o ID
      cageId: allocation.cage ? allocation.cage.id : null, // Verifica se a gaiola está definida antes de acessar o ID
    })
  );

  return allocationReadSchema.parse(allocationRead);
};

const userFinishedAllocations = async (userId: number): Promise<any> => {
  const allocations: any = await allocationRepository.find({
    where: { user: { id: userId }, finished: true },
    relations: ["user", "cage"] // Certifique-se de carregar as relações necessárias
  });

  if (!allocations || allocations.length === 0) {
    return []; // Retorna um array vazio se não houver alocações associadas ao usuário
  }

  const allocationRead = allocations.map(
    (allocation: any): IAllocationReturn => ({
      id: allocation.id,
      initialDatetime: allocation.initialDatetime,
      finalDatetime: allocation.finalDatetime,
      price: allocation.price,
      paymentStatus: allocation.paymentStatus,
      finished: allocation.finished,
      pressed: allocation.pressed,
      unlocked: allocation.unlocked,
      userId: allocation.user ? allocation.user.id : null, // Verifica se o usuário está definido antes de acessar o ID
      cageId: allocation.cage ? allocation.cage.id : null, // Verifica se a gaiola está definida antes de acessar o ID
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

export default { create, read, retrieve, userNotFinishedAllocations, userFinishedAllocations, update, destroy };
