import publicUsers from "../models/usuarioPublico.model.js";

export const getAllPublicUsers = async () => {
    try {
        const allPublicUsers = await publicUsers.findAll({
            order: [["usuarioPublico_Id", "ASC"]]
        })
        return allPublicUsers;
    } catch (error) {
        console.error(error)
        throw new Error("Internal Server Error")
    }
}

export const getOnePublicUser = async (id) => {
    try {
        const publicUser = await publicUsers.findByPk(id);
        return publicUser;
    } catch (error) {
        console.error(error)
        throw new Error("Internal Server Error")
    }
}

export const createPublicUser = async (data) => {
    try {
        const newPublicUser = await publicUsers.create(data);
        return newPublicUser;
    } catch (error) {
        console.error(error)
        throw new Error("Internal Server Error")
    }
}

export const updatePublicUser = async (id, data) => {
    try {
        const publicUser = await publicUsers.findByPk(id);

        if (!publicUser) return null;

        const updatedPublicUser = await publicUsers.update(data, { where: { usuarioPublico_Id: id } });
        return updatedPublicUser;
    } catch (error) {
        console.error(error)
        throw new Error("Internal Server Error")
    }
}

export const deletePublicUser = async (id) => {
    try {
        const deletedPublicUser = await publicUsers.destroy({ where: { usuarioPublico_Id: id } });
        return deletedPublicUser;
    } catch (error) {
        console.error(error)
        throw new Error("Internal Server Error")
    }
}