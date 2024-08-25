import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

/**
 * Modelo de la tabla `categorias`.
 * @typedef {Object} categorias
 * @property {Number} categoria_Id Identificador del registro
 * @property {String} nombre Nombre de la categoría
 * @memberof module:Models
 */

const categories = sequelize.define("categorias", {
    categoria_Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
});

//await categories.sync({ alter: true })
await categories.sync()

export default categories;