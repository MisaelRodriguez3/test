import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const roles = sequelize.define("roles", {
    rol_Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    rol: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
});

//await roles.sync({ alter: true })
await roles.sync()

export default roles;