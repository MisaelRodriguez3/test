import { z } from "zod";

/**
 * Esquema de los datos para crear un nuevo registro de `productos`
 * @typedef {Object} productSchema
 * @property {String} nombre Nombre del producto
 * @property {String} descripcion Descripción del producto
 * @property {Number} precio Precio del producto
 * @property {Number} stock Cantidad disponible del producto
 * @property {String} imagen Ruta de la imagen del producto
 * @property {Number} categoria_Id ID de la categoría a la que pertence el producto
 * @memberof module:Schemas
 */

export const productSchema = z.object({
    nombre: z.string({
        required_error: "El nombre es requerido.",
        invalid_type_error: "El nombre debe ser un texto."
    }),

    descripcion: z.string({
        required_error: "La descripcion es requerida.",
        invalid_type_error: "La descripcion debe ser un texto."
    }),

    precio: z.number({
        required_error: "El precio es requerido.",
        invalid_type_error: "El precio debe ser un numero positivo."
    }).positive(),

    stock: z.number({
        required_error: "El stock es requerido.",
        invalid_type_error: "El stock debe ser un numero entero."
    }).nonnegative().int(),

    categoria_Id: z.number({
        required_error: "El stock es requerido.",
        invalid_type_error: "El stock debe ser un numero entero."
    }).nonnegative().int(),

    imagen: z.any({
        required_error: "La imagen es requerida."
    })
});


/**
 * Esquema de los datos para cactualizar un registro de `productos`
 * @typedef {Object} updateProductSchema
 * @property {String} [nombre] Nombre del producto
 * @property {String} [descripcion] Descripción del producto
 * @property {Number} [precio] Precio del producto
 * @property {Number} [stock] Cantidad disponible del producto
 * @property {String} [imagen] Ruta de la imagen del producto
 * @property {Number} [categoria_Id] ID de la categoría a la que pertence el producto
 * @memberof module:Schemas
 */

export const updateProductSchema = z.object({
    nombre: z.string({
        invalid_type_error: "El nombre debe ser un texto."
    }).optional(),

    descripcion: z.string({
        invalid_type_error: "La descripcion debe ser un texto."
    }).optional(),

    precio: z.number({
        invalid_type_error: "El precio debe ser un numero positivo."
    }).positive().optional(),

    stock: z.number({
        invalid_type_error: "El stock debe ser un numero entero."
    }).nonnegative().int().optional(),

    categoria_Id: z.number({
        required_error: "El stock es requerido.",
        invalid_type_error: "El stock debe ser un numero entero."
    }).nonnegative().int().optional(),

    imagen: z.any().optional()
})