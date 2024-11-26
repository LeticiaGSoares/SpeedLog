import conn from "../config/conn.js";
import { DataTypes } from "sequelize";

const mysqlTable = "usuarios";

export const typeOfUsers = {
  administrador: "administrador",
  motoboy: "motoboy",
  cliente: "cliente"
}

const Usuario = conn.define(
  mysqlTable,
  {
    usuario_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      required: true,
    },
    nome: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false,
    },
    senha: {
      type: DataTypes.STRING,
      required: false,
      allowNull: true,
      defaultValue: null
    },
    foto: {
      type: DataTypes.STRING,
      required: false,
      allowNull: true
    },
    papel: {
      type: DataTypes.ENUM,
      values: [typeOfUsers.administrador, typeOfUsers.motoboy, typeOfUsers.cliente],
      required: true,
      allowNull: false
    },
    data_nascimento: {
      type: DataTypes.DATEONLY,
      required: false,
      allowNull: true,
      defaultValue: null
    },
    telefone: {
      type: DataTypes.STRING,
      required: false,
      allowNull: true,
      defaultValue: null      
    },
    cidade: {
      type: DataTypes.STRING,
      required: false,
      allowNull: true,
      defaultValue: null
    },
    avaliacao: {
      type: DataTypes.INTEGER,
      required: false,
      allowNull: true,
      defaultValue: null
    },
    disponivel: {
      type: DataTypes.BOOLEAN,
      required: true,
      allowNull: false,
      defaultValue: false
    },
    cpf: {
      type: DataTypes.STRING,
      required: false,
      allowNull: true,
      defaultValue: null
    },
    cnh: {
      type: DataTypes.STRING,
      required: false,
      allowNull: true,
      defaultValue: null
    },
    moto_placa: {
      type: DataTypes.STRING,
      required: false,
      allowNull: true,
      defaultValue: null
    },
    moto_modelo: {
      type: DataTypes.STRING,
      required: false,
      allowNull: true,
      defaultValue: null
    },
  },
  {
    tableName: mysqlTable,
  }
);

export default Usuario;
