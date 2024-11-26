import jwt from 'jsonwebtoken'
import "dotenv/config"
import Usuario, { typeOfUsers } from "../../models/Usuario.js"
import returnRes from '../returnRes.js'

const SECRET_KEY = process.env.JWT_PASS

const authToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    const { id } = req.params

    try {
        const verifyLengthAdmins = await Usuario.findAll({ where: { papel: "administrador" } })

        if (!token && verifyLengthAdmins.length < 1) {
            return next()
        }

        if (!token && verifyLengthAdmins.length > 0) {
            return returnRes("Você não está autorizado e não aplicou um token válido", 401, res)
        }

        jwt.verify(token, SECRET_KEY, async (err, user) => {
            const userParam = await Usuario.findOne({ where: { usuario_id: id } })
            const userToken = await Usuario.findOne({ where: { usuario_id: user.id } })

            if (userToken != userParam || !userToken || !userParam) {
                return returnRes("Você não está autorizado", 403, res)
            }

            next()
        });
    } catch (error) {
        console.error("[HELPERS] [MOTOBOYS] [TOKEN] Error: " + error);
        return returnRes("Erro ao autenticar token", 500, res);
    }
}
export default authToken;