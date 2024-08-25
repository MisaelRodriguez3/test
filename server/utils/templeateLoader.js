import fs from "fs"
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Carga una plantilla de correo electrónico y reemplaza los marcadores de posición con los datos proporcionados.
 * Esta función lee un archivo de plantilla HTML, reemplaza los marcadores de posición con los datos especificados,
 * y genera un bloque HTML para cada objeto en el array `objects`.
 * @function loadTemplate
 * @param {string} fileName - El nombre del archivo de plantilla que se desea cargar.
 * @param {Object} data - Un objeto que contiene los datos para reemplazar en la plantilla.
 * @returns {string} El contenido de la plantilla con los marcadores de posición reemplazados.
 * @memberof module:utils
 */
const loadTemplate = (fileName, data) => {
  const { objects, ...fields } = data;

  const filePath = path.join(__dirname, "../templates", fileName);
  let template = fs.readFileSync(filePath, 'utf-8');

  let products = "";

  for (const key in fields) {
    const placeholder = `{{${key}}}`;
    template = template.replace(new RegExp(placeholder, 'g'), fields[key]);
  }

  data.objects.forEach(obj => {
    products +=
      `<div class="imgproducto-wrapper">
        <div class="imgproducto-text">"${obj.nombre}"</div>
        <img class="imgproducto" src="${obj.imagen}" alt="${obj.nombre}" />
      </div>`;
  });

  template = template.replace("{{producto}}", products);

  return template;
}

export default loadTemplate;
