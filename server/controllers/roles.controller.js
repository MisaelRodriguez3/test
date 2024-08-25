import { getAllRoles, getOneRol, createRol, updateRol, deleteRol } from "../services/roles.service.js";

/**
 * Controlador para obtener todos los roles.
 * 
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>}
 */
export const getRoles = async(req, res) => {
    try {
        const rol = await getAllRoles();
        return res.json(rol);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "there was an internal server error" });
    }
}

/**
 * Controlador para obtener un rol por su ID.
 * 
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>}
 */
export const getRol = async(req, res) => {
    const id = req.params.rol_Id;
    try {
        const rol = await getOneRol(id);
        if (!rol) {
            return res.status(500).json({ error: "this record not exist" });
        }
        return res.json(rol);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "there was an internal server error" });
    }
}

/**
 * Controlador para agregar un nuevo rol.
 * 
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>}
 */
export const addRol = async(req, res) => {
    try {
        const rol = await createRol(req.body);
        return res.json(rol);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "there was an internal server error" });
    }
}

/**
 * Controlador para actualizar un rol existente.
 * 
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>}
 */
export const upRol = async(req, res) => {
    const id = req.params.rol_Id;
    const nombre = req.body.rol;
    try {
        const rol = await updateRol(id, { nombre });
        if (!rol) {
            return res.status(500).json({ error: "this record not exist" });
        }
        return res.json(rol);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "there was an internal server error" });
    }
}

/**
 * Controlador para eliminar uno o más roles.
 * 
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>}
 */
export const delRol = async(req, res) => {
    const { ids } = req.body;
    try {
        await deleteRol(ids);
        return res.json({ message: "Rol eliminado." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "there was an internal server error" });
    }
}