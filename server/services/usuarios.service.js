import users from "../models/usuarios.model.js";
import removeImage from "../utils/removeImage.js";

/**
 * @module Services
 */

/**
 * @module usuarios
 * @memberof module:Services
 */

/**
 * @async
 * @function¿
 * @param {Object} data - Los datos del nuevo usuario.
 * @returns {Promise<Object>} - El usuario creado.
 * @throws {Error} - Lanza un error si ocurre un problema interno del servidor.
 */
export const createUsuario = async (data) => {
    try {
        return await users.create(data);
    } catch (error) {
        console.error(error);
        throw new Error('Internal Server Error');
    }
};

/**
 * Obtiene todos los usuarios de la base de datos.
 *
 * @async
 * @function 
 * @returns {Promise<Array<Object>>} - Lista de todos los usuarios.
 * @throws {Error} - Lanza un error si ocurre un problema interno del servidor.
 */
export const getAllUsuarios = async () => {
    try {
        return await users.findAll();
    } catch (error) {
        console.error(error);
        throw new Error('Internal Server Error');
    }
};

/**
 * Obtiene un usuario por su ID.
 *
 * @async
 * @function 
 * @param {number} id - El ID del usuario.
 * @returns {Promise<Object|null>} - El usuario con el ID especificado o `null` si no existe.
 * @throws {Error} - Lanza un error si ocurre un problema interno del servidor.
 */
export const getUsuarioById = async (id) => {
    try {
        return await users.findByPk(id);
    } catch (error) {
        console.error(error);
        throw new Error('Internal Server Error');
    }
};

/**
 * Actualiza un usuario en la base de datos.
 *
 * @async
 * @function 
 * @param {number} id - El ID del usuario a actualizar.
 * @param {Object} data - Los datos actualizados del usuario.
 * @returns {Promise<[number, Array<Object>]>} - Información sobre la actualización realizada.
 * @throws {Error} - Lanza un error si el usuario no se encuentra o si ocurre un problema interno del servidor.
 */
export const updateUsuario = async (id, data) => {
    try {
        const usuario = await users.findByPk(id);
        if (!usuario) {
            throw new Error('Usuario no encontrado');
        }
        const updatedUser = await users.update(data, { where: { usuario_Id: id } });
        return updatedUser;
    } catch (error) {
        console.error(error);
        throw new Error('Internal Server Error');
    }
};

/**
 * Elimina uno o más usuarios de la base de datos.
 *
 * @async
 * @function 
 * @param {number|Array<number>} ids - El ID o los IDs de los usuarios a eliminar.
 * @returns {Promise<number>} - Número de usuarios eliminados.
 * @throws {Error} - Lanza un error si ocurre un problema interno del servidor.
 */
export const deleteUsuario = async (ids) => {
    try {
        const user = await users.findAll({ where: { usuario_Id: ids } });
        user.forEach(obj => {
            removeImage(obj.imagen);
        });
        const userDeleted = await users.destroy({ where: { usuario_Id: ids } });
        return userDeleted;
    } catch (error) {
        console.error(error);
        throw new Error("Internal server error");
    }
};
