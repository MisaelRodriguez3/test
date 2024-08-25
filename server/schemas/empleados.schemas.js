import { z } from "zod";

/**
 * Esquema de validación para un empleado.
 * 
 * @typedef {Object} EmpleadoSchema
 * @property {string} nombre - El nombre del empleado.
 * @property {string} correo - El correo electrónico del empleado.
 * @property {string} password - La contraseña del empleado.
 * @property {*} imagen - La imagen del empleado.
 * @property {number} rol_Id - El ID del rol del empleado.
 */
export const empleadoSchema = z.object({
    nombre: z.string({
        required_error: "El nombre del empleado es requerido",
        invalid_type_error: "El nombre debe ser un texto"
    }),
    correo: z.string({
        required_error: "El correo debe ser Requerido",
        invalid_type_error: "El correo debe ser Valido"
    }).email(),
    password: z.string({
        required_error: "La contraseña debe de ser Requerida",
        invalid_type_error: "La contraseña debe ser Alfa numerica"
    }),
    imagen: z.any({ required_error: "la imagen es requerida" }),
    rol_Id: z.number({
        required_error: "El rol es requerido",
        invalid_type_error: "El rol debe ser un numero"
    }).positive().int()
});

/**
 * Esquema de validación para actualizar un empleado.
 * 
 * @typedef {Object} UpdateEmpleadoSchema
 * @property {string} [nombre] - El nombre del empleado.
 * @property {string} [correo] - El correo electrónico del empleado.
 * @property {string} [password] - La contraseña del empleado.
 * @property {*} [imagen] - La imagen del empleado.
 * @property {number} [rol_Id] - El ID del rol del empleado.
 */
export const updateEmpleadoSchema = z.object({
    nombre: z.string({
        invalid_type_error: "El nombre debe ser un texto"
    }).optional(),
    correo: z.string({
        invalid_type_error: "El correo debe ser Valido"
    }).email().optional(),
    password: z.string({
        invalid_type_error: "La contraseña debe ser Alfa numerica"
    }).optional(),
    imagen: z.any({ required_error: "la imagen es requerida" }).optional(),
    rol_Id: z.number({
        invalid_type_error: "El rol debe ser un numero"
    }).positive().int().optional()
});