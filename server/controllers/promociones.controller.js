import { getAllPromotions, getOnePromotion, createPromotion, updatePromotion, deletePromotion } from "../services/promociones.service.js"

/**
 * @module promociones
 * @memberof module:Controllers
 */

/**
 * Controlador para manejar la solicitud de obtener todos los registros de `promociones`
 * @function
 * @async
 * @param {Object} req Objeto de la solicitud HTTP
 * @param {Object} res Objeto de la respuesta HTTP
 * @returns {Promise<void>} Retorna el resultado de la llamada al servicio `getAllPromotions` si todo sale bien y si falla 
 * muestra el error en la consola y retorna un mensaje de error.
 */
export const getPromotions = async (req, res) => {
    try {
        const promotions = await getAllPromotions();
        return res.json(promotions);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error." });
    }
}

/**
 * Controlador para manejar la solicitud de obtener un registro de `promociones`.
 * @function
 * @async
 * @param {Object} req Objeto de la solicitud HTTP
 * @param {Object} res Objeto de la respuesta HTTP
 * @returns {Promise<void>} Retorna el resultado de la llamada al servicio `getOnePromotion` si todo sale bien y si falla
 * muestra el error en la consola y retorna un mensaje de error.
 */
export const getPromotion = async (req, res) => {
    const id = req.params.promocion_Id;
    try {
        const promotion = await getOnePromotion(id);
 
        if (!promotion) {
            return res.status(404).json({ error: "This record does not exist." })
        }
        return res.status(200).json(promotion);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error." });
    }
}

/**
 * Controlador para manejar la solicitud de crear un nuevo registro de `promociones`.
 * @function
 * @async
 * @param {Object} req Objeto de la solicitud HTTP
 * @param {Object} res Objeto de la respuesta HTTP
 * @returns {Promise<void>} Retorna el resultado de la llamada al servicio `createPromotion` si todo sale bie, y si falla 
 * muestra el error en la consola y retorna un mensaje de error.
 */
export const addPromotion = async (req, res) => {
    const data = {
        nombre: req.body.nombre,
        tipo: req.body.tipo,
        descuento: req.body.descuento || null,
        comprar_cantidad: req.body.comprar_cantidad || null,
        pagar_cantidad: req.body.pagar_cantidad || null,
        por_cada: req.body.por_cada || null,
        fecha_inicio: req.body.fecha_inicio,
        fecha_fin: req.body.fecha_fin
    }
    try {
        const newPromotion = await createPromotion(data);
        return res.json(newPromotion);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error." });
    }
}

/**
 * Controlador para manejar la solicitud de actualizar un registro de `promociones`
 * @function
 * @async
 * @param {Object} req Objeto de la solicitud HTTP
 * @param {Object} res Obejeto de la respuesta HTTP
 * @returns {Promise<void>} Retorna un mensaje de éxito si todo sale bien, y si falla muestra el error en la consola
 * y retorna un mensaje de error.
 */
export const upPromotion = async (req, res) => {
    const id = req.params.promocion_Id;


    const data = {
        nombre: req.body.nombre,
        tipo: req.body.tipo,
        descuento: req.body.descuento || null,
        comprar_cantidad: req.body.comprar_cantidad || null,
        pagar_cantidad: req.body.pagar_cantidad || null,
        por_cada: req.body.por_cada || null,
        fecha_inicio: req.body.fecha_inicio,
        fecha_fin: req.body.fecha_fin
    }

    if( data.tipo === 'porcentaje_descuento' ) {
        data.comprar_cantidad = null;
        data.pagar_cantidad = null;
        data.por_cada = null;
    }

    if (data.tipo === 'compra_x_paga_y') {
        data.por_cada = null;
        data.descuento = null;
    }

    if (data.tipo === 'por_cada_x_te_descontamos_y') {
        data.comprar_cantidad = null;
        data.pagar_cantidad = null;
    }
    try {
        const updatedpromotion = await updatePromotion(id, data);
        if (!updatedpromotion) {
            return res.status(404).json({ error: "This record does not exist." })
        }
        return res.json({ message: `Promocion con el id ${id} fue actualizado.` })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error." });
    }
}

/**
 * Controlador para manejar la solicitud de eliminar registros de `promociones`
 * @function
 * @async
 * @param {Object} req Objeto de la solicitud HTTP
 * @param {Object} res Objeto de la respuesta HTTP
 * @returns {Promise<void>} Retorna un mensaje de éxito si todo sale bien, y si falla muestra el error en la consola
 * y retorna un mensaje de error.
 */
export const delPromotion = async (req, res) => {
    const { ids } = req.body;
    try {
        await deletePromotion(ids);
        return res.json({ message: `Promocion eliminada.` })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error." });
    }
}