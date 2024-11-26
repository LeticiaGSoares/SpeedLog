import { z } from "zod"

import formatZodError from "../formatZodError.js";
import returnRes from "../returnRes.js"
import deleteArchive from "./deleteArchive.js";
import { typeOfUsers } from "../../models/Usuario.js";

const validateBodyUpdate = (req, res, next) => {
    try {
        const usuarioSchema = z.object({
            nome: z.string({
                required_error: "O nome é obrigatório",
                invalid_type_error: "Nome inválido"
            }).min(3, "O nome é muito pequeno").optional(),
            email: z.string({
                required_error: "O email é obrigatório"
            }).email(
                "Email inválido"
            ).optional(),
            foto: z.string({
                invalid_type_error: "Foto inválida"
            }).optional(),
            senha: z.string({
                required_error: "O senha é obrigatória",
                invalid_type_error: "Senha inválida"
            }).min(6, "O senha é muito pequena").optional,
            data_nascimento: z.string({
                required_error: "A data de nascimento é obrigatória"
            }).date(
                "Data de nascimento inválida"
            ).optional(),
            telefone: z.string({
                required_error: "O telefone é obrigatório",
                invalid_type_error: "Telefone inválido"
            }).min(14, "O telefone é muito pequeno")
                .max(15, "O telefone é muito grande").optional(),
            cidade: z.string({
                required_error: "O cidade é obrigatória",
                invalid_type_error: "Cidade inválida"
            }).min(3, "O cidade é muito pequeno").optional(),
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
            }).min(3, "O placa da moto é muito pequeno").optional(),
            moto_modelo: z.string({
                required_error: "O modelo da moto é obrigatório",
                invalid_type_error: "modelo da moto inválido"
            }).min(3, "O modelo da moto é muito pequeno").optional(),

        })

        usuarioSchema.parse(req.body);

        next()
    } catch (error) {
        console.error("[HELPER] [USUARIOS] [VALIDATE BODY UPDATE] Error: " + error);
        return returnRes(formatZodError(error), 500, res);
    }
}

export default validateBodyUpdate