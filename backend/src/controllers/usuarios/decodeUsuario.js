import jwt from "jsonwebtoken"
import returnRes from "../../helpers/returnRes.js";

const SECRET_KEY = process.env.JWT_PASS

const decodeUsuario = async (req, res) => {
  const { token } = req.body

  const secretKey = SECRET_KEY;

  try {
    const decoded = jwt.verify(token, secretKey);
    return returnRes(decoded, 200, res)
  } catch (error) {
    console.error("[CONTROLLER] [USUARIOS] [DECODE TOKEN] Error: " + error);
    return returnRes("Erro ao decodificar o token do usuário", 500, res);
  }
};

export default decodeUsuario;
