import { fileURLToPath } from 'url';
import path from 'path';
import { configDotenv } from 'dotenv';

configDotenv();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Sube una imagen al servidor y devuelve la URL de acceso o la ruta del archivo según el entorno.
 * @function
 * @param {Object} image - Objeto de la imagen a subir, proveniente de la solicitud. Este objeto debe ser compatible con la API de manejo de archivos (por ejemplo, `req.files.image`).
 * @returns {Promise<string>} Una promesa que se resuelve con la URL de acceso de la imagen subida en desarrollo o la ruta del archivo en producción.
 * @memberof module:utils
 */
const uploadImage = (image) => {
    return new Promise((resolve, reject) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(image.name)}`;

        let uploadPath, imageURL;

        if (process.env.NODE_ENV === "dev") {
            uploadPath = path.join(__dirname, "..", "uploads", uniqueName);
            imageURL = `http://localhost:3000/uploads/${uniqueName}`;
        } else {
            uploadPath = path.join("uploads", uniqueName);
            imageURL = path.join("uploads", uniqueName);
        }

        image.mv(uploadPath, (err) => {
            if (err) {
                return reject(err);
            }
            resolve(imageURL);
        });
    });
};

export default uploadImage;