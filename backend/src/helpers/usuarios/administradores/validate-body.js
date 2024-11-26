import { z } from "zod"

import formatZodError from "../formatZodError.js";
import returnRes from "../returnRes.js"
import deleteArchive from "../deleteArchive.js";
import { typeOfUsers } from "../../../models/Usuario.js";

const validateBody = (req, res, next) => {
    try {
        const administradorSchema = z.object({
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
            }).refine((data) => data === typeOfUsers.administrador, {
                message: "Papel inválido"
            }),
            foto: z.string({
                invalid_type_error: "Foto inválida"
            }).optional(),
            senha: z.string({
                required_error: "O senha é obrigatória",
                invalid_type_error: "Senha inválida"
            }).min(6, "O senha é muito pequena")
        })

        administradorSchema.parse(req.body);

        next()
    } catch (error) {
        deleteArchive(req.files.foto[0].path)
        console.error("[HELPER] [ADMINSTRADORES] [VALIDATE BODY] Error: " + error);
        return returnRes(formatZodError(error), 500, res);
    }
}

export default validateBody