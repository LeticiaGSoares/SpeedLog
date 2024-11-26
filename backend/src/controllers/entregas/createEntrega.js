import returnRes from "../../helpers/returnRes.js";
import createEntregaModule from "./modules/create.js";

const createEntrega = async (req, res) => {

    try {
        const { cep_origem, cep_destino, numero_origem, numero_destino, complemento_origem, complemento_destino, peso_produto, usuario_id, motoboy_id, hora_saida, hora_chegada, status } =
            req.body;

        const entrega = {
            cep_origem,
            cep_destino,
            numero_origem,
            numero_destino,
            complemento_origem,
            complemento_destino,
            peso_produto,
            usuario_id,
            motoboy_id,
            hora_saida,
            hora_chegada,
            status
        };

        return await createEntregaModule(entrega, res);
    } catch (error) {
        console.error("[CONTROLLER] [ENTREGAS] [CREATE] Error: " + error);
        return returnRes("Erro ao criar entrega", 500, res);
    }
};

export default createEntrega;