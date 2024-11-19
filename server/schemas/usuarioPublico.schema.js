import { z } from "zod";

export const publicUserSchema = z.object({
    nombre: z.string({
        required_error: "El nombre es requerido.",
        invalid_type_error: "El nombre debe ser un texto."
    }),
    correo: z.string({
        required_error: "El correo es requerido.",
        invalid_type_error: "El correo debe ser un texto."
    }).email(),
    telefono: z.string({
        required_error: "El teléfono es requerido.",
        invalid_type_error: "El teléfono debe ser un texto."
    })
});

export const updatePublicUserSchema = z.object({
    nombre: z.string({
        invalid_type_error: "El nombre debe ser un texto."
    }).optional(),
    correo: z.string({
        invalid_type_error: "El correo debe ser un texto."
    }).email().optional(),
    telefono: z.string({
        invalid_type_error: "El teléfono debe ser un texto."
    }).optional()
});