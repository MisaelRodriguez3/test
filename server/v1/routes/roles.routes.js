import { Router } from "express";
import validateSchema from "../../middlewares/validateSchema.middleware.js";
import { rolSchema, updateRolSchema } from "../../schemas/roles.shemas.js";
import { getRoles, getRol, addRol, upRol, delRol } from "../../controllers/roles.controller.js";
import verifyToken from "../../middlewares/verifyToken.middlaware.js";
import rolesValidator from "../../middlewares/rolesValidator.middleware.js";

const router = Router()

router
    .get("/roles/:rol_Id", verifyToken, rolesValidator(["director"]), getRol)
    .get("/roles", verifyToken, rolesValidator(["director", ]), getRoles)
    .post("/roles", verifyToken, rolesValidator(["director"]), validateSchema(rolSchema), addRol)
    .patch("/roles/:rol_Id", verifyToken, rolesValidator(["director"]), validateSchema(updateRolSchema), upRol)
    .delete("/roles/:rol_Id", verifyToken, rolesValidator(["director"]), delRol)

export default router;