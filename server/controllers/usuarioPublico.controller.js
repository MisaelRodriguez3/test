import { getAllPublicUsers, getOnePublicUser, createPublicUser, updatePublicUser, deletePublicUser } from "../services/usuarioPublico.service.js";

export const getPublicUsers = async (req, res) => {
    try {
        const allPublicUsers = await getAllPublicUsers();
        return res.json(allPublicUsers)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: "There was an internal server error." })
    }
}

export const getPublicUser = async (req, res) => {
    const id = req.params.usuarioPublico_Id;
    try {
        const publicUser = await getOnePublicUser(id);
        if(!publicUser) {
            return res.status(404).json({ error: "This record does not exist." });
        }
        return res.json(publicUser)
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error." })
    }
}

export const addPublicUser = async (req, res) => {
    const data = {
        nombre: req.body.nombre,
        correo: req.body.correo,
        telefono: req.body.telefono
    }
    try {
        const newPublicUser = await createPublicUser(data);
        return res.json(newPublicUser)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: "There was an internal server error." })
    }
}

export const upPublicUser = async (req, res) => {
    const id = req.params.usuarioPublico_Id;
    try {
        await updatePublicUser(id, req.body)
        return res.json({ message: `Usario público con el id ${id} actualizado.` })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: "There was an internal server error." })
    }
}

export const delPublicUser = async (req, res) => {
    const { ids } = req.body;
    try {
        await deletePublicUser(ids);
        return res.json({ message: `El usuario público con el id ${ids} fue eliminado` })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: "There was an internal server error." })
    }
}