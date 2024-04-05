import { Request, Response } from "express";
import { pixServices } from "../services";

const generateQRCode = async (req: Request, res: Response) => {
    try {
        // Chamada para o serviço Gerencianet para gerar o QR Code
        const qrCode = await pixServices.generateQRCode();
        return res.status(200).json(qrCode);
    } catch (error: any) {
        return res.status(500).json({ error: error.response.data.message });
    }
};

const generatePixCode = async (req: Request, res: Response) => {
    try {
        // Chamada para o serviço Gerencianet para gerar o código PIX
        const pixCode = await pixServices.generatePixCode();
        return res.status(200).json(pixCode);
    } catch (error: any) {
        return res.status(500).json({ error: error.response.data.message });
    }
};

export default { generatePixCode, generateQRCode }