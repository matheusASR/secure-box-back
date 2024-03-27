import { z } from "zod";
import {
    walletSchema, walletCreateSchema
} from "../schemas";
import { Repository } from "typeorm";
import { Wallet } from "../entities";

type IWallet = z.infer<typeof walletSchema>;
type WalletCreate = z.infer<typeof walletCreateSchema>

type WalletRepo = Repository<Wallet>;

export { IWallet, WalletCreate, WalletRepo };