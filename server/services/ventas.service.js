import sales from "../models/ventas.model.js";

/**
 * @module Services
 */

/**
 * @module ventas
 * @memberof module:Services
 */

/**
 * @async
 * @function 
 * @param {Object} data - Los datos de la nueva venta.
 * @returns {Promise<Object>} - La venta creada.
 * @throws {Error} - Lanza un error si ocurre un problema interno del servidor.
 */
export const createVenta = async (data) => {
    try {
        return await sales.create(data);
    } catch (error) {
        console.error(error);
        throw new Error('Internal Server Error');
    }
};

/**
 * Obtiene todas las ventas de la base de datos.
 *
 * @async
 * @function 
 * @returns {Promise<Array<Object>>} - Lista de todas las ventas.
 * @throws {Error} - Lanza un error si ocurre un problema interno del servidor.
 */
export const getAllVentas = async () => {
    try {
        return await sales.findAll();
    } catch (error) {
        console.error(error);
        throw new Error('Internal Server Error');
    }
};

/**
 * Obtiene una venta por su ID.
 *
 * @async
 * @function
 * @param {number} id - El ID de la venta.
 * @returns {Promise<Object|null>} - La venta con el ID especificado o `null` si no existe.
 * @throws {Error} - Lanza un error si ocurre un problema interno del servidor.
 */
export const getVentaById = async (id) => {
    try {
        return await sales.findByPk(id);
    } catch (error) {
        console.error(error);
        throw new Error('Internal Server Error');
    }
};

/**
 * Actualiza una venta en la base de datos.
 *
 * @async
 * @function 
 * @param {number} id - El ID de la venta a actualizar.
 * @param {Object} data - Los datos actualizados de la venta.
 * @returns {Promise<[number, Array<Object>]>} - Información sobre la actualización realizada.
 * @throws {Error} - Lanza un error si la venta no se encuentra o si ocurre un problema interno del servidor.
 */
export const updateVenta = async (id, data) => {
    try {
        const VentaUp = await sales.findByPk(id);

        if (!VentaUp) {
            return null;
        }

        const updateVenta = await sales.update(data, { where: { venta_Id: id } });
        return updateVenta;
    } catch (error) {
        console.error(error);
        throw new Error('Internal Server Error');
    }
};

/**
 * Elimina una o más ventas de la base de datos.
 *
 * @async
 * @function 
 * @param {number|Array<number>} ids - El ID o los IDs de las ventas a eliminar.
 * @returns {Promise<number>} - Número de ventas eliminadas.
 * @throws {Error} - Lanza un error si ocurre un problema interno del servidor.
 */
export const deleteVenta = async (ids) => {
    try {
        const deletedSale = await sales.destroy({ where: { venta_Id: ids } });
        return deletedSale;
    } catch (error) {
        console.error(error);
        throw new Error('Internal Server Error');
    }
};
