import returnRes from "../../helpers/returnRes.js";
import deleteUsuarioModule from "./modules/delete.js";

const deleteUsuario = async (req, res) => {
    const { id } = req.params
    try {
        return await deleteUsuarioModule(id, res)
    } catch (error) {
        console.error("[CONTROLLER] [USUARIOS] [DELETE] Error: " + error);
        return returnRes("Erro ao deletar usuário", 500, res);
    }
};

export default deleteUsuario;
