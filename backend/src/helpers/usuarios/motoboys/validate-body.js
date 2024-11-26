import { z } from "zod"

import returnRes from "../../returnRes.js"
import deleteArchive from "../deleteArchive.js";
import formatZodError from "../../formatZodError.js";

const validateBody = (req, res, next) => {
    try {
        const motoboySchema = z.object({
            nome: z.string({
                required_error: "O nome é obrigatório",
                invalid_type_error: "Nome inválido"
            }).min(3, "O nome é muito pequeno"),
            email: z.string({
                required_error: "O email é obrigatório"
            }).email(
                "Email inválido"
            ),
            papel: z.string({
                required_error: "O papel é obrigatório"
            }).refine((data) => data === "motoboy", {
                message: "Papel inválido"
            }),
            senha: z.string({
                required_error: "O senha é obrigatória",
                invalid_type_error: "Senha inválida"
            }).min(6, "O senha é muito pequena"),
            cpf: z.string({
                required_error: "O CPF é obrigatório",
                invalid_type_error: "CPF inválido"
            }).min(11, "O CPF é muito pequeno")
                .max(11, "O CPF é muito grande").optional(),
            cnh: z.string({
                required_error: "O CNH é obrigatório",
                invalid_type_error: "CNH inválido"
            }).min(3, "O CNH é muito pequeno").optional(),
            moto_placa: z.string({
                required_error: "O placa da moto é obrigatório",
                invalid_type_error: "placa da moto inválido"
            }).min(3, "O placa da moto é muito pequeno"),
            moto_modelo: z.string({
                required_error: "O modelo da moto é obrigatório",
                invalid_type_error: "modelo da moto inválido"
            }).min(3, "O modelo da moto é muito pequeno"),
        })

        motoboySchema.parse(req.body);

        next()
    } catch (error) {
        console.error("[HELPER] [MOTOBOYS] [VALIDATE BODY] Error: " + error);
        return returnRes(formatZodError(error), 500, res);
    }
}

export default validateBody