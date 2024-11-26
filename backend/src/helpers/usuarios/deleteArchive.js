import fs from "node:fs/promises";

const deleteArchive = async (path) => {
    try {
        await fs.unlink(path);
    } catch (error) {
        console.error(`Erro ao deletar a foto, error: ${error}`);
    }
}

export default deleteArchive;
