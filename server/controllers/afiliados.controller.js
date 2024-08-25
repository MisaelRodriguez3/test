/**
 * @module afiliados
 * @memberof module:Controllers
 */

// Importaciones
import { getAllAfiliados, getAfiliadoById, createAfiliado, updateAfiliado, deleteAfiliado } from "../services/afiliados.service.js";

/**
 * Crea un nuevo afiliado.
 * @function
 * @param {Object} req - El objeto de solicitud.
 * @param {Object} req.body - El cuerpo de la solicitud que contiene los datos del nuevo afiliado.
 * @param {Object} res - El objeto de respuesta.
 * @returns {Object} - El nuevo afiliado creado.
 * @throws {Error} - Error interno del servidor.
 * 
 * @example
 * // Ejemplo de uso:
 * // POST /afiliados
 * // Cuerpo de la solicitud:
 * // {
 * //   "nombre": "Juan Pérez",
 * //   "email": "juan.perez@example.com"
 * // }
 * // Respuesta:
 * // {
 * //   "id": "123",
 * //   "nombre": "Juan Pérez",
 * //   "email": "juan.perez@example.com"
 * // }
 */
export const createOneAfiliado = async (req, res) => {
    try {
        const newAfiliado = await createAfiliado(req.body);
        return res.json(newAfiliado);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error." });
    }
}

/**
 * Muestra todos los afiliados.
 * 
 * @function 
 * @param {Object} req - El objeto de solicitud.
 * @param {Object} res - El objeto de respuesta.
 * @returns {Object[]} - Lista de todos los afiliados.
 * @throws {Error} - Error interno del servidor.
 * 
 * @example
 * // Ejemplo de uso:
 * // GET /afiliados
 * // Respuesta:
 * // [
 * //   {
 * //     "id": "123",
 * //     "nombre": "Juan Pérez",
 * //     "email": "juan.perez@example.com"
 * //   },
 * //   {
 * //     "id": "456",
 * //     "nombre": "Ana Gómez",
 * //     "email": "ana.gomez@example.com"
 * //   }
 * // ]
 */
export const showAllAfiliados = async (req, res) => {
    try {
        const afiliados = await getAllAfiliados();
        return res.status(200).json(afiliados);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

/**
 * Muestra un afiliado por su ID.
 * 
 * @function 
 * @param {Object} req - El objeto de solicitud.
 * @param {Object} req.params - Parámetros de la solicitud.
 * @param {string} req.params.afiliado_Id - ID del afiliado a obtener.
 * @param {Object} res - El objeto de respuesta.
 * @returns {Object} - El afiliado correspondiente al ID.
 * @throws {Error} - Error interno del servidor.
 * @throws {Error} - Afiliado no encontrado.
 * 
 * @example
 * // Ejemplo de uso:
 * // GET /afiliados/123
 * // Respuesta:
 * // {
 * //   "id": "123",
 * //   "nombre": "Juan Pérez",
 * //   "email": "juan.perez@example.com"
 * // }
 */
export const showAfiliadoById = async (req, res) => {
    try {
        const id = req.params.afiliado_Id;
        const afiliado = await getAfiliadoById(id);
        if (!afiliado) {
            return res.status(404).json({ error: 'Afiliado no encontrado' });
        }
        return res.status(200).json(afiliado);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

/**
 * Actualiza un afiliado por su ID.
 * 
 * @function 
 * @param {Object} req - El objeto de solicitud.
 * @param {Object} req.params - Parámetros de la solicitud.
 * @param {string} req.params.afiliado_Id - ID del afiliado a actualizar.
 * @param {Object} req.body - Datos para actualizar el afiliado.
 * @param {Object} res - El objeto de respuesta.
 * @returns {Object} - Mensaje de éxito de la actualización.
 * @throws {Error} - Error interno del servidor.
 * @throws {Error} - Registro no encontrado.
 * 
 * @example
 * // Ejemplo de uso:
 * // PUT /afiliados/123
 * // Cuerpo de la solicitud:
 * // {
 * //   "nombre": "Juan Pérez Actualizado",
 * //   "email": "juan.perez@updated.com"
 * // }
 * // Respuesta:
 * // {
 * //   "message": "Afiliado con el id 123 actualizado."
 * // }
 */
export const updateOneAfiliado = async (req, res) => {
    const id = req.params.afiliado_Id;
    console.log(req.body);
    try {
        const updatedAfiliado = await updateAfiliado(id, req.body);
        if (!updatedAfiliado) {
            return res.status(404).json({ error: "This record does not exist." });
        }
        return res.json({ message: `Afiliado con el id ${id} actualizado.` });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error controler." });
    }
}

/**
 * Elimina afiliados por sus IDs.
 * 
 * @function 
 * @param {Object} req - El objeto de solicitud.
 * @param {Object} req.body - Cuerpo de la solicitud.
 * @param {string[]} req.body.ids - IDs de los afiliados a eliminar.
 * @param {Object} res - El objeto de respuesta.
 * @returns {Object} - Mensaje de éxito de la eliminación.
 * @throws {Error} - Error interno del servidor.
 * 
 * @example
 * // Ejemplo de uso:
 * // DELETE /afiliados
 * // Cuerpo de la solicitud:
 * // {
 * //   "ids": ["123", "456"]
 * // }
 * // Respuesta:
 * // {
 * //   "message": "Afiliado eliminado correctamente"
 * // }
 */
export const deleteAfiliados = async (req, res) => {
    const { ids } = req.body;
    try {
        await deleteAfiliado(ids);
        return res.json({ message: 'Afiliado eliminado correctamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
