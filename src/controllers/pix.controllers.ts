import axios, { AxiosInstance } from "axios";
import fs from "fs";
import https from "https";
import path from "path";
import "reflect-metadata";
import "dotenv/config";
import { Request, Response } from "express";
import Gerencianet from 'gn-api-sdk-typescript';

var options = {
  sandbox: false,
  client_id: process.env.GN_CLIENT_ID || '',
  client_secret: process.env.GN_CLIENT_SECRET || '',
  pix_cert: fs.readFileSync(
    path.resolve(__dirname, "../certs/producao-562010-secbox - PIX.p12")
  )
};

var gerencianet = new Gerencianet(options);

const generatePIX = async (req: Request, res: Response): Promise<any> => {
  const payload = req.body
  const value = payload.value
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
      chave: "2b720e07-d74a-42b8-ba94-cfa71bc9ca8d",
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

const statusPix = async (req: Request, res: Response): Promise<any> => {
  return res.status(200).end()
};

const configWebhook = async (req: Request, res: Response): Promise<any> => {
  let body = {
		"webhookUrl": "https://api.secbox.online/prod/webhook"
	}
	
	let params = {
		chave: "2b720e07-d74a-42b8-ba94-cfa71bc9ca8d"
	}
	
	return await gerencianet.pixConfigWebhook(params, body);
};

export default { generatePIX, verifyPIX, configWebhook, statusPix };
