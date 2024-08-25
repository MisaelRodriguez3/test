import saleDetails from "../models/detallesVenta.model.js";
import sales from "../models/ventas.model.js";
import users from "../models/usuarios.model.js";
import affiliates from "../models/afiliados.model.js";
import products from "../models/productos.model.js";
import categories from "../models/categorias.model.js";

/**
 * @module Services
 */

/**
 * @module detallesVenta
 * @memberof module:Services
 */

/**
 * @async
 * @function 
 * @param {Object} data - Los datos del nuevo detalle de venta.
 * @returns {Promise<Object>} - El detalle de venta creado.
 * @throws {Error} - Lanza un error si ocurre un problema interno del servidor.
 */
export const createDetallesVenta = async (data) => {
    try {
        return await saleDetails.create(data);
    } catch (error) {
        console.error(error);
        throw new Error('Internal Server Error');
    }
};

/**
 * Obtiene un detalle de venta por su ID.
 *
 * @async
 * @function 
 * @param {number} id - El ID del detalle de venta.
 * @returns {Promise<Object|null>} - El detalle de venta con el ID especificado o `null` si no existe.
 * @throws {Error} - Lanza un error si ocurre un problema interno del servidor.
 */
export const getDetallesVentaById = async (id) => {
    try {
        return await saleDetails.findByPk(id, {
            attributes: { exclude: ["venta_Id", "producto_Id"] },
            include: [
                {
                    model: sales, attributes: ["facturado", "total", "fecha"],
                    include: [
                        { model: users, attributes: ["nombre", "correo"] },
                        { model: affiliates, attributes: ["nombre_empresa", "nombre_persona", "email"] }
                    ]
                }
            ]
        });
    } catch (error) {
        console.error(error);
        throw new Error('Internal Server Error');
    }
};

/**
 * Actualiza un detalle de venta en la base de datos.
 *
 * @async
 * @function
 * @param {number} id - El ID del detalle de venta a actualizar.
 * @param {Object} data - Los datos actualizados del detalle de venta.
 * @returns {Promise<Object|null>} - El detalle de venta actualizado o `null` si el detalle no existe.
 * @throws {Error} - Lanza un error si ocurre un problema interno del servidor.
 */
export const updateDetallesVenta = async (id, data) => {
    try {
        const updetventa = await saleDetails.findByPk(id);

        if (!updetventa) {
            return null;
        }

        const updatedCategory = await saleDetails.update(data, { where: { detallesVenta_Id: id } });
        return updatedCategory;
    } catch (error) {
        console.error(error);
        throw new Error('Internal Server Error');
    }
};

/**
 * Elimina uno o más detalles de venta de la base de datos.
 *
 * @async
 * @function 
 * @param {number|Array<number>} ids - El ID o los IDs de los detalles de venta a eliminar.
 * @returns {Promise<number>} - Número de detalles de venta eliminados.
 * @throws {Error} - Lanza un error si ocurre un problema interno del servidor.
 */
export const deleteDetallesVenta = async (ids) => {
    try {
        const rowsDeleted = await saleDetails.destroy({ where: { detallesVenta_Id: ids } });
        return rowsDeleted;
    } catch (error) {
        console.error(error);
        throw new Error('Internal Server Error');
    }
};

/**
 * Obtiene todos los detalles de venta de la base de datos.
 *
 * @async
 * @function 
 * @returns {Promise<Array<Object>>} - Lista de todos los detalles de venta.
 * @throws {Error} - Lanza un error si ocurre un problema interno del servidor.
 */
export const getAllDetallesVenta = async () => {
    try {
        return await saleDetails.findAll({
            attributes: { exclude: ["venta_Id", "producto_Id"] },
            include: [
                {
                    model: sales, attributes: ["facturado", "total", "fecha"],
                    include: [
                        { model: users, attributes: ["nombre", "correo"] },
                        { model: affiliates, attributes: ["nombre_empresa", "nombre_persona", "email"] }
                    ]
                }, 
                {
                    model: products, attributes: ["nombre"],
                    include: [
                        { model: categories, attributes: ["nombre"] }
                    ]
                }
            ]
        });
    } catch (error) {
        console.error(error);
        throw new Error('Internal Server Error');
    }
};
