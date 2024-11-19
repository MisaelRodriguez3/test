import { Router } from "express";
import { getPublicUsers, getPublicUser, addPublicUser, upPublicUser, delPublicUser } from "../../controllers/usuarioPublico.controller.js";
import validateSchema from "../../middlewares/validateSchema.middleware.js";
import { publicUserSchema, updatePublicUserSchema } from "../../schemas/usuarioPublico.schema.js";
import verifyToken from "../../middlewares/verifyToken.middlaware.js";
import rolesValidator from "../../middlewares/rolesValidator.middleware.js";

const router = Router();

router
    .get("/usuarios-publicos/:usuarioPublico_Id", verifyToken, rolesValidator(["admin", "director"]), getPublicUser)
    .get("/usuarios-publicos", verifyToken, rolesValidator(["admin", "director"]), getPublicUsers)
    .post("/usuarios-publicos", verifyToken, rolesValidator(["admin", "director"]), validateSchema(publicUserSchema), addPublicUser)
    .put("/usuarios-publicos/:usuarioPublico_Id", verifyToken, rolesValidator(["admin", "director"]), validateSchema(updatePublicUserSchema), upPublicUser)
    .delete("/usuarios-publicos", verifyToken, rolesValidator(["admin", "director"]), delPublicUser);

export default router;