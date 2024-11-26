import returnRes from "../../../helpers/returnRes.js";
import Entrega from "../../../models/Entrega.js";

const createEntregaModule = async (entrega, res) => {
    try {
        const createdEntrega = await Entrega.create(entrega)

        if (!createdEntrega) {
            return returnRes("Não foi possível criar a entrega", 500, res);
        }

        return returnRes("Entrega criada com sucesso")
    } catch (error) {
        console.error("[MODULE] [ENTREGAS] [CREATE] Error: " + error);
        return returnRes("Erro ao criar entrega", 500, res);
    }
}

export default createEntregaModule