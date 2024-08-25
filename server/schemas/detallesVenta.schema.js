import { z } from "zod";

/**
 * Esquema de validación para los detalles de una venta.
 * 

 * @property {number} venta_Id - Identificador de la venta (requerido y debe ser un número entero positivo).
 * @property {number} producto_Id - Identificador del producto (requerido y debe ser un número entero positivo).
 * @property {number} cantidad - Cantidad del producto en la venta (requerido y debe ser un número positivo).
 * @property {number} precio - Precio unitario del producto (requerido y debe ser un número positivo).
 * @typedef {Object} detallesVentaSchemas
 * @memberof module:Schemas
 * @example
 * // Ejemplo de validación:
 * // const result = saleDetailsSchema.safeParse({
 * //   venta_Id: 1,
 * //   producto_Id: 2,
 * //   cantidad: 5,
 * //   precio: 10.50
 * // });
 * // console.log(result);
 */
export const saleDetailsSchema = z.object({
    venta_Id: z.number({
        required_error: "El venta_Id es requerido",
        invalid_type_error: "El ID de venta debe ser un número entero positivo."
    }).int().positive(),

    producto_Id: z.number({
        required_error: "El producto_Id es requerido",
        invalid_type_error: "El ID de producto debe ser un número entero positivo."
    }).int().positive(),

    cantidad: z.number({
        required_error: "La cantidad del producto es requerida",
        invalid_type_error: "La cantidad debe ser un número positivo."
    }).positive(),

    precio: z.number({
        required_error: "El precio del producto es requerido",
        invalid_type_error: "El precio unitario debe ser un número positivo."
    }).positive()
});

/**
 * Esquema de validación para actualizar los detalles de una venta.
 * @typedef {Object} updateDetallesVentaschemas
 * @memberof module:Schemas
 * @property {number} [venta_Id] - Identificador de la venta (opcional y debe ser un número entero positivo).
 * @property {number} [producto_Id] - Identificador del producto (opcional y debe ser un número entero positivo).
 * @property {number} [cantidad] - Cantidad del producto en la venta (opcional y debe ser un número positivo).
 * @property {number} [precio] - Precio unitario del producto (opcional y debe ser un número positivo).
 * 
 * @example
 * // Ejemplo de validación:
 * // const result = updateSaleDetailsSchema.safeParse({
 * //   producto_Id: 3,
 * //   cantidad: 10
 * // });
 * // console.log(result);
 */
export const updateSaleDetailsSchema = z.object({
    venta_Id: z.number({
        invalid_type_error: "El ID de venta debe ser un número entero positivo."
    }).int().positive().optional(),

    producto_Id: z.number({
        invalid_type_error: "El ID de producto debe ser un número entero positivo."
    }).int().positive().optional(),

    cantidad: z.number({
        invalid_type_error: "La cantidad debe ser un número positivo."
    }).positive().optional(),

    precio: z.number({
        invalid_type_error: "El precio unitario debe ser un número positivo."
    }).positive().optional()
});
