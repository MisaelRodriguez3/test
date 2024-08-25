import { Router } from "express";
import { createOneVenta, showAllVentas, showVentaById, updateOneVenta, deleteOneVenta } from "../../controllers/ventas.controller.js";
import validateSchema from "../../middlewares/validateSchema.middleware.js";
import { saleSchema, updateSaleSchema } from "../../schemas/ventas.schema.js";
import verifyToken from "../../middlewares/verifyToken.middlaware.js";
import rolesValidator from "../../middlewares/rolesValidator.middleware.js";

const router = Router();

router
    .get("/ventas/:venta_Id", verifyToken, rolesValidator(["admin", "director"]), showVentaById)
    .get("/ventas", verifyToken, rolesValidator(["admin", "director"]), showAllVentas)
    .post("/ventas", verifyToken, rolesValidator(["admin", "director"]), validateSchema(saleSchema), createOneVenta)
    .put("/ventas/:venta_Id", verifyToken, rolesValidator(["admin", "director"]), validateSchema(updateSaleSchema), updateOneVenta)
    .delete("/ventas/", verifyToken, rolesValidator(["admin", "director"]), deleteOneVenta)

export default router;
