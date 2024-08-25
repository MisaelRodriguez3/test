import { Router } from "express";
import { createOneUsuario, showAllUsuarios, showUsuarioById, updateOneUsuario, deleteUsuarios } from "../../controllers/usuarios.controller.js";
import validateSchema from "../../middlewares/validateSchema.middleware.js";
import { userSchema, updateUserSchema } from "../../schemas/usuarios.schema.js";
import verifyToken from "../../middlewares/verifyToken.middlaware.js";
import rolesValidator from "../../middlewares/rolesValidator.middleware.js";

const router = Router();

router
    .get("/usuarios/:usuario_Id", verifyToken, rolesValidator(["admin", "director"]), showUsuarioById)
    .get("/usuarios", verifyToken, rolesValidator(["admin", "director"]), showAllUsuarios)
    .post("/usuarios", verifyToken, rolesValidator(["admin", "director"]), validateSchema(userSchema), createOneUsuario)
    .put("/usuarios/:usuario_Id", verifyToken, rolesValidator(["admin", "director"]), validateSchema(updateUserSchema), updateOneUsuario)
    .delete("/usuarios", verifyToken, rolesValidator(["admin", "director"]), deleteUsuarios);

export default router;
