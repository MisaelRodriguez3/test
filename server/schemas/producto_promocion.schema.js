import { z } from "zod";

/**
 * Esquema de los datos para crear un nuevo registro de `producto_promocion`
 * @typedef {Object} ppSchema
 * @property {Number} producto_Id ID del producto al que se le va aplicar la promoción
 * @property {Number} promocion_Id ID de la promoción a aplicar
 * @property {String} imagen Ruta de la imagen relacionada al registro
 * @memberof module:Schemas
 */

export const ppSchema = z.object({
    producto_Id: z.number({
        required_error: "El id del producto es requerido.",
        invalid_type_error: "El id del producto debe ser un numero."
    }).positive().int(),

    promocion_Id: z.number({
        required_error: "El id de la promocion es requerido.",
        invalid_type_error: "El id de la promocion debe ser un numero."
    }).positive().int(),

    imagen: z.any()
});

/**
 * Esquema de los datos para actualizar un registro de `producto_promocion`
 * @typedef {Object} updatePPSchema
 * @property {Number} [producto_Id] ID del producto al que se le va aplicar la promoción
 * @property {Number} [promocion_Id] ID de la promoción a aplicar
 * @property {String} [imagen] Ruta de la imagen relacionada al registro
 * @memberof module:Schemas
 */

export const updatePPSchema = z.object({
    producto_Id: z.number({
        invalid_type_error: "El id del producto debe ser un numero."
    }).positive().int().optional(),

    promocion_Id: z.number({
        invalid_type_error: "El id de la promocion debe ser un numero."
    }).positive().int().optional(),

    imagen: z.any().optional()
});