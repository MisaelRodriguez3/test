import categories from "../models/categorias.model.js"

/**
 * @module categorias
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
export const getAllCategories = async () => {
    try {
        const allCategories = await categories.findAll({
            order: [["categoria_Id", "ASC"]]
        });
        return allCategories;
    } catch (error) {
        console.error(error);
        throw new Error('Internal Server Error');
    }
}

/**
 * Función para obtener un registro de la tabla `categorias` en base a `categoria_Id`. Si la operación es éxitosa
 * devuelve un objeto y si falla muestra el error en la consola y lanza un error.
 * @function
 * @async
 * @param {Number} id Identificador de registro de la tabla `categorias`
 * @returns {Promise<Object | null>} Retorna el objeto encontrado con su información en caso de existir, en caso contrario
 * regresa null.
 * @throws {Error} Lanza un error si ocurre un problema durante la consulta a la base de datos.
 */
export const getOneCategory = async (id) => {
    try {
        const category = await categories.findByPk(id);
        return category;
    } catch (error) {
        console.error(error);
        throw new Error('Internal Server Error');
    }
}

/**
 * Función para crear un nuevo registro de `categorias`. Si la operación es éxitosa devuelve el registro creado
 * y si falla muestra el error en la consola y lanza un error.
 * @function
 * @async
 * @param {Object} data Información del nuevo registro
 * @returns {Promise<Object>} Retorna el registro creado como un objeto.
 * @throws {Error} Lanza un error si ocurre un problema durante la consulta a la base de datos.
 */
export const createCategory = async (data) => {
    try {
        const newcategory = await categories.create(data);
        return newcategory;
    } catch (error) {
        console.error(error);
        throw new Error('Internal Server Error');
    }
}

/**
 * Función para actualizar un registro de `categorias` en base a `categoria_Id`. Si la operación es éxitosa retorna 
 * un array de números que indica la cantidad de filas afectadas y si falla muestra el error en la consola y lanza un error.
 * @function
 * @async
 * @param {Number} id Identificador del registro de la tabla `categoria_promocion`
 * @param {Object} data Nueva información del registro.
 * @returns {Promise<Array<Number> | null>} Retorna un array de números con la cantidad de filas afectadas por la ejecución de la operación o null 
 * si el registro no existe.
 * @throws {Error} Lanza un error si ocurre un problema durante la consulta a la base de datos.
 */
export const updateCategory = async (id, data) => {
    try {
        const category = await categories.findByPk(id);

        if (!category) {
            return null;
        }

        const updatedCategory = await categories.update(data, { where: { categoria_Id: id } });
        return updatedCategory;
    } catch (error) {
        console.error(error);
        throw new Error('Internal Server Error');
    }
}

/**
 * Función para la eliminación de multiples registros de la tabla `categorias`. Si la operación es exitosa retorna la cantidad
 * de registros eliminados y si falla muestra el error en consola y lanza un error.
 * @function
 * @async
 * @param {Array<Number>} ids Lista de los registros a eliminar
 * @returns {Promise<Array<Number>>} Retorna la cantidad de registros eliminados .
 * @throws {Error} Lanza un error si ocurre un problema durante la consulta a la base de datos.
 */
export const deleteCategory = async (ids) => {
    try {
        const deletedCategory = await categories.destroy({ where: { categoria_Id: ids } })
        return deletedCategory;
    } catch (error) {
        console.error(error);
        throw new Error('Internal Server Error');
    }
}