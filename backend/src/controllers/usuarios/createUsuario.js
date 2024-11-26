import returnRes from "../../helpers/returnRes.js";
import createUsuarioModule from "./modules/create.js";
import { typeOfUsers } from "../../models/Usuario.js";

const createUsuario = async (req, res) => {
  let papel;

  if (req.url.includes("admin")) {
    papel = typeOfUsers.administrador;
  } else if (req.url.includes("cliente")) {
    papel = typeOfUsers.cliente;
  } else if (req.url.includes("motoboy")) {
    papel = typeOfUsers.motoboy;
  }

  try {
    if (papel == typeOfUsers.cliente) {
      const { nome, email, senha, data_nascimento, telefone, cidade } =
        req.body;
      
      const avaliacao = 4;

      const cliente = {
        nome,
        email,
        senha,
        data_nascimento,
        telefone,
        cidade,
        avaliacao,
        papel: papel,
      };

      return await createUsuarioModule(typeOfUsers.cliente, cliente, res);
    }

    if (papel == typeOfUsers.motoboy) {
      const {
        nome,
        email,
        senha,
        data_nascimento,
        cnh,
        cpf,
        moto_placa,
        moto_modelo,
      } = req.body;

      const disponivel = true;
      const avaliacao = 4;

      const motoboy = {
        nome,
        email,
        senha,
        data_nascimento,
        cnh,
        avaliacao,
        cpf,
        moto_placa,
        moto_modelo,
        disponivel,
        papel: papel,
      };

      return await createUsuarioModule(typeOfUsers.motoboy, motoboy, res);
    }

    if (papel == typeOfUsers.administrador) {
      const { nome, email, senha } = req.body;

      const administrador = {
        nome,
        email,
        senha,
        papel: papel,
      };

      return await createUsuarioModule(
        typeOfUsers.administrador,
        administrador,
        res
      );
    }
  } catch (error) {
    console.error("[CONTROLLER] [USUARIOS] [CREATE] Error: " + error);
    return returnRes("Erro ao criar usuário", 500, res);
  }
};

export default createUsuario;
