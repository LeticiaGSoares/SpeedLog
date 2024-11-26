import returnRes from "../../helpers/returnRes.js";
import logoutUsuarioModule from "./modules/logout.js";

const logoutUsuario = async (req, res) => {
    try {
        return await logoutUsuarioModule(res)
    } catch (error) {
        console.error("[CONTROLLER] [USUARIOS] [LOGOUT] Error: " + error);
        return returnRes("Erro ao realizar logout usuário", 500, res);
    }
};

export default logoutUsuario;
