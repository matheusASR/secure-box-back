import axios, { AxiosInstance } from "axios";
import fs from "fs";
import https from "https";
import path from "path";
import "reflect-metadata";
import "dotenv/config";
import { Request, Response } from "express";

const generatePIX = async (req: Request, res: Response): Promise<any> => {
  try {
    const cert = fs.readFileSync(
      path.resolve(__dirname, "../certs/homologacao-562010-secbox - PIX.p12")
    );
    const agent = new https.Agent({
      pfx: cert,
      passphrase: "",
    });
    const credentials = Buffer.from(
      `${process.env.GN_CLIENT_ID}:${process.env.GN_CLIENT_SECRET}`
    ).toString("base64");
    const responseToken = await axios({
      method: "POST",
      url: `${process.env.GN_ENDPOINT}/oauth/token`,
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/json",
      },
      httpsAgent: agent,
      data: {
        grant_type: "client_credentials",
      },
    });

    const acessToken = responseToken.data?.access_token;

    const reqGN: AxiosInstance = axios.create({
      baseURL: process.env.GN_ENDPOINT as any,
      httpsAgent: agent as any,
      headers: {
        Authorization: `Bearer ${acessToken}`,
        "Content-Type": "application/json",
      },
    });
    const dataCob = {
      calendario: {
        expiracao: 3600,
      },
      valor: {
        original: "100.00",
      },
      chave: "48124536821",
      solicitacaoPagador: "Cobrança dos serviços prestados.",
    };

    const cobResponse = await reqGN.post("/v2/cob", dataCob)

    return res.status(200).json(cobResponse.data);
  } catch (error: any) {
    return res.status(500).json(error);
  }
};

const verifyPIX = async (req: Request, res: Response): Promise<any> => {
  try {
  } catch (error: any) {
    return res.status(500).json(error);
  }
};

export default { generatePIX, verifyPIX };
