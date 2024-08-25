import { createUsuario, deleteUsuario, getAllUsuarios, getUsuarioById, updateUsuario } from '../services/usuarios.service.js'

/**
 * @module usuariosw
 * @memberof module:Controllers
 */

/**
 * Crea un nuevo usuario.
 * @function
 * @param {Object} req - El objeto de solicitud.
 * @param {Object} req.body - El cuerpo de la solicitud que contiene los datos del nuevo usuario.
 * @param {Object} req.files - Archivos enviados en la solicitud.
 * @param {Object} req.files.imagen - Imagen del usuario.
 * @param {Object} res - El objeto de respuesta.
 * @returns {Object} - El nuevo usuario creado.
 * @throws {Error} - Error interno del servidor.
 * 
 * @example
 * // Ejemplo de uso:
 * // POST /usuarios
 * // Cuerpo de la solicitud:
 * // {
 * //   "nombre": "Juan Pérez",
 * //   "email": "juan.perez@example.com"
 * // }
 * // Archivos de la solicitud:
 * // {
 * //   "imagen": <archivo-imagen>
 * // }
 * // Respuesta:
 * // {
 * //   "id": "123",
 * //   "nombre": "Juan Pérez",
 * //   "email": "juan.perez@example.com",
 * //   "imagen": "ruta/a/imagen.jpg"
 * // }
 */
export const createOneUsuario = async (req, res) => {
    let imagen;
    let data;
    if (!req.files) {
        data = { ...req.body };
    } else {
        imagen = await uploadImage(req.files.imagen);
        data = { ...req.body, imagen };
    }
    try {
        const newUsuario = await createUsuario(data);
        return res.json(newUsuario);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error." });
    }
}

/**
 * Muestra todos los usuarios.
 * 
 * @function 
 * @param {Object} req - El objeto de solicitud.
 * @param {Object} res - El objeto de respuesta.
 * @returns {Object[]} - Lista de todos los usuarios.
 * @throws {Error} - Error interno del servidor.
 * 
 * @example
 * // Ejemplo de uso:
 * // GET /usuarios
 * // Respuesta:
 * // [
 * //   {
 * //     "id": "123",
 * //     "nombre": "Juan Pérez",
 * //     "email": "juan.perez@example.com",
 * //     "imagen": "ruta/a/imagen.jpg"
 * //   },
 * //   {
 * //     "id": "124",
 * //     "nombre": "Ana Gómez",
 * //     "email": "ana.gomez@example.com",
 * //     "imagen": "ruta/a/imagen.jpg"
 * //   }
 * // ]
 */
export const showAllUsuarios = async (req, res) => {
    try {
        const allUsuarios = await getAllUsuarios();
        return res.json(allUsuarios);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error." });
    }
}

/**
 * Muestra un usuario por su ID.
 * 
 * @function 
 * @param {Object} req - El objeto de solicitud.
 * @param {Object} req.params - Parámetros de la solicitud.
 * @param {string} req.params.usuario_Id - ID del usuario a obtener.
 * @param {Object} res - El objeto de respuesta.
 * @returns {Object} - El usuario correspondiente al ID.
 * @throws {Error} - Error interno del servidor.
 * @throws {Error} - Registro no encontrado.
 * 
 * @example
 * // Ejemplo de uso:
 * // GET /usuarios/123
 * // Respuesta:
 * // {
 * //   "id": "123",
 * //   "nombre": "Juan Pérez",
 * //   "email": "juan.perez@example.com",
 * //   "imagen": "ruta/a/imagen.jpg"
 * // }
 */
export const showUsuarioById = async (req, res) => {
    const id = req.params.usuario_Id;
    try {
        const showusuario = await getUsuarioById(id);
        if (!showusuario) {
            return res.status(404).json({ error: "This record does not exist." });
        }
        return res.json(showusuario);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error." });
    }
}

/**
 * Actualiza un usuario por su ID.
 * 
 * @function 
 * @param {Object} req - El objeto de solicitud.
 * @param {Object} req.params - Parámetros de la solicitud.
 * @param {string} req.params.usuario_Id - ID del usuario a actualizar.
 * @param {Object} req.body - Datos para actualizar el usuario.
 * @param {Object} req.files - Archivos enviados en la solicitud.
 * @param {Object} req.files.imagen - Imagen del usuario.
 * @param {Object} res - El objeto de respuesta.
 * @returns {Object} - Mensaje de éxito de la actualización.
 * @throws {Error} - Error interno del servidor.
 * @throws {Error} - Registro no encontrado.
 * 
 * @example
 * // Ejemplo de uso:
 * // PUT /usuarios/123
 * // Cuerpo de la solicitud:
 * // {
 * //   "nombre": "Juan Pérez Actualizado",
 * //   "email": "juan.perez@updated.com"
 * // }
 * // Archivos de la solicitud:
 * // {
 * //   "imagen": <archivo-imagen>
 * // }
 * // Respuesta:
 * // {
 * //   "message": "Usuario con el id 123 actualizado."
 * // }
 */
export const updateOneUsuario = async (req, res) => {
    const id = req.params.usuario_Id;
    let imagen;
    let data;
    if (!req.files) {
        data = { ...req.body };
    } else {
        imagen = await uploadImage(req.files.imagen);
        data = { ...req.body, imagen };
    }
    try {
        const user = await getUsuarioById(id);
        if (!user) {
            return res.status(404).json({ error: "This record does not exist." });
        }
        if (data.imagen && user.imagen !== "") {
            removeImage(user.imagen);
        }
        await updateUsuario(id, data);
        return res.json({ message: `Usuario con el id ${id} actualizado.` });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error." });
    }
}

/**
 * Elimina usuarios por sus IDs.
 * 
 * @function
 * @param {Object} req - El objeto de solicitud.
 * @param {Object} req.body - Cuerpo de la solicitud.
 * @param {string[]} req.body.ids - IDs de los usuarios a eliminar.
 * @param {Object} res - El objeto de respuesta.
 * @returns {Object} - Mensaje de éxito de la eliminación.
 * @throws {Error} - Error interno del servidor.
 * 
 * @example
 * // Ejemplo de uso:
 * // DELETE /usuarios
 * // Cuerpo de la solicitud:
 * // {
 * //   "ids": ["123", "124"]
 * // }
 * // Respuesta:
 * // {
 * //   "message": "Usuarios eliminados."
 * // }
 */
export const deleteUsuarios = async (req, res) => {
    const { ids } = req.body;
    try {
        await deleteUsuario(ids);
        return res.json({ message: `Usuarios eliminados.` });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Hubo un error interno del servidor." });
    }
}
