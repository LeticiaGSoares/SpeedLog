import jwt from "jsonwebtoken";
import "dotenv/config"

const SECRET_KEY = process.env.JWT_PASS

const createToken = async (user, res) => {

        console.log(user)
    try {
        const accessToken = jwt.sign({
            id: user.usuario_id,
            email: user.email,
            papel: user.papel,
            senha: user.senha
        }, SECRET_KEY, { expiresIn: '30d' })

        console.log(`Token do tipo ${user.papel} criado: \n ${accessToken}`)
        return accessToken
    } catch (error) {
        return res.status(500).json({ message: "Erro interno do servidor" + error })
    }

}

export default createToken;