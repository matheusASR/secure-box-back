import { Request, Response } from "express";
import { cageServices } from "../services";
import { ICageReturn, CageCreate, CageRead } from "../interfaces";
import { DeepPartial } from "typeorm";
import { cageRepository } from "../repositories";

const create = async (req: Request, res: Response): Promise<Response> => {
  const payload: CageCreate = req.body
  const user: ICageReturn = await cageServices.create(payload);
  return res.status(201).json(user);
};

const read = async (req: Request, res: Response): Promise<Response> => {
  
  const cages: CageRead = await cageServices.read();
  return res.status(200).json(cages);
};

const retrieve = async (req: Request, res: Response): Promise<Response> => {
  const id: number = Number(req.params.id);
  const cage: ICageReturn = await cageServices.retrieve(id);
  return res.status(200).json(cage);
};

const update = async (req: Request, res: Response): Promise<Response> => {
  const id: number = Number(req.params.id);
  const payload: DeepPartial<ICageReturn> = req.body;
  const foundCage: ICageReturn | null = await cageRepository.findOne({ where: { id } });
  const cageUpdated: ICageReturn = await cageServices.update(foundCage, payload);

  return res.status(200).json(cageUpdated);
};

const destroy = async (req: Request, res: Response): Promise<Response> => {
  const id: number = Number(req.params.id);
  const foundCage: any = await cageRepository.findOne({ where: { id } });
  await cageServices.destroy(foundCage);
  return res.status(204).json();
};


export default { create, read, retrieve, update, destroy };