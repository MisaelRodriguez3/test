import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import sales from './ventas.model.js';
import products from './productos.model.js';

/**
 * Modelo de detalles de venta para la base de datos.
 * 
 * @constant {Model} saleDetails
 * @property {number} detallesVenta_Id - Identificador único del detalle de venta (clave primaria, autoincremental).
 * @property {number} venta_Id - Identificador de la venta asociada (clave foránea).
 * @property {number} producto_Id - Identificador del producto asociado (clave foránea).
 * @property {number} cantidad - Cantidad del producto en la venta.
 * @property {number} precio - Precio del producto en la venta.
 * @memberof module:Models  
 * @typedef {Object} detallesVenta
 * @example
 * // Ejemplo de uso:
 * // const newDetail = await saleDetails.create({
 * //   venta_Id: 1,
 * //   producto_Id: 2,
 * //   cantidad: 5,
 * //   precio: 100.00
 * // });
 * 
 * // Ejemplo de consulta:
 * // const details = await saleDetails.findAll({
 * //   where: { venta_Id: 1 }
 * // });
 * // console.log(details);
 */
const saleDetails = sequelize.define("detallesVenta", {
    detallesVenta_Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    venta_Id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    producto_Id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    precio: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
});

// Definición de relaciones entre modelos
sales.hasMany(saleDetails, { foreignKey: "venta_Id" });
saleDetails.belongsTo(sales, { foreignKey: "venta_Id" });

products.hasMany(saleDetails, { foreignKey: "producto_Id" });
saleDetails.belongsTo(products, { foreignKey: "producto_Id" });

// Sincronización del modelo con la base de datos
await saleDetails.sync();

export default saleDetails;
