import { Router } from "express";
import { getPromotions, getPromotion, addPromotion, upPromotion, delPromotion } from "../../controllers/promociones.controller.js";
import validateSchema from "../../middlewares/validateSchema.middleware.js";
import { promotionSchema, updatePromotionSchema } from "../../schemas/promociones.schema.js";
import verifyToken from "../../middlewares/verifyToken.middlaware.js";
import rolesValidator from "../../middlewares/rolesValidator.middleware.js";

const router = Router();

// Rutas de la tabla `promociones`
router
    // Ruta GET para obtener uno de los registros solo si el token es vá;ido y tiene uno de los roles permitidos
    .get("/promociones/:promocion_Id", verifyToken, rolesValidator(["admin", "director"]), getPromotion)
    // Ruta GET para obtener todos los registros solo si el token es válido y tiene uno de los roles permitidos
    .get("/promociones", verifyToken, rolesValidator(["admin", "director"]), getPromotions)
    // Ruta POST para crear un nuevo registro solo si el token es válido, tiene uno de los roles perimitos y la información es adecuada
    .post("/promociones", verifyToken, rolesValidator(["admin", "director"]), validateSchema(promotionSchema), addPromotion)
    // Ruta PATCH para actualizar un registro solo si el token es válido, tiene uno de los roles permitidos y la información es adecuada
    .patch("/promociones/:promocion_Id", verifyToken, rolesValidator(["admin", "director"]), validateSchema(updatePromotionSchema), upPromotion)
    // Ruta DELETE para eliminar registros solo si el token es válido y tiene uno de los roles permitidos
    .delete("/promociones/", verifyToken, rolesValidator(["admin", "director"]), delPromotion)

export default router;