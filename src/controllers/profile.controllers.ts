import { Request, Response } from "express";
import { IUpdateUser } from "../interfaces";
import { profileServices } from "../services";

const retrieve = async (req: Request, res: Response): Promise<Response> => {
    const userID: number = res.locals.userID
    const userProfile: IUpdateUser = await profileServices.retrieve(userID);
    return res.status(200).json(userProfile);
  };

export default { retrieve }