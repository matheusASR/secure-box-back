import axios, { AxiosInstance } from "axios";
import fs from "fs";
import https from "https";
import path from "path";
import "reflect-metadata";
import "dotenv/config";
import { Request, Response } from "express";
// import * as Gerencianet from 'gn-api-sdk-node';

const options = {
	sandbox: false,
	client_id: process.env.GN_CLIENT_ID,
	client_secret: process.env.GN_CLIENT_SECRET,
	pix_cert: fs.readFileSync(
    path.resolve(__dirname, "../certs/producao-562010-secbox - PIX.p12")
  )
};

// const gerencianet = new Gerencianet(options);

const generatePIX = async (req: Request, res: Response): Promise<any> => {
  try {
    const cert = fs.readFileSync(
      path.resolve(__dirname, "../certs/producao-562010-secbox - PIX.p12")
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
        original: "0.10",
      },
      chave: "48124536821",
      solicitacaoPagador: "Cobrança dos serviços prestados.",
    };

    const cobResponse = await reqGN.post("/v2/cob", dataCob);
    const qrCodeResponse = await reqGN.get(
      `/v2/loc/${cobResponse.data.loc.id}/qrcode`
    );

    return res.status(201).json(qrCodeResponse.data);
  } catch (error: any) {
    return res.status(500).json(error);
  }
};

const verifyPIX = async (req: Request, res: Response): Promise<any> => {
  return res.status(200).json({"message": "Olá mundo!"})
};

const configWebhook = async (req: Request, res: Response): Promise<any> => {
  const body = {
    "webhookUrl": "https://api.secbox.online/prod/webhook"
  }

  const params = {
    chave: "48124536821"
  }

  // return await gerencianet.pixConfigWebhook(params, body)
};

export default { generatePIX, verifyPIX, configWebhook };
