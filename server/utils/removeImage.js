import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Elimina un archivo de imagen de la ruta especificada.
 * Esta función elimina un archivo en la ruta proporcionada utilizando `fs.unlink`.
 * Si la operación es exitosa, imprime un mensaje en la consola. En caso de error,
 * imprime el error en la consola.
 * @function
 * @param {string} ruta - La ruta del archivo de imagen que se desea eliminar.
 * @returns {void}
 * @memberof module:utils
 */
const removeImage = (ruta) => {
    const pathFile = process.env.NODE_ENV === "dev"
        ? path.join(__dirname, "..", "uploads", path.basename(ruta))
        : ruta

    fs.unlink(pathFile)
        .then(() => {
            console.log('File removed')
        }).catch(err => {
            console.error('Something wrong happened removing the file', err)
        })
}

export default removeImage;