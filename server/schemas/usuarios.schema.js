import { z } from "zod";

/**
 * Esquema de validación para un usuario.
 * 

 * @property {string} nombre - Nombre del usuario (requerido y debe ser un texto).
 * @property {string} usuario - Nombre de usuario (requerido y debe ser un texto).
 * @property {string} correo - Correo electrónico del usuario (requerido y debe ser una dirección de correo electrónico válida).
 * @property {string} password - Contraseña del usuario (requerida y debe ser una cadena de caracteres válida).
 * @property {string} direccion - Dirección del usuario (requerida y debe ser una cadena de caracteres válida).
 * @typedef {Object} usuariosSchemas
 * @memberof module:Schemas
 * @example
 * // Ejemplo de validación:
 * // const result = userSchema.safeParse({
 * //   nombre: "Juan Pérez",
 * //   usuario: "juanp",
 * //   correo: "juan.perez@example.com",
 * //   password: "securepassword",
 * //   direccion: "123 Calle Principal"
 * // });
 * // console.log(result);
 */
export const userSchema = z.object({
    nombre: z.string({
        required_error: "El nombre es requerido.",
        invalid_type_error: "El nombre debe ser un texto."
    }),
    usuario: z.string({
        required_error: "El usuario es requerido.",
        invalid_type_error: "El usuario debe ser un texto."
    }),
    correo: z.string({
        required_error: "El correo es requerido.",
        invalid_type_error: "El correo debe ser una cadena de caracteres válida."
    }).email(),
    password: z.string({
        required_error: "La contraseña es requerida.",
        invalid_type_error: "La contraseña debe ser una cadena de caracteres válida."
    }),
    direccion: z.string({
        required_error: "La dirección es requerida.",
        invalid_type_error: "La dirección debe ser una cadena de caracteres válida."
    })
});

/**
 * Esquema de validación para actualizar un usuario.
 * 
 * @typedef {Object} UpdateusuariosSchemas
 * @memberof module:Schemas
 * @property {string} [nombre] - Nombre del usuario (opcional y debe ser un texto).
 * @property {string} [usuario] - Nombre de usuario (opcional y debe ser un texto).
 * @property {string} [correo] - Correo electrónico del usuario (opcional y debe ser una dirección de correo electrónico válida).
 * @property {string} [password] - Contraseña del usuario (opcional y debe ser una cadena de caracteres válida).
 * @property {string} [direccion] - Dirección del usuario (opcional y debe ser una cadena de caracteres válida).
 * 
 * @example
 * // Ejemplo de validación:
 * // const result = updateUserSchema.safeParse({
 * //   correo: "juan.perez.new@example.com",
 * //   direccion: "456 Calle Secundaria"
 * // });
 * // console.log(result);
 */
export const updateUserSchema = z.object({
    nombre: z.string({
        invalid_type_error: "El nombre debe ser un texto."
    }).optional(),
    usuario: z.string({
        invalid_type_error: "El usuario debe ser un texto."
    }).optional(),
    correo: z.string({
        invalid_type_error: "El correo debe ser una cadena de caracteres válida."
    }).email().optional(),
    password: z.string({
        invalid_type_error: "La contraseña debe ser una cadena de caracteres válida."
    }).optional(),
    direccion: z.string({
        invalid_type_error: "La dirección debe ser una cadena de caracteres válida."
    }).optional()
});
