import { Router } from "express";
import { getEmpleados, getEmpleado, addEmpleado, upEmpleado, deleteEmpleados } from "../../controllers/empleados.controller.js";
import validateSchema from "../../middlewares/validateSchema.middleware.js";
import { empleadoSchema, updateEmpleadoSchema } from "../../schemas/empleados.schemas.js";
import verifyToken from "../../middlewares/verifyToken.middlaware.js";
import rolesValidator from "../../middlewares/rolesValidator.middleware.js";

const router = Router();

/**
 * Ruta para obtener un empleado por su ID.
 * 
 * @name GET /empleados/:empleado_Id
 * @function
 * @memberof module:routers/empleados
 * @param {string} empleado_Id - El ID del empleado.
 * @param {function} verifyToken - Middleware para verificar el token de autenticación.
 * @param {function} rolesValidator - Middleware para validar roles.
 * @param {function} getEmpleado - Controlador para obtener un empleado.
 */
router.get(
    "/empleados/:empleado_Id",
    verifyToken,
    rolesValidator(["admin", "director", "marketing"]),
    getEmpleado
);

/**
 * Ruta para obtener todos los empleados.
 * 
 * @name GET /empleados
 * @function
 * @memberof module:routers/empleados
 * @param {function} verifyToken - Middleware para verificar el token de autenticación.
 * @param {function} rolesValidator - Middleware para validar roles.
 * @param {function} getEmpleados - Controlador para obtener todos los empleados.
 */
router.get(
    "/empleados",
    verifyToken,
    rolesValidator(["admin", "director", "marketing"]),
    getEmpleados
);

/**
 * Ruta para agregar un nuevo empleado.
 * 
 * @name POST /empleados
 * @function
 * @memberof module:routers/empleados
 * @param {function} verifyToken - Middleware para verificar el token de autenticación.
 * @param {function} rolesValidator - Middleware para validar roles.
 * @param {function} validateSchema - Middleware para validar el esquema del empleado.
 * @param {function} addEmpleado - Controlador para agregar un nuevo empleado.
 */
router.post(
    "/empleados",
    verifyToken, // Verificar que el usuario esté autenticado
    rolesValidator(["admin", "director"]), // Validar que el usuario tenga los roles adecuados
    validateSchema(empleadoSchema), // Validar que los datos cumplan con el esquema
    addEmpleado // Agregar el nuevo empleado si todo es válido
);

/**
 * Ruta para actualizar un empleado existente.
 * 
 * @name PATCH /empleados/:empleado_Id
 * @function
 * @memberof module:routers/empleados
 * @param {string} empleado_Id - El ID del empleado.
 * @param {function} verifyToken - Middleware para verificar el token de autenticación.
 * @param {function} rolesValidator - Middleware para validar roles.
 * @param {function} validateSchema - Middleware para validar el esquema de actualización del empleado.
 * @param {function} upEmpleado - Controlador para actualizar un empleado existente.
 */
router.patch(
    "/empleados/:empleado_Id",
    verifyToken,
    rolesValidator(["admin", "director", "marketing"]),
    validateSchema(updateEmpleadoSchema),
    upEmpleado
);

/**
 * Ruta para eliminar empleados.
 * 
 * @name DELETE /empleados
 * @function
 * @memberof module:routers/empleados
 * @param {function} verifyToken - Middleware para verificar el token de autenticación.
 * @param {function} rolesValidator - Middleware para validar roles.
 * @param {function} deleteEmpleados - Controlador para eliminar empleados.
 */
router.delete(
    "/empleados",
    verifyToken,
    rolesValidator(["admin", "director", "marketing"]),
    deleteEmpleados
);

export default router;