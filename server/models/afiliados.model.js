import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

/**
 * Modelo de afiliados para la base de datos.
 * @typedef {Object} afiliados
 * @constant {Model} affiliates
 * @property {number} afiliado_Id - Identificador único del afiliado (clave primaria, autoincremental).
 * @property {string} [nombre_empresa] - Nombre de la empresa del afiliado.
 * @property {string} [nombre_persona] - Nombre de la persona del afiliado.
 * @property {string} email - Correo electrónico del afiliado (no nulo).
 * @property {string} telefono - Número de teléfono del afiliado (no nulo).
 * @property {string} direccion - Dirección del afiliado (no nula).
 * @property {Date} [birthday] - Fecha de nacimiento del afiliado.
 * @property {number} [descuento_porcentaje] - Porcentaje de descuento aplicado al afiliado.
 * @memberof module:Models  
 * @typedef {Object} afiliados
 * @example
 * // Ejemplo de uso:
 * // const newAfiliado = await affiliates.create({
 * //   nombre_empresa: "Empresa X",
 * //   nombre_persona: "Juan Pérez",
 * //   email: "juan.perez@example.com",
 * //   telefono: "123456789",
 * //   direccion: "Calle Falsa 123",
 * //   birthday: "1980-01-01",
 * //   descuento_porcentaje: 10.0
 * // });
 * 
 * // Ejemplo de consulta:
 * // const afiliado = await affiliates.findByPk(1);
 * // console.log(afiliado);
 */
const affiliates = sequelize.define("afiliados", {
    afiliado_Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_empresa: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    nombre_persona: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    telefono: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    direccion: {
        type: DataTypes.STRING(500),
        allowNull: false
    },
    birthday: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    descuento_porcentaje: {
        type: DataTypes.FLOAT,
        allowNull: true
    }
});

// Sincronización del modelo con la base de datos
await affiliates.sync();

export default affiliates;
