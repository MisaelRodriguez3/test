import { Router } from "express";
import { createOneDetallesVenta, showAllDetallesVenta, showDetallesVentaById, updateOneDetallesVenta, deleteOneDetallesVenta } from "../../controllers/detallesVenta.controller.js"; // Cambiados los nombres de las funciones
import validateSchema from "../../middlewares/validateSchema.middleware.js";
import { saleDetailsSchema, updateSaleDetailsSchema } from "../../schemas/detallesVenta.schema.js";
import verifyToken from "../../middlewares/verifyToken.middlaware.js";
import rolesValidator from "../../middlewares/rolesValidator.middleware.js";

const router = Router();

router
    .get("/detalles-venta/:detallesVenta_Id", verifyToken, rolesValidator(["admin", "director"]), showDetallesVentaById)
    .get("/detalles-venta", verifyToken, rolesValidator(["admin", "director"]), showAllDetallesVenta)
    .post("/detalles-venta", verifyToken, rolesValidator(["admin", "director"]), validateSchema(saleDetailsSchema), createOneDetallesVenta)
    .put("/detalles-venta/:detallesVenta_Id", verifyToken, rolesValidator(["admin", "director"]), validateSchema(updateSaleDetailsSchema), updateOneDetallesVenta)
    .delete("/detalles-venta/", verifyToken, rolesValidator(["admin", "director"]), deleteOneDetallesVenta);

export default router;
