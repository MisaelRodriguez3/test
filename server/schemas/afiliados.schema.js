import { z } from "zod";

/**
 * Esquema de validación para crear un afiliado.
 * 

 * @property {string} [nombre_empresa] - Nombre de la empresa del afiliado (opcional).
 * @property {string} nombre_persona - Nombre de la persona del afiliado (requerido).
 * @property {string} correo - Correo electrónico del afiliado (requerido y debe ser una dirección de correo válida).
 * @property {string} telefono - Teléfono del afiliado (requerido).
 * @property {string} direccion - Dirección del afiliado (requerido).
 * @property {string} [birthday] - Fecha de cumpleaños del afiliado (opcional).
 * @property {number} [descuento_porcentaje] - Porcentaje de descuento asociado al afiliado (opcional).
 * @typedef {Object} afiliadoSchemas
 * @memberof module:Schemas
 * @example
 * // Ejemplo de validación:
 * // const result = affiliateSchema.safeParse({
 * //   nombre_persona: "Juan Pérez",
 * //   correo: "juan.perez@example.com",
 * //   telefono: "123456789",
 * //   direccion: "Calle Ejemplo 456",
 * //   birthday: "1990-05-15",
 * //   descuento_porcentaje: 10
 * // });
 * // console.log(result);
 */
export const affiliateSchema = z.object({
    nombre_empresa: z.string({
        invalid_type_error: "El nombre de la empresa debe ser un texto."
    }).optional(),
    nombre_persona: z.string({
        required_error: "El nombre es requerido.",
        invalid_type_error: "El nombre debe ser un texto."
    }),
    correo: z.string({
        required_error: "El email es requerido.",
        invalid_type_error: "El email debe ser una cadena de caracteres válida."
    }).email({
        invalid_type_error: "El email debe ser una dirección de correo electrónico válida."
    }),
    telefono: z.string({
        required_error: "El teléfono es requerido.",
        invalid_type_error: "El teléfono debe ser una cadena de caracteres válida."
    }),
    direccion: z.string({
        required_error: "La dirección es requerida.",
        invalid_type_error: "La dirección debe ser una cadena de caracteres válida."
    }),
    birthday: z.string({
        invalid_type_error: "El cumpleaños debe ser una cadena de caracteres válida."
    }).optional(),
    descuento_porcentaje: z.number({
        invalid_type_error: "El descuento porcentaje debe ser un número."
    }).optional()
});

/**
 * Esquema de validación para actualizar un afiliado.
 * 

 * @property {string} [nombre_empresa] - Nombre de la empresa del afiliado (opcional).
 * @property {string} [nombre_persona] - Nombre de la persona del afiliado (opcional).
 * @property {string} [email] - Correo electrónico del afiliado (opcional y debe ser una dirección de correo válida).
 * @property {string} [telefono] - Teléfono del afiliado (opcional).
 * @property {string} [direccion] - Dirección del afiliado (opcional).
 * @property {string} [birthday] - Fecha de cumpleaños del afiliado (opcional).
 * @property {number} [descuento_porcentaje] - Porcentaje de descuento asociado al afiliado (opcional).
 * @typedef {Object} UpdateafiliadoSchemas
 * @memberof module:Schemas
 * @example
 * // Ejemplo de validación:
 * // const result = updateAffiliateSchema.safeParse({
 * //   email: "nuevo.email@example.com",
 * //   telefono: "987654321"
 * // });
 * // console.log(result);
 */
export const updateAffiliateSchema = z.object({
    nombre_empresa: z.string({
        invalid_type_error: "El nombre de la empresa debe ser un texto."
    }).optional(),
    nombre_persona: z.string({
        invalid_type_error: "El nombre de la persona debe ser un texto."
    }).optional(),
    email: z.string({
        invalid_type_error: "El email debe ser una dirección de correo electrónico válida."
    }).email().optional(),
    telefono: z.string({
        invalid_type_error: "El teléfono debe ser una cadena de caracteres válida."
    }).optional(),
    direccion: z.string({
        invalid_type_error: "La dirección debe ser una cadena de caracteres válida."
    }).optional(),
    birthday: z.string({
        invalid_type_error: "El cumpleaños debe ser una cadena de caracteres válida."
    }).optional(),
    descuento_porcentaje: z.number({
        invalid_type_error: "El descuento porcentaje debe ser un número."
    }).optional()
});
