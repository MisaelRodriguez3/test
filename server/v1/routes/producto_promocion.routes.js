import { Router } from "express";
import { getPPs, getPPsByIds, addPP, upPP, delPP } from "../../controllers/producto_promocion.controller.js";
import validateSchema from "../../middlewares/validateSchema.middleware.js";
import { ppSchema, updatePPSchema } from "../../schemas/producto_promocion.schema.js";
import verifyToken from "../../middlewares/verifyToken.middlaware.js";
import rolesValidator from "../../middlewares/rolesValidator.middleware.js";

const router = Router();

// Rutas de la tabla `producto_promocion`
router
    // Ruta GET para obtener uno de los registros solo si el token es vá;ido y tiene uno de los roles permitidos
    .get("productos-promociones/:productoPromos_Ids", verifyToken, rolesValidator(["admin", "director"]), getPPsByIds)
    // Ruta GET para obtener todos los registros solo si el token es válido y tiene uno de los roles permitidos
    .get("/productos-promociones", verifyToken, rolesValidator(["admin", "director"]), getPPs)
    // Ruta POST para crear un nuevo registro solo si el token es válido, tiene uno de los roles perimitos y la información es adecuada
    .post("/productos-promociones", verifyToken, rolesValidator(["admin", "director"]), validateSchema(ppSchema), addPP)
    // Ruta PATCH para actualizar un registro solo si el token es válido, tiene uno de los roles permitidos y la información es adecuada
    .patch("/productos-promociones/:productoPromo_Id", verifyToken, rolesValidator(["admin", "director"]), validateSchema(updatePPSchema), upPP)
    // Ruta DELETE para eliminar registros solo si el token es válido y tiene uno de los roles permitidos
    .delete("/productos-promociones/", verifyToken, rolesValidator(["admin", "director"]), delPP)

export default router;