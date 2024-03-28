import { Request, Response } from "express";
import { allocationServices } from "../services";
import { IAllocationReturn, AllocationRead, ICageReturn } from "../interfaces";
import { DeepPartial } from "typeorm";
import { allocationRepository, cageRepository } from "../repositories";

const create = async (req: Request, res: Response): Promise<Response> => {
  const userId: number = Number(res.locals.userID);
  const cageId: number = Number(req.params.cageId);
  const payload: any = req.body
  const restDefault = {
    paymentStatus: false,
    price: 0,
    finalDatetime: "null",
    finished: false,
  }

  const cageFound: ICageReturn | null = await cageRepository.findOne({where: {id: cageId}})
  await cageRepository.save({ ...cageFound, availability: false })

  const allocation: any = await allocationServices.create({...restDefault, ...payload, user: userId, cage: cageId});
  return res.status(201).json(allocation);
};

const read = async (req: Request, res: Response): Promise<Response> => {
  const allocations: AllocationRead = await allocationServices.read();
  return res.status(200).json(allocations);
};

const retrieve = async (req: Request, res: Response): Promise<Response> => {
  const id: number = Number(req.params.id);
  const allocation: IAllocationReturn = await allocationServices.retrieve(id);
  return res.status(200).json(allocation);
};

const userInUseAllocations = async (req: Request, res: Response): Promise<Response> => {
  const userId: number = Number(req.params.userId);
  const allocations: any = await allocationServices.userInUseAllocations(userId);
  return res.status(200).json(allocations);
};

const userFinishedAllocations = async (req: Request, res: Response): Promise<Response> => {
  const userId: number = Number(req.params.userId); // Convertendo para número
  if (isNaN(userId)) {
    return res.status(400).json({ error: 'Invalid userId' });
  }

  const allocations: any = await allocationServices.userFinishedAllocations(userId);
  return res.status(200).json(allocations);
};

const update = async (req: Request, res: Response): Promise<Response> => {
  const id: number = Number(req.params.id);
  const payload: DeepPartial<any> = req.body;
  const foundAllocation: any = await allocationRepository.findOne({ where: { id } });
  const allocationUpdated: any = await allocationServices.update(foundAllocation, payload);

  return res.status(200).json(allocationUpdated);
};

const destroy = async (req: Request, res: Response): Promise<Response> => {
  const id: number = Number(req.params.id);
  const foundallocation: any = await allocationRepository.findOne({ where: { id } });
  await allocationServices.destroy(foundallocation);
  return res.status(204).json();
};


export default { create, read, retrieve, userInUseAllocations, update, userFinishedAllocations, destroy };