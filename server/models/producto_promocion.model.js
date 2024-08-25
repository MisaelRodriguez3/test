import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";
import products from "./productos.model.js";
import promotions from "./promociones.model.js";

/**
 * Modelo de la tabla `producto_promocion`.
 * @typedef {Object} producto_promocion
 * @property {Number} productoPromo_Id Identificador del registro
 * @property {Number} producto_Id ID del producto al que se le va aplicar la promoción
 * @property {Number} promocion_Id ID de la promoción a aplicar
 * @property {String} imagen Ruta de la imagen relacionada al registro
 * @memberof module:Models  
 */

const productPromotion = sequelize.define("producto_promocion", {
    productoPromo_Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    producto_Id: {
        type: DataTypes.INTEGER,
        allowNull: false,

    },
    promocion_Id: {
        type: DataTypes.INTEGER,
        allowNull: false,

    },
    imagen: { type: DataTypes.STRING(100) }
});

promotions.hasMany(productPromotion, { foreignKey: "promocion_Id", as: "promocionProducto" });
productPromotion.belongsTo(promotions, { foreignKey: "promocion_Id", as: "promocionProducto" });

products.hasMany(productPromotion, { foreignKey: "producto_Id", as: "productoPromocion" });
productPromotion.belongsTo(products, { foreignKey: "producto_Id", as: "productoPromocion" });

//await productPromotion.sync({ alter: true })
await productPromotion.sync()

export default productPromotion;