/**
 * Middleware para validar el cuerpo de la solicitud (`req.body`) contra un esquema de validación.
 * @function
 * @param {Object} schema - El esquema de validación, generalmente definido con una biblioteca como Zod o Joi.
 * @returns {Function} Middleware que valida `req.body` contra el esquema proporcionado.
 * @memberof module:Middleware
 */
const validateSchema = (schema) => (req, res, next) => {
    try {
        schema.safeParse(req.body);
        next()
    } catch (error) {
        return res.status(400).json({ error: error.errors.map((error) => error.message) });
    }
}

export default validateSchema;