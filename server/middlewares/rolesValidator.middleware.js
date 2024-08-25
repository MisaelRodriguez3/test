/**
 * @module Middleware
 */

/**
 * Middleware para validar los roles de un usuario en función de los roles requeridos. 
 * @function
 * @param {Array<String>} requiredRoles Lista de los roles necesarios para acceder a la ruta deseada.
 * @returns {Function} Middleware que valida el rol del usuario
 */
const rolesValidator = (requiredRoles) => {
    return (req, res, next) => {
        if (!req.user || !req.user.rol) {
            return res.status(403).send({ message: 'Access denied. No role found.' });
        }

        if (!requiredRoles.includes(req.user.rol)) {
            return res.status(403).send({ message: 'Access denied. You do not have the required role.' });
        }

        next();
    }
}

export default rolesValidator;