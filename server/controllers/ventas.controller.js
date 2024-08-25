import { createVenta, deleteVenta, getVentaById, updateVenta, getAllVentas } from "../services/ventas.service.js"

/**
 * @module ventas
 * @memberof module:Controllers
 */

/**
 * Crea una nueva venta.
 * @function 
 * @param {Object} req - El objeto de solicitud.
 * @param {Object} req.body - El cuerpo de la solicitud que contiene los datos de la nueva venta.
 * @param {Object} res - El objeto de respuesta.
 * @returns {Object} - La nueva venta creada.
 * @throws {Error} - Error interno del servidor.
 
 * @example
 * // Ejemplo de uso:
 * // POST /ventas
 * // Cuerpo de la solicitud:
 * // {
 * //   "productoId": "456",
 * //   "clienteId": "789",
 * //   "cantidad": 3,
 * //   "total": 450.00
 * // }
 * // Respuesta:
 * // {
 * //   "id": "123",
 * //   "productoId": "456",
 * //   "clienteId": "789",
 * //   "cantidad": 3,
 * //   "total": 450.00
 * // }
 */
export const createOneVenta = async (req, res) => {
    try {
        const newVenta = await createVenta(req.body);
        return res.json(newVenta);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error." });
    }
}

/**
 * Muestra todas las ventas.
 * 
 * @function 
 * @param {Object} req - El objeto de solicitud.
 * @param {Object} res - El objeto de respuesta.
 * @returns {Object[]} - Lista de todas las ventas.
 * @throws {Error} - Error interno del servidor.
 * 
 * @example
 * // Ejemplo de uso:
 * // GET /ventas
 * // Respuesta:
 * // [
 * //   {
 * //     "id": "123",
 * //     "productoId": "456",
 * //     "clienteId": "789",
 * //     "cantidad": 3,
 * //     "total": 450.00
 * //   },
 * //   {
 * //     "id": "124",
 * //     "productoId": "457",
 * //     "clienteId": "790",
 * //     "cantidad": 2,
 * //     "total": 300.00
 * //   }
 * // ]
 */
export const showAllVentas = async (req, res) => {
    try {
        const allventas = await getAllVentas();
        return res.json(allventas);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error." });
    }
}

/**
 * Muestra una venta por su ID.
 * 
 * @function 
 * @param {Object} req - El objeto de solicitud.
 * @param {Object} req.params - Parámetros de la solicitud.
 * @param {string} req.params.venta_Id - ID de la venta a obtener.
 * @param {Object} res - El objeto de respuesta.
 * @returns {Object} - La venta correspondiente al ID.
 * @throws {Error} - Error interno del servidor.
 * @throws {Error} - Registro no encontrado.
 * 
 * @example
 * // Ejemplo de uso:
 * // GET /ventas/123
 * // Respuesta:
 * // {
 * //   "id": "123",
 * //   "productoId": "456",
 * //   "clienteId": "789",
 * //   "cantidad": 3,
 * //   "total": 450.00
 * // }
 */
export const showVentaById = async (req, res) => {
    const id = req.params.venta_Id;
    try {
        const oneventa = await getVentaById(id);
        if (!oneventa) {
            return res.status(404).json({ error: "This record does not exist." });
        }
        return res.json(oneventa);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error." });
    }
}

/**
 * Actualiza una venta por su ID.
 * 
 * @function 
 * @param {Object} req - El objeto de solicitud.
 * @param {Object} req.params - Parámetros de la solicitud.
 * @param {string} req.params.venta_Id - ID de la venta a actualizar.
 * @param {Object} req.body - Datos para actualizar la venta.
 * @param {Object} res - El objeto de respuesta.
 * @returns {Object} - Mensaje de éxito de la actualización.
 * @throws {Error} - Error interno del servidor.
 * @throws {Error} - Registro no encontrado.
 * 
 * @example
 * // Ejemplo de uso:
 * // PUT /ventas/123
 * // Cuerpo de la solicitud:
 * // {
 * //   "productoId": "456",
 * //   "clienteId": "789",
 * //   "cantidad": 5,
 * //   "total": 750.00
 * // }
 * // Respuesta:
 * // {
 * //   "message": "Venta con el id 123 actualizada."
 * // }
 */
export const updateOneVenta = async (req, res) => {
    const id = req.params.venta_Id;
    try {
        const updatedVenta = await updateVenta(id, req.body);
        if (!updatedVenta) {
            return res.status(404).json({ error: "This record does not exist." });
        }
        return res.json({ message: `Venta con el id ${id} actualizado.` });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error." });
    }
}

/**
 * Elimina una venta por su ID.
 * 
 * @function 
 * @param {Object} req - El objeto de solicitud.
 * @param {Object} req.body - Cuerpo de la solicitud.
 * @param {string[]} req.body.ids - IDs de las ventas a eliminar.
 * @param {Object} res - El objeto de respuesta.
 * @returns {Object} - Mensaje de éxito de la eliminación.
 * @throws {Error} - Error interno del servidor.
 * 
 * @example
 * // Ejemplo de uso:
 * // DELETE /ventas
 * // Cuerpo de la solicitud:
 * // {
 * //   "ids": ["123", "124"]
 * // }
 * // Respuesta:
 * // {
 * //   "message": "Venta eliminada."
 * // }
 */
export const deleteOneVenta = async (req, res) => {
    const { ids } = req.body;
    try {
        await deleteVenta(ids);
        return res.json({ message: `Venta eliminada.` });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error." });
    }
}
