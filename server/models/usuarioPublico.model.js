import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const publicUsers = sequelize.define("clientePublico", {
    usuarioPublico_Id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING(100)
    },
    correo: {
        type: DataTypes.STRING(100)
    },
    telefono: {
        type: DataTypes.STRING(15)
    }
});

await publicUsers.sync();

export default publicUsers;