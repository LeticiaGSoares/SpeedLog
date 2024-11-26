import returnRes from "../../../helpers/returnRes.js";

const searchUsuarioModule = async (res) => {
    try {
        req.headers['authorization'] = '';

        return returnRes("Logout realizado com sucesso", 200, res);
    } catch (error) {
        console.error("[MODULE] [USUARIOS] [SEARCH] Error: " + error);
        return returnRes("Erro ao realizar logout usuário", 500, res);
    }
};

export default searchUsuarioModule;
