import { where } from "sequelize";
import affiliates from "../models/afiliados.model.js";

/**
 * @module Services
 */

/**
 * @module afiliados
 * @memberof module:Services
 */

/**
 * @function
 * @param {Object} data - Los datos del nuevo afiliado.
 * @returns {Promise<Object>} - El afiliado creado.
 * @throws {Error} - Lanza un error si ocurre un problema interno del servidor.
 */ 
export const createAfiliado = async (data) => {
    try {
        return await affiliates.create(data);
    } catch (error) {
        console.error(error);
        throw new Error('Internal Server Error');
    }
};

/**
 * Obtiene todos los afiliados de la base de datos.
 *
 * @async
 * @function 
 * @returns {Promise<Array<Object>>} - Lista de todos los afiliados.
 * @throws {Error} - Lanza un error si ocurre un problema interno del servidor.
 */
export const getAllAfiliados = async () => {
    try {
        return await affiliates.findAll();
    } catch (error) {
        console.error(error);
        throw new Error('Internal Server Error');
    }
};

/**
 * Obtiene un afiliado por su ID.
 *
 * @async
 * @function 
 * @param {number} id - El ID del afiliado.
 * @returns {Promise<Object|null>} - El afiliado con el ID especificado o `null` si no existe.
 * @throws {Error} - Lanza un error si ocurre un problema interno del servidor.
 */
export const getAfiliadoById = async (id) => {
    try {
        return await affiliates.findByPk(id);
    } catch (error) {
        console.error(error);
        throw new Error('Internal Server Error');
    }
};

/**
 * Actualiza un afiliado en la base de datos.
 *
 * @async
 * @function 
 * @param {number} id - El ID del afiliado a actualizar.
 * @param {Object} data - Los datos actualizados del afiliado.
 * @returns {Promise<Object|null>} - El afiliado actualizado o `null` si el afiliado no existe.
 * @throws {Error} - Lanza un error si ocurre un problema interno del servidor.
 */
export const updateAfiliado = async (id, data) => {
    try {
        const afiliado = await affiliates.findByPk(id);
        if (!afiliado) {
            return null;
        }

        const updatedAfiliado = await affiliates.update(data, {
            where: { afiliado_Id: id }
        });

        return updatedAfiliado;
    } catch (error) {
        console.error(error);
        throw new Error('Internal Server Error');
    }
};

/**
 * Elimina uno o más afiliados de la base de datos.
 *
 * @async
 * @function 
 * @param {number|Array<number>} ids - El ID o los IDs de los afiliados a eliminar.
 * @returns {Promise<number>} - Número de afiliados eliminados.
 * @throws {Error} - Lanza un error si ocurre un problema interno del servidor.
 */
export const deleteAfiliado = async (ids) => {
    try {
        const deletedAfiliado = await affiliates.destroy({ where: { afiliado_Id: ids } });
        return deletedAfiliado;
    } catch (error) {
        console.error(error);
        throw new Error('Internal Server Error');
    }
};
