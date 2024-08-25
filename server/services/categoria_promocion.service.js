import categoryPromotion from "../models/categoria_promocion.model.js";
import categories from "../models/categorias.model.js";
import promotions from "../models/promociones.model.js";
import removeImage from "../utils/removeImage.js";

/**
 * @module Services
 */

/**
 * @module categoria_promocion
 * @memberof module:Services
 */

/**
 * Función para obtener todos los registros de la tabla `categoria_promocion`. Si la operación es éxitosa devielve los registros y si
 * falla muestra el error en la consola y lanza un error.
 * @function
 * @async
 * @returns {Promise<Array<Object>>} Retorna un array de objetos si la operación es éxitosa.
 * @throws {Error} Lanza un error si ocurre un problema durante la consulta a la base de datos.
 */
export const getAllCP = async () => {
    try {
        const allCP = await categoryPromotion.findAll({
            attributes: ["categoriaPromo_Id", "categoria_Id", "promocion_Id"],
            include: [
                { model: categories, as: "categoriaPromocion", attributes: ["nombre"] },
                { model: promotions, as: "promocionCategoria", attributes: ["nombre"] }
            ],
            order: [["categoriaPromo_Id", "ASC"]]
        });
        return allCP;
    } catch (error) {
        console.error(error);
        throw new Error('Internal Server Error');
    }
}

/**
 * Función para obtener un registro de la tabla `categoria_promocion` en base a `categoriaPromo_Id`. Si la operación es éxitosa
 * devuelve un objeto y si falla muestra el error en la consola y lanza un error.
 * @function
 * @async
 * @param {Number} id Identificador de registro de la tabla `categoria_promocion`
 * @returns {Promise<Object | null>} Retorna el objeto encontrado con su información en caso de existir, en caso contrario
 * regresa null.
 * @throws {Error} Lanza un error si ocurre un problema durante la consulta a la base de datos.
*/
export const getCPServices = async (id) => {
    try {
        const cp = await categoryPromotion.findByPk(id, {
            attributes: ["categoriaPromo_Id", "categoria_Id", "promocion_Id"],
            include: [
                { model: categories, as: "categoriaPromocion", attributes: ["nombre"] },
                { model: promotions, as: "promocionCategoria", attributes: ["nombre"] }
            ]
        });
        return cp;
    } catch (error) {
        console.error(error);
        throw new Error('Internal Server Error');
    }
}

/**
 * Función para crear multiples registros de `categoria_promocion`. Si la operación es éxitosa devuelve los registros creados
 * y si falla muestra el error en la consola y lanza un error.
 * @function
 * @async
 * @param {Array<Object>} data Información de los registros a crear
 * @returns {Promise<Array<Object>>} Retorna un array con los registros creados en forma de objetos.
 * @throws {Error} Lanza un error si ocurre un problema durante la consulta a la base de datos.
 */
export const createCP = async (data) => {
    try {
        const newCP = await categoryPromotion.create(data);
        return newCP;
    } catch (error) {
        console.error(error);
        throw new Error('Internal Server Error');
    }
}

/**
 * Función para actualizar un registro de `categoria_promocion` en base a `categoriaPromo_Id`. Si la operación es éxitosa retorna 
 * un array de números que indica la cantidad de filas afectadas y si falla muestra el error en la consola y lanza un error.
 * @function
 * @async
 * @param {Number} id Identificador del registro de la tabla `categoria_promocion`
 * @param {Object} data Nueva información del registro.
 * @returns {Promise<Array<Number> | null>} Retorna un array de números con la cantidad de filas afectadas por la ejecución de la operación
 * o null si el registro no existe.
 * @throws {Error} Lanza un error si ocurre un problema durante la consulta a la base de datos.
 */
export const updateCP = async (id, data) => {
    try {
        const cp = await categoryPromotion.findByPk(id);

        if (!cp) {
            return null;
        }

        const updatedCP = await categoryPromotion.update(data, { where: { categoriaPromo_Id: id } });
        return updatedCP;
    } catch (error) {
        console.error(error);
        throw new Error('Internal Server Error');
    }
}

/**
 * Función para la eliminación de multiples registros de la tabla `categoria_promocion`. Si la operación es exitosa retorna la cantidad
 * de registros eliminados y si falla muestra el error en consola y lanza un error.
 * @function
 * @async
 * @param {Array<Number>} ids Lista de los registros a eliminar
 * @returns {Promise<Array<Number>>} Retorna la cantidad de registros eliminados.
 * @throws {Error} Lanza un error si ocurre un problema durante la consulta a la base de datos.
 */
export const deleteCP = async (ids) => {
    try {
        const cps = await categoryPromotion.findAll({ where: { categoriaPromo_Id: ids } });
        cps.forEach(cp => {
            removeImage(cp.imagen)
        })

        const cpDeleted = await categoryPromotion.destroy({ where: { categoriaPromo_Id: ids } });
        return cpDeleted;
    } catch (error) {
        console.error(error);
        throw new Error('Internal Server Error');
    }
}