import nodemailer from "nodemailer"
import { configDotenv } from "dotenv";
import loadTemplate from "../utils/templeateLoader.js";
import recipents from "../utils/recipientFetcher.js";
import { getOnePromotion } from "../services/promociones.service.js";
import { getAllProducts, getProductsByIdsService } from "../services/productos.service.js";

configDotenv();

/**
 * Configura un transporter de Nodemailer para enviar correos electrónicos a través de Gmail.
 * La autenticación se realiza utilizando las credenciales almacenadas en las variables de entorno.
 */
const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    },

});

/**
 * Controlador para enviar correos electrónicos promocionales a una lista de destinatarios.
 * @async
 * @function
 * @param {Number} promocion_Id - El identificador de la prmoción.
 * @param {String} type - Al tipo al que se aplicará la promoción (categorias o productos).
 * @param {Array<Number>} - Lista de todos los items a los que se les aplicará la promoción.
 * @returns {Promise<void>} Responde con un mensaje de éxito o error según el resultado del envío de correo.
 */
const sendMail = async (promocion_Id, type, ids) => {

    const promotion = await getPromoData(promocion_Id)
    const objects = await getObjectsData({ type, ids })
    const information = {
        objects, oferta: promotion.tipo, descripcion: promotion.descripcion,
        fecha_inicio: promotion.fecha_inicio, fecha_fin: promotion.fecha_fin
    }
    const html = loadTemplate("template.html", information)
    const emails = await recipents();

    const mailOptions = {
        from: `Tester <${process.env.EMAIL_USER}>`,
        to: emails,
        subject: "prueba",
        html,
        attachments: [
            {
                filename: "header.png",
                path: `${process.env.BASE_URL}/uploads/fixed/header.png`,
                cid: "header"
            },
            {
                filename: "fb.png",
                path: `${process.env.BASE_URL}/uploads/fixed/fb.png`,
                cid: "fb"
            },
            {
                filename: "x.png",
                path: `${process.env.BASE_URL}/uploads/fixed/x.png`,
                cid: "x"
            },
            {
                filename: "yt.png",
                path: `${process.env.BASE_URL}/uploads/fixed/yt.png`,
                cid: "yt"
            },
            {
                filename: "title.webp",
                path: `${process.env.BASE_URL}/uploads/fixed/title.webp`,
                cid: "tt"
            }
        ]
    }

    try {
        await transporter.sendMail(mailOptions);
        console.log('Correo enviado');
        return console.log('Correo enviado exitosamente');
    } catch (error) {
        return console.error('Error al enviar el correo:', error);        
    }
}

/**
 * Obtiene los datos de una promoción en base a su ID.
 * @async
 * @function
 * @param {number} id - El ID de la promoción.
 * @returns {Promise<Object>} Un objeto que contiene los detalles de la promoción.
 */
async function getPromoData(id) {
    const promo = await getOnePromotion(id);

    let data = { tipo: "", descripcion: "", fecha_inicio: promo.fecha_inicio, fecha_fin: promo.fecha_fin };

    switch (promo.tipo) {
        case "porcentaje_descuento":
            data.tipo = `${promo.descuento}%`;
            data.descripcion = "DE DESCUENTO EN";
            break;

        case "compra_x_paga_y":
            data.tipo = `${promo.comprar_cantidad} x ${promo.pagar_cantidad}`;
            data.descripcion = "EN";
            break;

        case "por_cada_x_te_descontamos_y":
            data.tipo = `Por cada $${promo.por_cada} te descontamos $${promo.descuento}`;
            data.descripcion = "EN";
            break;
    }
    return data;
}

/**
 * Obtiene los datos de objetos relacionados (productos o categorías) en base al tipo y una lista de IDs.
 * @async
 * @function
 * @param {Object} object - El objeto que contiene el tipo de entidad y una lista de IDs.
 * @returns {Promise<Array<Object>>} Una lista de objetos que contienen el nombre y la imagen de los elementos recuperados.
 */
async function getObjectsData(object) {
    let data = [];
  
    switch (object.type) {
      case "productos":
        for (const item of object.ids) {
          const obj = await getProductsByIdsService(item);
          data.push({ nombre: obj.nombre, imagen: obj.imagen });
        }
        break;
      case "categorias":
        const allProducts = await getAllProducts();
        for (const category of object.ids) {
          const representativeProduct = allProducts.find(product => product.dataValues.categoria_Id === category);
          if (representativeProduct) {
            data.push({ nombre: category, imagen: representativeProduct.dataValues.imagen });
          } else {
            data.push({ nombre: category, imagen: null }); // o algún valor predeterminado
          }
        }
        break;
    }
  
    return data;
  }

export default sendMail;