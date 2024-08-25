import { getAllCategories, getOneCategory, createCategory, updateCategory, deleteCategory } from "../services/categorias.service.js";

/**
 * @module categorias
 * @memberof module:Controllers
 */

/**
 * Controlador para manejar la solicitud de obtener todos los registros de `categorias`
 * @function
 * @async
 * @param {Object} req Objeto de la solicitud HTTP
 * @param {Object} res Objeto de la respuesta HTTP
 * @returns {Promise<void>} Retorna el resultado de la llamada al servicio `getAllCategories` si todo sale bien y si falla 
 * muestra el error en la consola y retorna un mensaje de error.
 */
export const getCategories = async (req, res) => {
    try {
        const categories = await getAllCategories();
        return res.json(categories)
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error." });
    }
}

/**
 * Controlador para manejar la solicitud de obtener un registro de `categorias`.
 * @function
 * @async
 * @param {Object} req Objeto de la solicitud HTTP
 * @param {Object} res Objeto de la respuesta HTTP
 * @returns {Promise<void>} Retorna el resultado de la llamada al servicio `getOneCategory` si todo sale bien y si falla
 * muestra el error en la consola y retorna un mensaje de error.
 */
export const getCategory = async (req, res) => {
    const id = req.params.categoria_Id;
    try {
        const category = await getOneCategory(id);
        if (!category) {
            return res.status(404).json({ error: "This record does not exist." })
        }
        return res.json(category);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error." });
    }
}

/**
 * Controlador para manejar la solicitud de crear un nuevo registro de `categorias`.
 * @function
 * @async
 * @param {Object} req Objeto de la solicitud HTTP
 * @param {Object} res Objeto de la respuesta HTTP
 * @returns {Promise<void>} Retorna el resultado de la llamada al servicio `createCategory` si todo sale bie, y si falla 
 * muestra el error en la consola y retorna un mensaje de error.
 */
export const addCategory = async (req, res) => {
    try {
        const newCategory = await createCategory(req.body);
        return res.json(newCategory);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error." });
    }
}

/**
 * Controlador para manejar la solicitud de actualizar un registro de `categorias`
 * @function
 * @async
 * @param {Object} req Objeto de la solicitud HTTP
 * @param {Object} res Obejeto de la respuesta HTTP
 * @returns {Promise<void>} Retorna un mensaje de éxito si todo sale bien, y si falla muestra el error en la consola
 * y retorna un mensaje de error.
 */
export const upCategory = async (req, res) => {
    const id = req.params.categoria_Id;
    try {
        const updatedCategory = await updateCategory(id, req.body);
        if (!updatedCategory) {
            return res.status(404).json({ error: "This record does not exist." });
        }
        return res.json({ message: `Categoria con el id ${id} actualizado.` });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error." });
    }
}

/**
 * Controlador para manejar la solicitud de eliminar registros de `categorias`
 * @function
 * @async
 * @param {Object} req Objeto de la solicitud HTTP
 * @param {Object} res Objeto de la respuesta HTTP
 * @returns {Promise<void>} Retorna un mensaje de éxito si todo sale bien, y si falla muestra el error en la consola
 * y retorna un mensaje de error.
 */
export const delCategory = async (req, res) => {
    const { ids } = req.body;
    try {
        await deleteCategory(ids);
        return res.json({ mesage: `Categoria eliminada.` });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error." });
    }
}