import returnRes from "../../helpers/returnRes.js";
import updateUsuarioModule from "./modules/update.js";

const updateUsuario = async (req, res) => {
    const { id } = req.params
    try {
        const {
            nome,
            email,
            senha,
            data_nascimento,
            telefone,
            cidade,
            cnh,
            cpf,
            moto_placa,
            moto_modelo,
            avaliacao
        } = req.body;

        const foto = req.files?.foto ? req.files.foto[0].path : null;

        const cliente = {
            nome,
            email,
            senha,
            foto,
            data_nascimento,
            telefone,
            cidade,
            avaliacao,
            cnh,
            cpf,
            moto_placa,
            moto_modelo
        };

        return await updateUsuarioModule(id, cliente, res);
    } catch (error) {
        console.error("[CONTROLLER] [USUARIOS] [UPDATE] Error: " + error);
        return returnRes("Erro ao atualizar usuário", 500, res);
    }
};

export default updateUsuario;
