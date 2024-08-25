import { z } from "zod"

export const rolSchema = z.object({
    rol: z.string({
        required_error: "el nombre del rol es requerido",
        invalid_type_error: "el rol debe de ser un texto"
    })
})

export const updateRolSchema = z.object({
    rol: z.string({
        invalid_type_error: "el rol debe de ser un texto"
    }).optional()
})