import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

/**
 * Modelo de usuarios para la base de datos.
 * 
 * @constant {Model} users
 * @property {number} usuario_Id - Identificador único del usuario (clave primaria, autoincremental).
 * @property {string} nombre - Nombre del usuario (no nulo).
 * @property {string} usuario - Nombre de usuario único (no nulo).
 * @property {string} correo - Correo electrónico único del usuario (no nulo).
 * @property {string} password - Contraseña del usuario (no nula).
 * @property {string} direccion - Dirección del usuario (no nula).
 * @property {Date} [birthday] - Fecha de nacimiento del usuario.
 * @property {string} [imagen] - URL o ruta de la imagen del usuario.
 *   @memberof module:Models  
 * @typedef {Object} usuarios
 * @example
 * // Ejemplo de uso:
 * // const newUser = await users.create({
 * //   nombre: "Juan Pérez",
 * //   usuario: "juanperez",
 * //   correo: "juan.perez@example.com",
 * //   password: "securepassword",
 * //   direccion: "Calle Ejemplo 456",
 * //   birthday: "1990-05-15",
 * //   imagen: "imagen.jpg"
 * // });
 * 
 * // Ejemplo de consulta:
 * // const user = await users.findByPk(1);
 * // console.log(user);
 */
const users = sequelize.define("usuarios", {
    usuario_Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    usuario: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    correo: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
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
    imagen: {
        type: DataTypes.STRING(100),
        allowNull: true
    }
});

// Sincronización del modelo con la base de datos
await users.sync();

export default users;
