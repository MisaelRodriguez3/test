import empleados from "../models/empleados.model.js";
import roles from "../models/roles.model.js";
import removeImage from "../utils/removeImage.js";

/**
 * Obtiene todos los empleados de la base de datos.
 * 
 * @returns {Promise<Array>} Una lista de todos los empleados.
 * @throws {Error} Si ocurre un error durante la consulta.
 */
export const getAllEmpleados = async() => {
    try {
        const allEmpleados = await empleados.findAll({
            attributes: { exclude: ["rol_Id", "contraseña"] },
            include: {
                model: roles,
                attributes: ["rol"]
            },
            order: [
                ["empleado_Id", "ASC"]
            ]
        });
        return allEmpleados;
    } catch (error) {
        console.error(error);
        throw new Error("Internal server error");
    }
}

/**
 * Obtiene un empleado por su ID.
 * 
 * @param {number} id - ID del empleado.
 * @returns {Promise<Object|null>} El empleado encontrado o null si no existe.
 * @throws {Error} Si ocurre un error durante la consulta.
 */
export const getOneEmpleado = async(id) => {
    try {
        const empleado = await empleados.findByPk(id, {
            attributes: { exclude: ["rol_Id", "contraseña"] },
            include: {
                model: roles,
                attributes: ["rol"]
            },
            order: [
                ["empleado_Id", "ASC"]
            ]
        });
        return empleado;
    } catch (error) {
        console.error(error);
        throw new Error("Internal server error");
    }
}

/**
 * Crea un nuevo empleado.
 * 
 * @param {Object} data - Datos del nuevo empleado.
 * @returns {Promise<Object>} El empleado creado.
 * @throws {Error} Si ocurre un error durante la creación.
 */
export const createEmpleado = async(data) => {
    try {
        const newEmpleado = await empleados.create(data);
        return newEmpleado;
    } catch (error) {
        console.error(error);
        throw new Error("Internal server error");
    }
}

/**
 * Actualiza un empleado existente.
 * 
 * @param {number} id - ID del empleado a actualizar.
 * @param {Object} data - Nuevos datos del empleado.
 * @returns {Promise<number>} El número de empleados actualizados.
 * @throws {Error} Si ocurre un error durante la actualización.
 */
export const updateEmpleado = async(id, data) => {
    try {
        const empleado = await empleados.update(data, { where: { empleado_Id: id } });
        return empleado;
    } catch (error) {
        console.error(error);
        throw new Error("Internal server error");
    }
}

/**
 * Elimina uno o más empleados.
 * 
 * @param {Array<number>} ids - IDs de los empleados a eliminar.
 * @returns {Promise<number>} El número de empleados eliminados.
 * @throws {Error} Si ocurre un error durante la eliminación.
 */
export const deleteEmpleado = async(ids) => {
    try {
        const employees = await empleados.findAll({ where: { empleado_Id: ids } });
        employees.forEach(empleado => {
            removeImage(empleado.imagen);
        });
        const empleadoDeleted = await empleados.destroy({ where: { empleado_Id: ids } });
        return empleadoDeleted;
    } catch (error) {
        console.error(error);
        throw new Error("Internal server error");
    }
}