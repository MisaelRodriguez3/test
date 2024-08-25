import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";
import categories from "./categorias.model.js";
import promotions from "./promociones.model.js";

/**
 * @module Models
 */

/**
 * Modelo de la tabla `categoria_promocion`.
 * @typedef {Object} categoria_promocion 
 * @property {Number} categoriaPromo_Id Identificador del registro
 * @property {Number} categoria_Id ID de la categoria a la que se aplica la promoción
 * @property {Number} promocion_Id ID de la promoción que se va a aplicar
 * @property {String} imagen Ruta de la imagen relacionada al registro.
 */

const categoryPromotion = sequelize.define("categoria_promocion", {
    categoriaPromo_Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    categoria_Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    promocion_Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    imagen: { type: DataTypes.STRING(100) }
});

promotions.hasMany(categoryPromotion, { foreignKey: "promocion_Id", as: "promocionCategoria" });
categoryPromotion.belongsTo(promotions, { foreignKey: "promocion_Id", as: "promocionCategoria" });

categories.hasMany(categoryPromotion, { foreignKey: "categoria_Id", as: "categoriaPromocion" });
categoryPromotion.belongsTo(categories, { foreignKey: "categoria_Id", as: "categoriaPromocion" });

//await categoryPromotion.sync({ alter: true })
await categoryPromotion.sync();

export default categoryPromotion;
