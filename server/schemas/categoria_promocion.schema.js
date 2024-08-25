import { z } from "zod";

/**
 * @module Schemas
 */

/**
 * Esquema de los datos para un nuevo registro de `categoria_promocion`
 * @typedef {Object} cpSchema
 * @property {Number} categoria_Id ID de la categoria a la que se aplica la promoción
 * @property {Number} promocion_Id ID de la promoción que se va a aplicar
 * @property {any} imagen Ruta de la imagen relacionada al registro.
 */

export const cpSchema = z.object({
    categoria_Id: z.number({
        required_error: "El id de la categoria es requerido.",
        invalid_type_error: "El id de la categoria debe ser un numero."
    }).positive().int(),

    promocion_Id: z.number({
        required_error: "El id de la promocion es requerido.",
        invalid_type_error: "El id de la promocion debe ser un numero."
    }).positive().int(),

    imagen: z.any()
});

/**
 * Esquema de los datos para actualizar un registro de `categoria_promocion`
 * @typedef {Object} updateCPSchema
 * @property {Number} [categoria_Id] ID de la categoria a la que se aplica la promoción
 * @property {Number} [promocion_Id] ID de la promoción que se va a aplicar
 * @property {any} [imagen] Ruta de la imagen relacionada al registro.
 */

export const updateCPSchema = z.object({
    producto_Id: z.number({
        invalid_type_error: "El id de la categoria debe ser un numero."
    }).positive().int().optional(),

    promocion_Id: z.number({
        invalid_type_error: "El id de la promocion debe ser un numero."
    }).positive().int().optional(),

    imagen: z.any().optional()
});