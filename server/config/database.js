import { configDotenv } from "dotenv";
import { Sequelize } from "sequelize"

configDotenv();

/**
 * @typedef {Object} SequelizeOptions
 * @property {string} dialect - El tipo de base de datos a utilizar, en este caso, PostgreSQL.
 * @property {Object} define - Configuración adicional para la definición de modelos.
 * @property {boolean} define.freezeTableName - Si es `true`, Sequelize no pluralizará los nombres de las tablas.
 * @property {boolean} define.timestamps - Si es `false`, Sequelize no agregará automáticamente las columnas `createdAt` y `updatedAt`.
 * @property {Object} pool - Configuración del pool de conexiones.
 * @property {number} pool.max - Número máximo de conexiones en el pool.
 * @property {number} pool.min - Número mínimo de conexiones en el pool.
 * @property {number} pool.idle - Tiempo máximo en milisegundos que una conexión puede estar inactiva antes de ser liberada.
 */

/**
 * Configuración de la conexión a la base de datos Sequelize.
 * @const
 * @type {SequelizeOptions}
 */
const options = {
    dialect: "postgres",
    define: {
        freezeTableName: true,
        timestamps: false
    },
    pool: {
        max: 10,
        min: 0,
        idle: 60 * 60 * 1000
    }
}

/**
 * @const
 * Instancia de Sequelize para la conexión a la base de datos.
 * 
 * Se crea una nueva instancia de Sequelize utilizando las variables de entorno para configurar la conexión.
 * Si `process.env.DATA_BASE_URL` está definida, se usa esa URL de conexión. De lo contrario, se utiliza
 * `DB_NAME`, `DB_USER` y `DB_PASSWORD` para configurar la conexión. y se incorpora `options` como configuración
 * 
 * @type {Sequelize}
 */
const sequelize = process.env.DATA_BASE_URL
    ? new Sequelize(process.env.DATA_BASE_URL, options)
    : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, options)

export default sequelize;