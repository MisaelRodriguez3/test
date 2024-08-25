import { Router } from "express";
import { createOneAfiliado, showAllAfiliados, showAfiliadoById, updateOneAfiliado, deleteAfiliados } from "../../controllers/afiliados.controller.js";
import validateSchema from "../../middlewares/validateSchema.middleware.js";
import { affiliateSchema, updateAffiliateSchema } from "../../schemas/afiliados.schema.js";
import verifyToken from "../../middlewares/verifyToken.middlaware.js";
import rolesValidator from "../../middlewares/rolesValidator.middleware.js";

const router = Router();
router.get("/afiliados/:afiliado_Id", verifyToken, rolesValidator(["admin", "director"]), showAfiliadoById);
router.get("/afiliados", verifyToken, rolesValidator(["admin", "director"]), showAllAfiliados);
router.post("/afiliados", verifyToken, rolesValidator(["admin", "director"]), validateSchema(affiliateSchema), createOneAfiliado);
router.put("/afiliados/:afiliado_Id", verifyToken, rolesValidator(["admin", "director"]), validateSchema(updateAffiliateSchema), updateOneAfiliado);
router.delete("/afiliados", verifyToken, rolesValidator(["admin", "director"]), deleteAfiliados);

export default router;
