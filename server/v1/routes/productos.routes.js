import { Router } from "express";
import { getProducts, getProductsByIds, addProduct, upProduct, delProduct } from "../../controllers/productos.controller.js";
import validateSchema from "../../middlewares/validateSchema.middleware.js";
import { productSchema, updateProductSchema } from "../../schemas/productos.schema.js";
import verifyToken from "../../middlewares/verifyToken.middlaware.js";
import rolesValidator from "../../middlewares/rolesValidator.middleware.js";

const router = Router();

// Rutas de la tabla `productos`
router
    // Ruta GET para obtener uno de los registros solo si el token es vá;ido y tiene uno de los roles permitidos
    .get("/productos/:productosIds", verifyToken, rolesValidator(["admin", "director", "marketing"]), getProductsByIds)
    // Ruta GET para obtener todos los registros solo si el token es válido y tiene uno de los roles permitidos
    .get("/productos", verifyToken, rolesValidator(["admin", "director", "marketing"]), getProducts)
    // Ruta POST para crear un nuevo registro solo si el token es válido, tiene uno de los roles perimitos y la información es adecuada
    .post("/productos", verifyToken, rolesValidator(["admin", "director", "marketing"]), validateSchema(productSchema), addProduct)
    // Ruta PATCH para actualizar un registro solo si el token es válido, tiene uno de los roles permitidos y la información es adecuada
    .put("/productos/:producto_Id", verifyToken, rolesValidator(["admin", "director", "marketing"]), validateSchema(updateProductSchema), upProduct)
    // Ruta DELETE para eliminar registros solo si el token es válido y tiene uno de los roles permitidos
    .delete("/productos/", verifyToken, rolesValidator(["admin", "director", "marketing"]), delProduct)

export default router;