import promotions from "../models/promociones.model.js"

/**
 * @module promociones
 * @memberof module:Services
 */

/**
 * Función para obtener todos los registros de la tabla `promociones`. Si la operación es éxitosa devielve los registros y si
 * falla muestra el error en la consola y lanza un error.
 * @function
 * @async
 * @returns {Promise<Array<Object>>} Retorna un array de objetos si la operación es éxitosa.
 * @throws {Error} Lanza un error si ocurre un problema durante la consulta a la base de datos.
 */
export const getAllPromotions = async () => {
    try {
        const allPromotions = await promotions.findAll({
            order: [["promocion_Id", "ASC"]]
        });
        return allPromotions;
    } catch (error) {
        console.error(error);
        throw new Error('Internal Server Error');
    }
}

/**
 * Función para obtener un registro de la tabla `promociones` en base a `promocion_Id`. Si la operación es éxitosa
 * devuelve un objeto y si falla muestra el error en la consola y lanza un error.
 * @function
 * @async
 * @param {Number} id Identificador de registro de la tabla `promociones`
 * @returns {Promise<Object | null>} Retorna el objeto encontrado con su información en caso de existir, en caso contrario
 * regresa null.
 * @throws {Error} Lanza un error si ocurre un problema durante la consulta a la base de datos.
 */
export const getOnePromotion = async (id) => {
    try {
        const promotion = await promotions.findByPk(id);
        return promotion;
        
    } catch (error) {
        console.error(error);
        throw new Error('Internal Server Error');
    }
}

/**
 * Función para crear un nuevo registro de `promociones`. Si la operación es éxitosa devuelve el registro creado
 * y si falla muestra el error en la consola y lanza un error.
 * @function
 * @async
 * @param {Object} data Información de los registros a crear
 * @returns {Promise<Object>} Retorna el registro creado como un objeto.
 * @throws {Error} Lanza un error si ocurre un problema durante la consulta a la base de datos.
 */
export const createPromotion = async (data) => {
    try {

        const newPromotion = await promotions.create(data);
        return newPromotion;
    } catch (error) {
        console.error(error);
        throw new Error('Internal Server Error');
    }
}

/**
 * Función para actualizar un registro de `promociones` en base a `promocion_Id`. Si la operación es éxitosa retorna 
 * un array de números que indica la cantidad de filas afectadas y si falla muestra el error en la consola y lanza un error.
 * @function
 * @async
 * @param {Number} id Identificador del registro de la tabla `promociones`
 * @param {Object} data Nueva información del registro.
 * @returns {Promise<Array<Number> | null>} Retorna un array de números con la cantidad de filas afectadas por la ejecución de la operación
 * o null si el registro no existe.
 * @throws {Error} Lanza un error si ocurre un problema durante la consulta a la base de datos.
 */
export const updatePromotion = async (id, data) => {
    try {
        const promotion = await promotions.findByPk(id);

        if (!promotion) {
            return null;
        }

        const updatedPromotion = await promotions.update(data, { where: { promocion_Id: id } });
        return updatedPromotion;
    } catch (error) {
        console.error(error);
        throw new Error('Internal Server Error');
    }
}

/**
 * Función para la eliminación de multiples registros de la tabla `promociones`. Si la operación es exitosa retorna la cantidad
 * de registros eliminados y si falla muestra el error en consola y lanza un error.
 * @function
 * @async
 * @param {Array<Number>} ids Lista de los registros a eliminar
 * @returns {Promise<Array<Number>>} Retorna la cantidad de registros eliminados.
 * @throws {Error} Lanza un error si ocurre un problema durante la consulta a la base de datos.
 */
export const deletePromotion = async (ids) => {
    try {
        const deletedPromotion = await promotions.destroy({ where: { promocion_Id: ids } });
        return deletedPromotion;
    } catch (error) {
        console.error(error);
        throw new Error('Internal Server Error');
    }
}