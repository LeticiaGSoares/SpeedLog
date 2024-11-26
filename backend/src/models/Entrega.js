import conn from "../config/conn.js";
import { DataTypes } from "sequelize";

const mysqlTable = "entregas";

export const typeStatus = {
    cancelado: "cancelado",
    agendado: "agendado",
    finalizado: "finalizado",
    em_andamento: "em_andamento"
}

const Entrega = conn.define(
    mysqlTable,
    {
        entrega_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            required: true,
        },
        cep_origem: {
            type: DataTypes.STRING,
            required: true,
            allowNull: false,
        },
        cep_destino: {
            type: DataTypes.STRING,
            required: true,
            allowNull: false,
        },
        numero_origem: {
            type: DataTypes.STRING,
            required: true,
            allowNull: false,
        },
        numero_destino: {
            type: DataTypes.STRING,
            required: true,
            allowNull: false,
        },
        complemento_origem: {
            type: DataTypes.STRING,
            required: true,
            allowNull: false,
        },
        complemento_destino: {
            type: DataTypes.STRING,
            required: true,
            allowNull: false,
        },
        peso_produto: {
            type: DataTypes.STRING,
            required: true,
            allowNull: false,
        },
        usuario_id: {
            type: DataTypes.STRING,
            required: true,
            allowNull: false,
        },
        motoboy_id: {
            type: DataTypes.STRING,
            required: true,
            allowNull: false,
        },
        hora_saida: {
            type: DataTypes.STRING,
            required: true,
            allowNull: false,
        },
        hora_chegada: {
            type: DataTypes.STRING,
            required: true,
            allowNull: false,
        },
        pagamento: {
            type: DataTypes.STRING,
            required: true,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM,
            values: [typeStatus.agendado, typeStatus.cancelado, typeStatus.finalizado, typeStatus.em_andamento],
            required: true,
            allowNull: false
        },
    },
    {
        tableName: mysqlTable,
    }
);

export default Entrega;
