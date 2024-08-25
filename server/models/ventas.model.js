import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import affiliates from './afiliados.model.js';
import users from './usuarios.model.js';

/**
 * Modelo de ventas para la base de datos.
 * 
 * @constant {Model} sales
 * @property {number} venta_Id - Identificador único de la venta (clave primaria, autoincremental).
 * @property {number} [usuario_Id] - Identificador del usuario asociado (clave foránea).
 * @property {number} [afiliado_Id] - Identificador del afiliado asociado (clave foránea).
 * @property {boolean} [facturado] - Indica si la venta ha sido facturada.
 * @property {number} total - Monto total de la venta (no nulo).
 * @property {Date} fecha - Fecha de la venta. Por defecto, la fecha actual.
 *   @memberof module:Models  
 * @typedef {Object} ventas
 * @example
 * // Ejemplo de uso:
 * // const newSale = await sales.create({
 * //   usuario_Id: 1,
 * //   afiliado_Id: 2,
 * //   facturado: true,
 * //   total: 250.00,
 * //   fecha: "2024-08-10"
 * // });
 * 
 * // Ejemplo de consulta:
 * // const sale = await sales.findByPk(1);
 * // console.log(sale);
 */
const sales = sequelize.define("ventas", {
    venta_Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    usuario_Id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    afiliado_Id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    facturado: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    fecha: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW
    }
});

// Definición de relaciones entre modelos
users.hasMany(sales, { foreignKey: "usuario_Id" });
sales.belongsTo(users, { foreignKey: "usuario_Id" });

affiliates.hasMany(sales, { foreignKey: "afiliado_Id" });
sales.belongsTo(affiliates, { foreignKey: "afiliado_Id" });

// Sincronización del modelo con la base de datos
await sales.sync();

export default sales;
