import { Request, Response } from "express";
import { IWallet, WalletCreate } from "../interfaces";
import { walletServices } from "../services";

const update = async (req: Request, res: Response): Promise<Response> => {
  const payload = req.body;
  const userId = Number(req.params.userId);
  const walletUpdated: any = await walletServices.update(payload, userId);
  return res.status(200).json(walletUpdated);
};

export default { update };
