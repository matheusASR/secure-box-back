// import Gerencianet from 'gn-api-sdk-node';
// import { AppError } from '../errors';

// // Configuração da Gerencianet SDK
// const options: Gerencianet.Options = {
//     client_id: 'seu_client_id',
//     client_secret: 'seu_client_secret',
//     sandbox: true // Defina como false para produção
// };

// const api = Gerencianet(options);

export const generateQRCode = async () => {
    // try {
    //     // Chamada para a API da Gerencianet para gerar o QR Code
    //     const response = await api.pix.createQRCode({
    //         // Parâmetros para a criação do QR Code
    //     });
    //     return response.qrcode;
    // } catch (error: any) {
    //     throw new AppError(error.response.data.message);
    // }
};

export const generatePixCode = async () => {
    // try {
    //     // Chamada para a API da Gerencianet para gerar o código PIX
    //     const response = await api.pix.createCob({
    //         // Parâmetros para a criação do código PIX
    //     });
    //     return response;
    // } catch (error: any) {
    //     throw new AppError(error.response.data.message);
    // }
};

export default { generatePixCode, generateQRCode };
