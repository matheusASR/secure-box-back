import { Allocation } from './../entities/Allocation.entity';
import { Request, Response } from "express";
import { allocationServices } from "../services";
import { IAllocationReturn, AllocationCreate, AllocationRead } from "../interfaces";
import { DeepPartial } from "typeorm";
import { allocationRepository } from "../repositories";

const create = async (req: Request, res: Response): Promise<Response> => {
  const payload: AllocationCreate = req.body
  const user: any = await allocationServices.create(payload);
  return res.status(201).json(user);
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

const retrieveUserAllocations = async (req: Request, res: Response): Promise<Response> => {
  const userId: number = Number(req.params.userId);
  const allocations: any = await allocationServices.retrieveUserAllocations(userId);
  return res.status(200).json(allocations);
};

const update = async (req: Request, res: Response): Promise<Response> => {
  const id: number = Number(req.params.id);
  const payload: DeepPartial<IAllocationReturn> = req.body;
  const foundallocation: any = await allocationRepository.findOne({ where: { id } });
    ////////////////////////////

  const allocationUpdated: IAllocationReturn = await allocationServices.update(foundallocation, payload);

  return res.status(200).json(allocationUpdated);
};




export default { create, read, retrieve, retrieveUserAllocations, update };