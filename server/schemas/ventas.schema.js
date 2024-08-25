import { z } from "zod";

/**
 * Esquema de validación para una venta.
 * 
 * @constant {ZodSchema} saleSchema
 * @property {number} usuario_Id - ID del usuario (requerido y debe ser un número entero positivo).
 * @property {number} [afiliado_Id] - ID del afiliado (opcional y debe ser un número entero positivo).
 * @property {string} tipo_usuario - Tipo de usuario (requerido y debe ser una cadena no vacía).
 * @property {string} metodo_pago - Método de pago (requerido y debe ser una cadena no vacía).
 * @property {number} total - Total de la venta (requerido y debe ser un número positivo).
 * @property {string} fecha - Fecha de la venta (requerido y debe ser una fecha válida).
 * @typedef {Object} ventasSchemas
 * @memberof module:Schemas
 * @example
 * // Ejemplo de validación:
 * // const result = saleSchema.safeParse({
 * //   usuario_Id: 1,
 * //   afiliado_Id: 2,
 * //   tipo_usuario: "minorista",
 * //   metodo_pago: "tarjeta",
 * //   total: 150.00,
 * //   fecha: "2024-08-10"
 * // });
 * // console.log(result);
 */
export const saleSchema = z.object({
    usuario_Id: z.number().int().positive({
        required_error: "El ID del usuario es requerido.",
        invalid_type_error: "El ID del usuario debe ser un número entero positivo."
    }),
    afiliado_Id: z.number().int().optional({
        invalid_type_error: "El ID del afiliado debe ser un número entero positivo opcional."
    }),
    tipo_usuario: z.string({
        required_error: "El tipo de usuario es requerido.",
        invalid_type_error: "El tipo de usuario debe ser una cadena no vacía."
    }),
    metodo_pago: z.string({
        required_error: "El método de pago es requerido.",
        invalid_type_error: "El método de pago debe ser una cadena no vacía."
    }),
    total: z.number().positive({
        required_error: "El total es requerido.",
        invalid_type_error: "El total debe ser un número positivo."
    }),
    fecha: z.string({
        required_error: "La fecha es requerida.",
        invalid_type_error: "La fecha debe ser una fecha válida."
    }).date()
});

/**
 * Esquema de validación para actualizar una venta.
 * 
 * @typedef {Object} updateventasoSchemas
 * @memberof module:Schemas
 * @property {number} [usuario_Id] - ID del usuario (opcional y debe ser un número entero positivo).
 * @property {number} [afiliado_Id] - ID del afiliado (opcional y debe ser un número entero positivo).
 * @property {string} [tipo_usuario] - Tipo de usuario (opcional y debe ser una cadena no vacía).
 * @property {string} [metodo_pago] - Método de pago (opcional y debe ser una cadena no vacía).
 * @property {number} [total] - Total de la venta (opcional y debe ser un número positivo).
 * @property {string} [fecha] - Fecha de la venta (opcional y debe ser una fecha válida).
 * 
 * @example
 * // Ejemplo de validación:
 * // const result = updateSaleSchema.safeParse({
 * //   total: 200.00,
 * //   fecha: "2024-08-15"
 * // });
 * // console.log(result);
 */
export const updateSaleSchema = z.object({
    usuario_Id: z.number({
        invalid_type_error: "El ID del usuario debe ser un número entero positivo."
    }).int().positive().optional(),
    afiliado_Id: z.number({
        invalid_type_error: "El ID del afiliado debe ser un número entero positivo opcional."
    }).int().optional(),
    tipo_usuario: z.string({
        invalid_type_error: "El tipo de usuario debe ser una cadena no vacía."
    }).optional(),
    metodo_pago: z.string({
        invalid_type_error: "El método de pago debe ser una cadena no vacía."
    }).optional(),
    total: z.number().positive({
        invalid_type_error: "El total debe ser un número positivo."
    }).optional(),
    fecha: z.string({
        invalid_type_error: "La fecha debe ser una fecha válida."
    }).date().optional()
});
