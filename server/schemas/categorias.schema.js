import { z } from "zod";

/**
 * Esquema de los datos para crear un nuevo registro de `categorias`
 * @typedef {Object} categorySchema
 * @property {String} nombre Nombre de la categoría
 * @memberof module:Schemas
 */

export const categorySchema = z.object({
    nombre: z.string({
        required_error: "El nombre es requerido.",
        invalid_type_error: "El nombre debe ser un texto.",
    })
});

/**
 * Esquema de los datos para actualizar  un registro de `categorias`
 * @typedef {Object} updateCategorySchema
 * @property {String} [nombre] Nombre de la categoría
 * @memberof module:Schemas
 */

export const updateCategorySchema = z.object({
    nombre: z.string({
        invalid_type_error: "El nombre de ser un texto."
    }).optional()
})