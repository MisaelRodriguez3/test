import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

/**
 * Modelo de la tabla `promociones`.
 * @typedef {Object} promociones
 * @property {Number} promocion_Id Identificador del registro
 * @property {String} nombre Nombre de la promoción
 * @property {String} tipo Tipo de promoción
 * @property {Number} [descuento] Porcentaje de decuento (`porcentaje_descuento`) o precio a reducir (`por_cada_x_te_descontamos_y`)
 * @property {Number} [comprar_cantidad] Cantidad a comprar para aplicar la promoción `compra_x_paga_y`
 * @property {Number} [pagar_cantidad] Cantidad a pagar en la promoción `compra_x_paga_y`
 * @property {Number} [por_cada] Cantidad de dinero a gastar para aplicar la promción `por_cada_x_te_descontamos_y`
 * @property {Date} fecha_inicio Fecha en la que inicia la promoción
 * @property {Date} fecha_fin Fecha en la que termina la promoción
 * @memberof module:Models
 */

const promotions = sequelize.define("promociones", {
    promocion_Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    tipo: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            isIn: {
                args: [['porcentaje_descuento', 'compra_x_paga_y', 'por_cada_x_te_descontamos_y']],
                msg: "El tipo debe ser uno de los siguientes: 'porcentaje_descuento', 'compra_x_paga_y', 'por_cada_x_te_descontamos_y'"
            }
        }
    },
    descuento: { type: DataTypes.DOUBLE }, // porcentaje de descuento (1) o el descuento por cada (3)
    comprar_cantidad: { type: DataTypes.INTEGER }, // (2) cantidad a comprar ej. 3 x 2 donde este campo es el 3
    pagar_cantidad: { type: DataTypes.INTEGER}, // (2) cantidad a pagar               donde este campo es el 2
    por_cada: { type: DataTypes.DOUBLE }, // cantidad a gastar para obtener descuento (3)
    fecha_inicio: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    fecha_fin: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
});

await promotions.sync({ alter: true })
//await promotions.sync()

export default promotions;