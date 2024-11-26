import { z } from "zod"

import returnRes from "../returnRes.js"
import formatZodError from "../formatZodError.js";
import { typeOfUsers } from "../../models/Usuario.js";

const validateBodyLogin = (req, res, next) => {
    try {
        const loginSchema = z.object({
            email: z.string({
                required_error: "O email é obrigatório"
            }).email(
                "Email inválido"
            ).optional(),
            cpf: z.string().regex(/^\d{11}/, "CPF inválido").optional(),
            papel: z.string({
                required_error: "O papel é obrigatório"
            }).refine((data) => data === typeOfUsers.administrador || data === typeOfUsers.cliente, {
                message: "Papel inválido"
            }),
            senha: z.string({
                required_error: "O senha é obrigatória",
                invalid_type_error: "Senha inválida"
            }).min(6, "O senha é muito pequena")
        }).refine(data => data.email || data.cpf, {
            message: "É necessário informar pelo menos o email ou o CPF",
            path: ["email", "cpf"]
        });

        loginSchema.parse(req.body);
        next()
    } catch (error) {
        console.error("[HELPER] [USUARIOS] [VALIDATE BODY LOGIN] Error: " + error);
        return returnRes(formatZodError(error), 500, res);
    }
}

export default validateBodyLogin