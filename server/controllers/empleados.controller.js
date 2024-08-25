import { getAllEmpleados, getOneEmpleado, createEmpleado, updateEmpleado, deleteEmpleado } from "../services/empleados.service.js";
import uploadImage from "../utils/uploadImage.js";
import removeImage from "../utils/removeImage.js";
import bcrypt from "bcryptjs";
import empleados from "../models/empleados.model.js";

/**
 * Controlador para obtener todos los empleados.
 * 
 * @async
 * @function
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>}
 */
export const getEmpleados = async(req, res) => {
    try {
        const empleados = await getAllEmpleados();
        return res.json(empleados);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error" });
    }
}

/**
 * Controlador para obtener un empleado por su ID.
 * 
 * @async
 * @function
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>}
 */
export const getEmpleado = async(req, res) => {
    const id = req.params.empleado_Id;
    try {
        const empleado = await getOneEmpleado(id);
        if (!empleado) {
            return res.status(404).json({ error: "This record does not exist" });
        }
        return res.json(empleado);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error" });
    }
}

/**
 * Controlador para agregar un nuevo empleado.
 * 
 * @async
 * @function
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>}
 * @throws {Error} - Lanza un error si ocurre un problema al agregar el empleado.
 */
export const addEmpleado = async(req, res) => {
    try {
        let imagen;
        if (!req.files) {
            imagen = req.body.imagen;
        } else {
            imagen = await uploadImage(req.files.imagen);
        }

        let password = req.body.password;
        const passHash = await bcrypt.hash(password, 10);

        const data = {
            nombre: req.body.nombre,
            correo: req.body.correo,
            password: passHash,
            rol_Id: req.body.rol_Id,
            imagen
        };

        const empleado = await createEmpleado(data);
        return res.status(201).json(empleado);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error" });
    }
}

/**
 * Controlador para actualizar un empleado existente.
 * 
 * @async
 * @function
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>}
 */
export const upEmpleado = async(req, res) => {
    const id = req.params.empleado_Id;
    let imagen;
    let data;
    if (req.body.password) {
        const passHash = await bcrypt.hash(req.body.password, 10);
        req.body.password = passHash;
    }
    if (!req.files) {
        data = {...req.body };
    } else {
        imagen = await uploadImage(req.files.file);
        data = {...req.body, imagen };
    }
    try {
        const employee = await getOneEmpleado(id);
        if (!employee) {
            return res.status(404).json({ error: "This record does not exist" });
        }
        const empleado = await updateEmpleado(id, data);
        if (data.imagen && employee.imagen !== "") {
            removeImage(employee.imagen);
        }
        return res.json(empleado);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error" });
    }
}

/**
 * Controlador para eliminar empleados.
 * 
 * @async
 * @function
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>}
 */
export const deleteEmpleados = async(req, res) => {
    const { ids } = req.body;
    try {
        await deleteEmpleado(ids);
        return res.json({ message: "Usuarios eliminados." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Hubo un error interno del servidor." });
    }
}