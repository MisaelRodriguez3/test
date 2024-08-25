import { Router } from "express";
import { getCPs, getCP, addCP, upCP, delCP } from "../../controllers/categoria_promocion.controller.js";
import validateSchema from "../../middlewares/validateSchema.middleware.js";
import { cpSchema, updateCPSchema } from "../../schemas/categoria_promocion.schema.js";
import verifyToken from "../../middlewares/verifyToken.middlaware.js";
import rolesValidator from "../../middlewares/rolesValidator.middleware.js";

const router = Router();

// Rutas de la tabla `categoria_promocion`
router
    // Ruta GET para obtener uno de los registros solo si el token es vá;ido y tiene uno de los roles permitidos
    .get("/categorias-promociones/:categoriaPromo_Id", verifyToken, rolesValidator(["admin", "director"]), getCP)
    // Ruta GET para obtener todos los registros solo si el token es válido y tiene uno de los roles permitidos
    .get("/categorias-promociones", verifyToken, rolesValidator(["admin", "director"]), getCPs)
    // Ruta POST para crear un nuevo registro solo si el token es válido, tiene uno de los roles perimitos y la información es adecuada
    .post("/categorias-promociones", verifyToken, rolesValidator(["admin", "director"]), validateSchema(cpSchema), addCP)
    // Ruta PATCH para actualizar un registro solo si el token es válido, tiene uno de los roles permitidos y la información es adecuada
    .patch("/categorias-promociones/:categoriaPromo_Id", verifyToken, rolesValidator(["admin", "director"]), validateSchema(updateCPSchema), upCP)
    // Ruta DELETE para eliminar registros solo si el token es válido y tiene uno de los roles permitidos
    .delete("/categorias-promociones/", verifyToken, rolesValidator(["admin", "director"]), delCP)

export default router;