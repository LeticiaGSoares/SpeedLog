import returnRes from "../../../helpers/returnRes.js";
import Usuario from "../../../models/Usuario.js";

const searchUsuarioModule = async (id, res) => {
    try {

        const usuarioInfo = await Usuario.findOne({ where: { usuario_id: id } })

        if (!usuarioInfo) {
            return returnRes("Usuario não encontrado", 404, res);
        }

        return returnRes(usuarioInfo, 200, res);
    } catch (error) {
        console.error("[MODULE] [USUARIOS] [SEARCH] Error: " + error);
        return returnRes("Erro ao atualizar usuário", 500, res);
    }
};

export default searchUsuarioModule;
