import empleados from "../models/empleados.model.js";
import createAccesToken from "../libs/jwt.js";
import bcrypt from "bcryptjs"
import roles from "../models/roles.model.js";

export const login = async (req, res) => {
    const { correo, password } = req.body;
    try {
        const userFound = await empleados.findOne({
            attributes: { exculde: "rol_Id" },
            include: {
                model: roles,
                attributes: ["rol"]
            },
            where: { correo: correo }
        })
        if (!userFound) return res.status(404).json({ message: "bad request" })
        const isMatch = await bcrypt.compare(password, userFound.password)
        if (!isMatch) return res.status(404).json({ message: "bad request" })

        const name = userFound.nombre
        const rol = userFound.role.rol

        const token = await createAccesToken({ id: userFound.empleado_Id, rol: userFound.role.rol })
        return res.header("Authorization", `Bearer ${token}`).json({ token, name, rol })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "there was an internal server error" })
    }
}