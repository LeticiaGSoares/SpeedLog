import returnRes from "../../helpers/returnRes.js";
import searchUsuarioModule from "./modules/search.js";

const searchUsuario = async (req, res) => {
    const { id } = req.params  
    console.log(id)
    try {
        return await searchUsuarioModule(id, res)
    } catch (error) {
        console.error("[CONTROLLER] [USUARIOS] [SEARCH] Error: " + error);
        return returnRes("Erro ao pesquisar usuário", 500, res);
    }
};

export default searchUsuario;
