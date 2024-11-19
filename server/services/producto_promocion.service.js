import productPromotion from "../models/producto_promocion.model.js";
import products from "../models/productos.model.js";
import promotions from "../models/promociones.model.js";
import removeImage from "../utils/removeImage.js";

/**
 * @module producto_promocion
 * @memberof module:Services
 */

/**
 * Función para obtener todos los registros de la tabla `producto_promocion`. Si la operación es éxitosa devielve los registros y si
 * falla muestra el error en la consola y lanza un error.
 * @function
 * @async
 * @returns {Promise<Array<Object>>} Retorna un array de objetos si la operación es éxitosa.
 * @throws {Error} Lanza un error si ocurre un problema durante la consulta a la base de datos.
 */
export const getAllPP = async () => {
    try {
        const allPP = await productPromotion.findAll({
            attributes: ["productoPromo_Id", "promocion_Id", "producto_Id"],
            include: [
                { model: products, as: "productoPromocion", attributes: ["nombre"] },
                { model: promotions, as: "promocionProducto", attributes: ["nombre", "tipo"] }
            ],
            order: [["productoPromo_Id", "ASC"]]
        });
        return allPP;
    } catch (error) {
        console.error(error);
        throw new Error('Internal Server Error');
    }
}

/**
 * Función para obtener un registro de la tabla `producto_promocion` en base a `productoPromo_Id`. Si la operación es éxitosa
 * devuelve un objeto y si falla muestra el error en la consola y lanza un error.
 * @function
 * @async
 * @param {Number} id Identificador de registro de la tabla `producto_promocion`
 * @returns {Promise<Object | null>} Retorna el objeto encontrado con su información en caso de existir, en caso contrario
 * regresa null.
 * @throws {Error} Lanza un error si ocurre un problema durante la consulta a la base de datos.
 */
export const getPPsByIdsService = async (ids) => {
    try {
        const pps = await productPromotion.findAll(ids, {
            where: { promocion_Id: ids },
            attributes: ["productoPromo_Id", "promocion_Id", "producto_Id"],
            include: [
                { model: products, as: "productoPromocion", attributes: ["nombre"] },
                { model: promotions, as: "promocionProducto", attributes: ["nombre"] }
            ]
        });
        return pps;
    } catch (error) {
        console.error(error);
        throw new Error('Internal Server Error');
    }
}

/**
 * Función para crear multiples registros de `producto_promocion`. Si la operación es éxitosa devuelve los registros creados
 * y si falla muestra el error en la consola y lanza un error.
 * @function
 * @async
 * @param {Array<Object>} data Información de los registros a crear
 * @returns {Promise<Array<Object>>} Retorna un array con los registros creados en forma de objetos.
 * @throws {Error} Lanza un error si ocurre un problema durante la consulta a la base de datos.
 */
export const createPP = async (data) => {
    try {
        console.log("Post creado")
        console.log(data);
        const newPP = await productPromotion.bulkCreate(data);
        console.log(newPP);
        return newPP;
    } catch (error) {
        console.error(error);
        throw new Error('Internal Server Error');
    }
}

/**
 * Función para actualizar un registro de `producto_promocion` en base a `productoPromo_Id`. Si la operación es éxitosa retorna 
 * un array de números que indica la cantidad de filas afectadas y si falla muestra el error en la consola y lanza un error.
 * @function
 * @async
 * @param {Number} id Identificador del registro de la tabla `producto_promocion`
 * @param {Object} data Nueva información del registro.
 * @returns {Promise<Array<Number> | null>} Retorna un array de números con la cantidad de filas afectadas por la ejecución de la operación
 * o null si el registro no existe.
 * @throws {Error} Lanza un error si ocurre un problema durante la consulta a la base de datos.
 */
export const updatePP = async (id, data) => {
    try {
        const pp = await productPromotion.findByPk(id);

        if (!pp) {
            return null;
        }
        const updatedPP = await productPromotion.update(data, { where: { productoPromo_Id: id } });
        return updatedPP;
    } catch (error) {
        console.error(error);
        throw new Error('Internal Server Error');
    }
}

/**
 * Función para la eliminación de multiples registros de la tabla `producto_promocion`. Si la operación es exitosa retorna la cantidad
 * de registros eliminados y si falla muestra el error en consola y lanza un error.
 * @function
 * @async
 * @param {Array<Number>} ids Lista de los registros a eliminar
 * @returns {Promise<Array<Number>>} Retorna la cantidad de registros eliminados.
 * @throws {Error} Lanza un error si ocurre un problema durante la consulta a la base de datos.
 */
export const deletePP = async (ids) => {
    try {
        const pps = await productPromotion.findAll({ where: { productoPromo_Id: ids } });
        pps.forEach(pp => {
            removeImage(pp.imagen)
        })

        const deletedPP = await productPromotion.destroy({ where: { productoPromo_Id: ids } });
        return deletedPP;
    } catch (error) {
        console.error(error);
        throw new Error('Internal Server Error');
    }
}