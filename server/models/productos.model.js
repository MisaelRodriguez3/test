import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";
import categories from "./categorias.model.js";

/**
 * Modelo de la tabla `productos`.
 * @typedef {Object} productos
 * @property {Number} producto_Id Identificador del registro
 * @property {String} nombre Nombre del producto
 * @property {String} descripcion Descripción del producto
 * @property {Number} precio Precio del producto
 * @property {Number} stock Cantidad disponible del producto
 * @property {String} imagen Ruta de la imagen del producto
 * @property {Number} categoria_Id ID de la categoría a la que pertence el producto
 * @property {Date} createdAt Fecha en la que se creo el registro
 * @memberof module:Models
 */

const products = sequelize.define("productos", {
    producto_Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING(500),
        allowNull: false
    },
    precio: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    imagen: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    categoria_Id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW
    }
});

categories.hasMany(products, { foreignKey: "categoria_Id" });
products.belongsTo(categories, { foreignKey: "categoria_Id" });

//await products.sync({ alter: true });
await products.sync();

export default products;