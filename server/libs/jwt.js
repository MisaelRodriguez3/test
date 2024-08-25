import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";

configDotenv();

/**
 * Crea un token de acceso (JWT) basado en el payload proporcionado.
 * Esta función genera un token de acceso utilizando la biblioteca `jsonwebtoken` (JWT). 
 * El token se firma con una clave secreta y tiene una validez de 1 día.
 * @function 
 * @param {Object} payload - Los datos que se incluirán en el token de acceso.
 * @returns {Promise<string>} Una promesa que resuelve con el token de acceso generado.
 * @throws {Error} Lanza un error si la firma del token falla.
 */
function createAccesToken(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: "1d"
        },
            (err, token) => {
                if (err) reject(err);
                resolve(token)
            });
    });
};

export default createAccesToken;