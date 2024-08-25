import users from "../models/usuarios.model.js";
import affiliates from "../models/afiliados.model.js";

/**
 * @module utils
 */

/**
 * Obtiene la lista de correos electrónicos de todos los usuarios y afiliados.
 * Esta función consulta la base de datos para obtener todos los usuarios y afiliados,
 * y luego devuelve una lista combinada de sus correos electrónicos.
 * 
 * @async
 * @function
 * @returns {Promise<Array<String>>} Una promesa que resuelve en un array de correos electrónicos de usuarios y afiliados.
 */
async function recipents() {
    const usuarios = (await users.findAll()).map(user => user.correo);
    const afiliados = (await affiliates.findAll()).map(affilate => affilate.email);
    const all = [...usuarios, ...afiliados]
    return all;
}

export default recipents;