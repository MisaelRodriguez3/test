import products from "../models/productos.model.js";
import categories from "../models/categorias.model.js";
import removeImage from "../utils/removeImage.js";

/**
 * @module productos
 * @memberof module:Services
 */

/**
 * Función para obtener todos los registros de la tabla `productos`. Si la operación es éxitosa devielve los registros y si
 * falla muestra el error en la consola y lanza un error.
 * @function
 * @async
 * @returns {Promise<Array<Object>>} Retorna un array de objetos si la operación es éxitosa.
 * @throws {Error} Lanza un error si ocurre un problema durante la consulta a la base de datos.
 */
export const getAllProducts = async () => {
    try {
        const allProducts = await products.findAll({

            attributes: { exclude: "categoria_Id" },
            include: {
                model: categories,
                attributes: ["nombre"]
            },
            order: [["producto_Id", "ASC"]]
        });
        return allProducts;
    } catch (error) {
        console.error(error);
        throw new Error('Internal Server Error');
    }
}

/**
 * Función para obtener un registro de la tabla `productos` en base a `producto_Id`. Si la operación es éxitosa
 * devuelve un objeto y si falla muestra el error en la consola y lanza un error.
 * @function
 * @async
 * @param {Number} id Identificador de registro de la tabla `productos`
 * @returns {Promise<Object | null>} Retorna el objeto encontrado con su información en caso de existir, en caso contrario
 * regresa null.
 * @throws {Error} Lanza un error si ocurre un problema durante la consulta a la base de datos.
 */
export const getProductsByIdsService = async (ids) => {
    try {
        const productsByIds = await products.findAll({
            where: { producto_Id: ids },
            attributes: { exclude: ["categoria_Id"] },
            include: {
                model: categories,
                attributes: ["nombre"]
            },
            order: [["producto_Id", "ASC"]]
        });
        return productsByIds;
    } catch (error) {
        console.error(error);
        throw new Error('Internal Server Error');
    }
}

/**
 * Función para crear un nuevo registro de `productos`. Si la operación es éxitosa devuelve el registro creado
 * y si falla muestra el error en la consola y lanza un error.
 * @function
 * @async
 * @param {Array<Object>} data Información de los registros a crear
 * @returns {Promise<Object>} Retorna el registro creado como un objeto.
 * @throws {Error} Lanza un error si ocurre un problema durante la consulta a la base de datos.
 */
export const createProduct = async (data) => {
    try {
        const newProduct = await products.create(data);
        return newProduct;
    } catch (error) {
        console.error(error);
        throw new Error('Internal Server Error');
    }
}

/**
 * Función para actualizar un registro de `productos` en base a `producto_Id`. Si la operación es éxitosa retorna 
 * un array de números que indica la cantidad de filas afectadas y si falla muestra el error en la consola y lanza un error.
 * @function
 * @async
 * @param {Number} id Identificador del registro de la tabla `productos`
 * @param {Object} data Nueva información del registro.
 * @returns {Promise<Array<Number> | null>} Retorna un array de números con la cantidad de filas afectadas por la ejecución de la operación
 * o null si el registro no existe.
 * @throws {Error} Lanza un error si ocurre un problema durante la consulta a la base de datos.
 */
export const updateProduct = async (id, data) => {
    try {
        const product = await products.findByPk(id);
        if (!product) {
            return null;
        }
        //solo agregamos req.body para una actualizacion de los campos contenidos en este y no de todos
        const updatedProduct = await products.update(data, { where: { producto_Id: id } });
        return updatedProduct;
    } catch (error) {
        console.error(error);
        throw new Error('Internal Server Error');
    }
}

/**
 * Función para la eliminación de multiples registros de la tabla `productos`. Si la operación es exitosa retorna la cantidad
 * de registros eliminados y si falla muestra el error en consola y lanza un error.
 * @function
 * @async
 * @param {Array<Number>} ids Lista de los registros a eliminar
 * @returns {Promise<Array<Number>>} Retorna la cantidad de registros eliminados.
 * @throws {Error} Lanza un error si ocurre un problema durante la consulta a la base de datos.
 */
export const deleteProduct = async (ids) => {
    try {
        const product = await products.findAll({ where: { producto_Id: ids } });
        product.forEach(obj => {
            removeImage(obj.imagen)
        })

        const deletedProduct = await products.destroy({ where: { producto_Id: ids } })
        return deletedProduct;
    } catch (error) {
        console.error(error);
        throw new Error('Internal Server Error');
    }
}