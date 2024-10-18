import conn from '../config/conn.js'
import { DataTypes } from 'sequelize'

const table_mysql = "tarefas"

const Tarefa = conn.define
(table_mysql, {
    id: {
        type: DataTypes.UUID, 
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    tarefa: {
        type: DataTypes.STRING, 
        allowNull: false,
        required: true
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM,
        values: ["pendente", "concluida"]
    }
}, {
    tableName: table_mysql,
})

export default Tarefa;