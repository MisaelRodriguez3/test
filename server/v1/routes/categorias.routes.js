import { Router } from "express";
import { getCategories, getCategory, addCategory, upCategory, delCategory } from "../../controllers/categorias.controller.js";
import validateSchema from "../../middlewares/validateSchema.middleware.js";
import { categorySchema, updateCategorySchema } from "../../schemas/categorias.schema.js";
import verifyToken from "../../middlewares/verifyToken.middlaware.js";
import rolesValidator from "../../middlewares/rolesValidator.middleware.js";

const router = Router();

// Rutas de la tabla `categorias`
router
    // Ruta GET para obtener uno de los registros solo si el token es vá;ido y tiene uno de los roles permitidos
    .get("/categorias/:categoria_Id", verifyToken, rolesValidator(["admin", "director", "marketing"]), getCategory)
    // Ruta GET para obtener todos los registros solo si el token es válido y tiene uno de los roles permitidos
    .get("/categorias", verifyToken, rolesValidator(["admin", "director", "marketing"]), getCategories)
    // Ruta POST para crear un nuevo registro solo si el token es válido, tiene uno de los roles perimitos y la información es adecuada
    .post("/categorias", verifyToken, rolesValidator(["admin", "director", "marketing"]), validateSchema(categorySchema), addCategory)
    // Ruta PATCH para actualizar un registro solo si el token es válido, tiene uno de los roles permitidos y la información es adecuada
    .patch("/categorias/:categoria_Id", verifyToken, rolesValidator(["admin", "director", "marketing"]), validateSchema(updateCategorySchema), upCategory)
    // Ruta DELETE para eliminar registros solo si el token es válido y tiene uno de los roles permitidos
    .delete("/categorias/", verifyToken, rolesValidator(["admin", "director", "marketing"]), delCategory)

export default router;