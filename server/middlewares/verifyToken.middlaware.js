import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";

configDotenv();

/**
 * Middleware para verificar el token JWT en el encabezado de autorización de la solicitud.
 * @function
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 * @param {Function} next - La función que llama al siguiente middleware.
 * @returns {void} Si el token es válido, continúa con la siguiente función de middleware. 
 * De lo contrario, responde con un estado de error.
 * @memberof module:Middleware
 */
const verifyToken = (req, res, next) => {
    const header = req.header("Authorization");
    if (!header) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const token = header.split(" ")[1];
    if (!header) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Invalid Token" });
        }
        req.user = user;
    })
    next();
}

export default verifyToken;