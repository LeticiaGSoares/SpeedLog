import createToken from "../../../helpers/usuarios/create-token.js";
import returnRes from "../../../helpers/returnRes.js";
import Usuario, { typeOfUsers } from "../../../models/Usuario.js";

const loginUsuarioModule = async (usuario, res) => {
    console.log(usuario)
    try {

        if (usuario.papel == typeOfUsers.cliente && usuario.cpf == undefined || usuario.papel == typeOfUsers.administrador && usuario.cpf == undefined) {
            const usuarioInfo = await Usuario.findOne({ where: { email: usuario.email } })

            if (!usuarioInfo) {
                return returnRes("Usuario não encontrada", 404, res);
            }
            
            if (usuario.senha !== usuarioInfo.senha) {
                return returnRes("Senhas não coincidem", 500, res);
            }
        } else if (usuario.papel == typeOfUsers.motoboy && usuario.cpf != undefined) {
            const usuarioInfo = await Usuario.findOne({ where: { cpf: usuario.cpf } })

            if (!usuarioInfo) {
                return returnRes("Usuario não encontrada", 404, res);
            }
            
            if (usuario.senha !== usuarioInfo.senha) {
                return returnRes("Senhas não coincidem", 500, res);
            }
        }
        
        const createdToken = await createToken(usuario, res)

        if (!createToken) {
            return returnRes("Error na criação do token", 500, res);
        }

        return returnRes(createdToken, 200, res);
    } catch (error) {
        console.error("[MODULE] [USUARIOS] [LOGIN] Error: " + error);
        return returnRes("Erro ao realizar login do usuário", 500, res);
    }
};

export default loginUsuarioModule;
