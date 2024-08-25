import { getAllProducts, getProductsByIdsService, createProduct, updateProduct, deleteProduct } from "../services/productos.service.js";
import uploadImage from "../utils/uploadImage.js";
import removeImage from "../utils/removeImage.js";

/**
 * @module productos
 * @memberof module:Controllers
 */

/**
 * Controlador para manejar la solicitud de obtener todos los registros de `productos`
 * @function
 * @async
 * @param {Object} req Objeto de la solicitud HTTP
 * @param {Object} res Objeto de la respuesta HTTP
 * @returns {Promise<void>} Retorna el resultado de la llamada al servicio `getAllProducts` si todo sale bien y si falla 
 * muestra el error en la consola y retorna un mensaje de error.
 */
export const getProducts = async (req, res) => {
    try {
        const products = await getAllProducts();
        return res.json(products)
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error." });
    }
}

/**
 * Controlador para manejar la solicitud de obtener un registro de `productos`.
 * @function
 * @async
 * @param {Object} req Objeto de la solicitud HTTP
 * @param {Object} res Objeto de la respuesta HTTP
 * @returns {Promise<void>} Retorna el resultado de la llamada al servicio `getOneProduct` si todo sale bien y si falla
 * muestra el error en la consola y retorna un mensaje de error.
 */
export const getProductsByIds = async (req, res) => {
    const { productosIds } = req.params;
    
    try {
        // Convierte 'productosIds' de una cadena de texto a un array de enteros
        const idsArray = productosIds.split(',').map(id => parseInt(id.trim()));

        const productsByIds = await getProductsByIdsService(idsArray);
        
        if (!productsByIds || productsByIds.length === 0) {
            return res.status(404).json({ error: "These records do not exist." });
        }

        return res.json(productsByIds);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error." });
    }
};


/**
 * Controlador para manejar la solicitud de crear un nuevo registro de `productos`.
 * @function
 * @async
 * @param {Object} req Objeto de la solicitud HTTP
 * @param {Object} res Objeto de la respuesta HTTP
 * @returns {Promise<void>} Retorna el resultado de la llamada al servicio `createProduct` si todo sale bie, y si falla 
 * muestra el error en la consola y retorna un mensaje de error.
 */
export const addProduct = async (req, res) => {
    let imagen;
    if (!req.files) {
        imagen = req.body.imagen
    } else {
        imagen = await uploadImage(req.files.imagen);

    }
    const data = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        stock: req.body.stock,
        imagen: imagen,
        categoria_Id: req.body.categoria_Id
    }
    try {
        const newProduct = await createProduct(data);
        return res.send(newProduct);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error." });
    }
}

/**
 * Controlador para manejar la solicitud de actualizar un registro de `productos`
 * @function
 * @async
 * @param {Object} req Objeto de la solicitud HTTP
 * @param {Object} res Obejeto de la respuesta HTTP
 * @returns {Promise<void>} Retorna un mensaje de éxito si todo sale bien, y si falla muestra el error en la consola
 * y retorna un mensaje de error.
 */
export const upProduct = async (req, res) => {
    const id = req.params.producto_Id;
    let data;
    let imagen;
    if (!req.files) {
        data = { ...req.body }
    } else {
        imagen = await uploadImage(req.files.imagen)
        data = { ...req.body, imagen }
    }

    try {
        const product = await getOneProduct(id)
        if (!product) {
            return res.status(404).json({ error: `El producto con el id ${id} no existe` })
        }
        if (data.imagen && product.imagen !== "") {
            removeImage(product.imagen)
        }
        await updateProduct(id, data);

        return res.json({ message: `Producto con el el id ${id} actualizado correctamente.` })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error." });
    }
}

/**
 * Controlador para manejar la solicitud de eliminar registros de `productos`
 * @function
 * @async
 * @param {Object} req Objeto de la solicitud HTTP
 * @param {Object} res Objeto de la respuesta HTTP
 * @returns {Promise<void>} Retorna un mensaje de éxito si todo sale bien, y si falla muestra el error en la consola
 * y retorna un mensaje de error.
 */
export const delProduct = async (req, res) => {
    const { ids } = req.body
    try {
        await deleteProduct(ids);
        return res.json({ message: `El producto ha sido borrado correctamente.` })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error." });
    }
}