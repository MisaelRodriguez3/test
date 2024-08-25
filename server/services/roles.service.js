import roles from "../models/roles.model.js";

/**
 * Obtiene todos los roles de la base de datos.
 * 
 * @returns {Promise<Array>} Una lista de todos los roles.
 * @throws {Error} Si ocurre un error durante la consulta.
 */
export const getAllRoles = async() => {
    try {
        const allRoles = await roles.findAll({
            order: [
                ["rol_Id", "ASC"]
            ]
        });
        return allRoles;
    } catch (error) {
        console.error(error);
        throw new Error("internal server error");
    }
}

/**
 * Obtiene un rol por su ID.
 * 
 * @param {number} id - ID del rol.
 * @returns {Promise<Object|null>} El rol encontrado o null si no existe.
 * @throws {Error} Si ocurre un error durante la consulta.
 */
export const getOneRol = async(id) => {
    try {
        const rol = await roles.findByPk(id, {
            order: [
                ["rol_Id", "ASC"]
            ]
        });
        return rol;
    } catch (error) {
        console.error(error);
        throw new Error("internal server error");
    }
}

/**
 * Crea un nuevo rol.
 * 
 * @param {Object} data - Datos del nuevo rol.
 * @returns {Promise<Object>} El rol creado.
 * @throws {Error} Si ocurre un error durante la creación.
 */
export const createRol = async(data) => {
    try {
        const newRol = await roles.create(data);
        return newRol;
    } catch (error) {
        console.error(error);
        throw new Error("internal server error");
    }
}

/**
 * Actualiza un rol existente.
 * 
 * @param {number} id - ID del rol a actualizar.
 * @param {Object} data - Nuevos datos del rol.
 * @returns {Promise<number>} El número de roles actualizados.
 * @throws {Error} Si ocurre un error durante la actualización.
 */
export const updateRol = async(id, data) => {
    try {
        const rol = await roles.update(data, { where: { rol_Id: id } });
        return rol;
    } catch (error) {
        console.error(error);
        throw new Error("internal server error");
    }
}

/**
 * Elimina uno o más roles.
 * 
 * @param {Array<number>} ids - IDs de los roles a eliminar.
 * @returns {Promise<number>} El número de roles eliminados.
 * @throws {Error} Si ocurre un error durante la eliminación.
 */
export const deleteRol = async(ids) => {
    try {
        const rol = await roles.destroy({ where: { rol_Id: ids } });
        return rol;
    } catch (error) {
        console.error(error);
        throw new Error("internal server error");
    }
}