import { z } from "zod";

/**
 * Esquema de los datos para crear un nuevo registro de `promociones`
 * @typedef {Object} promotionSchema
 * @property {String} nombre Nombre de la promoción
 * @property {String} tipo Tipo de promoción
 * @property {Number} [descuento] Porcentaje de decuento (`porcentaje_descuento`) o precio a reducir (`por_cada_x_te_descontamos_y`)
 * @property {Number} [comprar_cantidad] Cantidad a comprar para aplicar la promoción `compra_x_paga_y`
 * @property {Number} [pagar_cantidad] Cantidad a pagar en la promoción `compra_x_paga_y`
 * @property {Number} [por_cada] Cantidad de dinero a gastar para aplicar la promción `por_cada_x_te_descontamos_y`
 * @property {Date} fecha_inicio Fecha en la que inicia la promoción
 * @property {Date} fecha_fin Fecha en la que termina la promoción
 * @memberof module:Schemas
 */

export const promotionSchema = z.object({
    nombre: z.string({
        required_error: "El nombre es requerido.",
        invalid_type_error: "El nombre debe ser un texto."
    }),

    tipo: z.string({
        required_error: "El tipo es requerido.",
        invalid_type_error: "El tipo debe ser una de las opciones correspondientes."
    }),

    descuento: z.number({
        invalid_type_error: "El descuento debe ser un numero."
    }).nonnegative().optional(),

    comprar_cantidad: z.number({
        invalid_type_error: "Comprar cantidad debe ser un numero."
    }).nonnegative().optional(),

    pagar_cantidad: z.number({
        invalid_type_error: "Pagar cantidad debe ser un numero."
    }).nonnegative().optional(),

    por_cada: z.number({
        invalid_type_error: "Por cada debe ser un numero."
    }).nonnegative().optional(),

    fecha_inicio: z.string({
        required_error: "La fecha inicio es requerida.",
        invalid_type_error: "La fecha debe ser un texto y tener el formato yyyy-mm-dd"
    }).date(),

    fecha_fin: z.string({
        required_error: "La fecha fin es requerida.",
        invalid_type_error: "La fecha fin debe ser un texto y tener el formato yyyy-mm-dd"
    }).date()
});

/**
 * Esquema de los datos para actualizar un registro de `promociones`
 * @typedef {Object} updatePromotionSchema
 * @property {String} [nombre] Nombre de la promoción
 * @property {String} [tipo] Tipo de promoción
 * @property {Number} [descuento] Porcentaje de decuento (`porcentaje_descuento`) o precio a reducir (`por_cada_x_te_descontamos_y`)
 * @property {Number} [comprar_cantidad] Cantidad a comprar para aplicar la promoción `compra_x_paga_y`
 * @property {Number} [pagar_cantidad] Cantidad a pagar en la promoción `compra_x_paga_y`
 * @property {Number} [por_cada] Cantidad de dinero a gastar para aplicar la promción `por_cada_x_te_descontamos_y`
 * @property {Date} [fecha_inicio] Fecha en la que inicia la promoción
 * @property {Date} [fecha_fin] Fecha en la que termina la promoción
 * @memberof module:Schemas
 */

export const updatePromotionSchema = z.object({
    nombre: z.string({
        invalid_type_error: "El nombre debe ser un texto."
    }).optional(),

    tipo: z.string({
        invalid_type_error: "El tipo debe ser una de las opciones correspondientes."
    }).optional(),

    descuento: z.number({
        invalid_type_error: "El descuento debe ser un numero."
    }).nonnegative().optional(),

    comprar_cantidad: z.number({
        invalid_type_error: "Comprar cantidad debe ser un numero."
    }).nonnegative().optional(),

    pagar_cantidad: z.number({
        invalid_type_error: "Pagar cantidad debe ser un numero."
    }).nonnegative().optional(),

    por_cada: z.number({
        invalid_type_error: "Por cada debe ser un numero."
    }).nonnegative().optional(),

    fecha_inicio: z.string({
        invalid_type_error: "La fecha debe ser un texto y tener el formato yyyy-mm-dd"
    }).date().optional(),

    fecha_fin: z.string({
        invalid_type_error: "La fecha fin debe ser un texto y tener el formato yyyy-mm-dd"
    }).date().optional()
});