import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";
import roles from "./roles.model.js";

/**
 * Definición del modelo de empleados.
 * 
 * @typedef {Object} Empleado
 * @property {number} empleado_Id - ID del empleado, clave primaria y autoincremental.
 * @property {string} nombre - Nombre del empleado.
 * @property {string} correo - Correo del empleado.
 * @property {string} password - Contraseña del empleado.
 * @property {string} imagen - URL de la imagen del empleado.
 * @property {number} rol_Id - ID del rol asignado al empleado.
 * @property {Date} fecha_registro - Fecha de registro del empleado.
 */
const empleados = sequelize.define("empleados", {
    empleado_Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    correo: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    imagen: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    rol_Id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fecha_registro: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW
    }
});

/**
 * Asociación entre el modelo de roles y empleados.
 * Un rol puede tener muchos empleados.
 */
roles.hasMany(empleados, { foreignKey: "rol_Id" });

/**
 * Asociación entre el modelo de empleados y roles.
 * Un empleado pertenece a un rol.
 */
empleados.belongsTo(roles, { foreignKey: "rol_Id" });

/**
 * Sincronización del modelo de empleados con la base de datos.
 * 
 * @returns {Promise<void>}
 */
await empleados.sync();

export default empleados;