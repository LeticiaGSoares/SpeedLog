import { z } from "zod"

import formatZodError from "../formatZodError.js";
import { typeStatus } from "../../models/Entrega.js";
import returnRes from "../returnRes.js";

const validateBody = (req, res, next) => {
    try {
        const bodySchema = z.object({
            cep_origem: z.string({
                required_error: "O cep de origem é obrigatório"
            }),
            cep_destino: z.string({
                required_error: "O cep de destino é obrigatório"
            }),
            numero_origem: z.string({
                required_error: "O numero de origem é obrigatório"
            }),
            numero_destino: z.string({
                required_error: "O numero de destino é obrigatório"
            }),
            complemento_origem: z.string({
                required_error: "O complemento de origem é obrigatório"
            }),
            complemento_destino: z.string({
                required_error: "O complemento de destino é obrigatório"
            }),
            hora_saida: z.string({
                required_error: "O hora de saida é obrigatório"
            }),
            hora_chegada: z.string({
                required_error: "O hora de chegada é obrigatório"
            }),
            peso_produto: z.string({
                required_error: "O peso do produto é obrigatório"
            }),
            usuario_id: z.string({
                required_error: "O id do usuário é obrigatório"
            }),
            motoboy_id: z.string({
                required_error: "O id do motoboy é obrigatório"
            }),
            pagamento: z.string({
                required_error: "O pagamento é obrigatório"
            }),
            status: z.string({
                required_error: "O papel é obrigatório"
            }).refine((data) => data === typeStatus.agendado || data === typeStatus.cancelado || data === typeStatus.em_andamento || data === typeStatus.finalizado, {
                message: "Papel inválido"
            })
        })

        bodySchema.parse(req.body);
        next()
    } catch (error) {
        console.error("[HELPER] [ENTREGA] [VALIDATE BODY] Error: " + error);
        return returnRes(formatZodError(error), 500, res);
    }
}

export default validateBody