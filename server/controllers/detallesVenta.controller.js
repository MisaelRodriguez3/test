import { getAllDetallesVenta, createDetallesVenta, deleteDetallesVenta, getDetallesVentaById, updateDetallesVenta } from "../services/detallesVenta.service.js"

/**
 * @module detallesVenta
 * @memberof module:Controllers
 */

/**
 * Crea un nuevo detalle de venta.
 * @function 
 * @param {Object} req - El objeto de solicitud.
 * @param {Object} req.body - El cuerpo de la solicitud que contiene los datos del nuevo detalle de venta.
 * @param {Object} res - El objeto de respuesta.
 * @returns {Object} - El nuevo detalle de venta creado.
 * @throws {Error} - Error interno del servidor.
 * 
 * @example
 * // Ejemplo de uso:
 * // POST /detallesVenta
 * // Cuerpo de la solicitud:
 * // {
 * //   "productoId": "456",
 * //   "ventaId": "789",
 * //   "cantidad": 10,
 * //   "precio": 150.00
 * // }
 * // Respuesta:
 * // {
 * //   "id": "123",
 * //   "productoId": "456",
 * //   "ventaId": "789",
 * //   "cantidad": 10,
 * //   "precio": 150.00
 * // }
 */
export const createOneDetallesVenta = async (req, res) => {
    try {
        const newDetallesVenta = await createDetallesVenta(req.body);
        return res.json(newDetallesVenta);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error." });
    }
}

/**
 * Muestra todos los detalles de venta.
 * 
 * @function 
 * @param {Object} req - El objeto de solicitud.
 * @param {Object} res - El objeto de respuesta.
 * @returns {Object[]} - Lista de todos los detalles de venta.
 * @throws {Error} - Error interno del servidor.
 * 
 * @example
 * // Ejemplo de uso:
 * // GET /detallesVenta
 * // Respuesta:
 * // [
 * //   {
 * //     "id": "123",
 * //     "productoId": "456",
 * //     "ventaId": "789",
 * //     "cantidad": 10,
 * //     "precio": 150.00
 * //   },
 * //   {
 * //     "id": "124",
 * //     "productoId": "457",
 * //     "ventaId": "790",
 * //     "cantidad": 5,
 * //     "precio": 200.00
 * //   }
 * // ]
 */
export const showAllDetallesVenta = async (req, res) => {
    try {
        const AllDetallesVenta = await getAllDetallesVenta();
        return res.json(AllDetallesVenta);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error." });
    }
}

/**
 * Muestra un detalle de venta por su ID.
 * 
 * @function 
 * @param {Object} req - El objeto de solicitud.
 * @param {Object} req.params - Parámetros de la solicitud.
 * @param {string} req.params.detallesVenta_Id - ID del detalle de venta a obtener.
 * @param {Object} res - El objeto de respuesta.
 * @returns {Object} - El detalle de venta correspondiente al ID.
 * @throws {Error} - Error interno del servidor.
 * @throws {Error} - Registro no encontrado.
 * 
 * @example
 * // Ejemplo de uso:
 * // GET /detallesVenta/123
 * // Respuesta:
 * // {
 * //   "id": "123",
 * //   "productoId": "456",
 * //   "ventaId": "789",
 * //   "cantidad": 10,
 * //   "precio": 150.00
 * // }
 */
export const showDetallesVentaById = async (req, res) => {
    const id = req.params.detallesVenta_Id;
    try {
        const detalle = await getDetallesVentaById(id);
        if (!detalle) {
            return res.status(404).json({ error: "This record does not exist." });
        }
        return res.json(detalle);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error." });
    }
}

/**
 * Actualiza un detalle de venta por su ID.
 * 
 * @function 
 * @param {Object} req - El objeto de solicitud.
 * @param {Object} req.params - Parámetros de la solicitud.
 * @param {string} req.params.detallesVenta_Id - ID del detalle de venta a actualizar.
 * @param {Object} req.body - Datos para actualizar el detalle de venta.
 * @param {Object} res - El objeto de respuesta.
 * @returns {Object} - Mensaje de éxito de la actualización.
 * @throws {Error} - Error interno del servidor.
 * @throws {Error} - Registro no encontrado.
 * 
 * @example
 * // Ejemplo de uso:
 * // PUT /detallesVenta/123
 * // Cuerpo de la solicitud:
 * // {
 * //   "productoId": "456",
 * //   "ventaId": "789",
 * //   "cantidad": 15,
 * //   "precio": 160.00
 * // }
 * // Respuesta:
 * // {
 * //   "message": "Detalle de venta con el id 123 actualizado."
 * // }
 */
export const updateOneDetallesVenta = async (req, res) => {
    const id = req.params.detallesVenta_Id;
    try {
        const updatedDetallesVenta = await updateDetallesVenta(id, req.body);
        if (!updatedDetallesVenta) {
            return res.status(404).json({ error: "This record does not exists." });
        }
        return res.json({ message: `Detalle de venta con el id ${id} actualizado.` });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error." });
    }
}

/**
 * Elimina un detalle de venta por su ID.
 * 
 * @function
 * @param {Object} req - El objeto de solicitud.
 * @param {Object} req.body - Cuerpo de la solicitud.
 * @param {string[]} req.body.ids - IDs de los detalles de venta a eliminar.
 * @param {Object} res - El objeto de respuesta.
 * @returns {Object} - Mensaje de éxito de la eliminación.
 * @throws {Error} - Error interno del servidor.
 * 
 * @example
 * // Ejemplo de uso:
 * // DELETE /detallesVenta
 * // Cuerpo de la solicitud:
 * // {
 * //   "ids": ["123", "124"]
 * // }
 * // Respuesta:
 * // {
 * //   "message": "Detalle de venta eliminada."
 * // }
 */
export const deleteOneDetallesVenta = async (req, res) => {
    const { ids } = req.body;
    try {
        await deleteDetallesVenta(ids);
        return res.json({ message: `Detalle de venta eliminada.` });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error." });
    }
}
