import {
  getAllCP,
  getCPServices,
  createCP,
  updateCP,
  deleteCP,
} from "../services/categoria_promocion.service.js";
import sendMail from "../mail/send_mail.js";

/**
 * @module Controllers
 */

/**
 * @module categoria_promocion
 * @memberof module:Controllers
 */

/**
 * Controlador para manejar la solicitud de obtener todos los registros de `categoria_promocion`
 * @function
 * @async
 * @param {Object} req Objeto de la solicitud HTTP
 * @param {Object} res Objeto de la respuesta HTTP
 * @returns {Promise<void>} Retorna el resultado de la llamada al servicio `getAllCP` si todo sale bien y si falla
 * muestra el error en la consola y retorna un mensaje de error.
 */
export const getCPs = async (req, res) => {
  try {
    const allCPs = await getAllCP();
    return res.json(allCPs);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "There was an internal server error." });
  }
};

/**
 * Controlador para manejar la solicitud de obtener un registro de `categoria_promocion`.
 * @function
 * @async
 * @param {Object} req Objeto de la solicitud HTTP
 * @param {Object} res Objeto de la respuesta HTTP
 * @returns {Promise<void>} Retorna el resultado de la llamada al servicio `getOneCP` si todo sale bien y si falla
 * muestra el error en la consola y retorna un mensaje de error.
 */
export const getCP = async (req, res) => {
  const id = req.params.categoriaPromo_Id;
  try {
    const cp = await getCPServices(id);
    if (!cp) {
      return res.status(404).json({ error: "This record does not exist." });
    }
    return res.json(cp);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "There was an internal server error." });
  }
};

/**
 * Controlador para manejar la solicitud de crear un nuevo registro de `categoria_promocion`.
 * @function
 * @async
 * @param {Object} req Objeto de la solicitud HTTP
 * @param {Object} res Objeto de la respuesta HTTP
 * @returns {Promise<void>} Retorna el resultado de la llamada al servicio `createCP` si todo sale bie, y si falla
 * muestra el error en la consola y retorna un mensaje de error.
 */
export const addCP = async (req, res) => {
  try {
    const newCP = await createCP(req.body);
    if (newCP && newCP.dataValues && newCP.dataValues.promocion_Id) {
      await sendMail(newCP.dataValues.promocion_Id, "categorias", [
        newCP.dataValues.categoria_Id,
      ]);
      return res.json(newCP);
    } else {
      return res.status(400).json({ error: "Invalid request" });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "There was an internal server error." });
  }
};

/**
 * Controlador para manejar la solicitud de actualizar un registro de `categoria_promocion`
 * @function
 * @async
 * @param {Object} req Objeto de la solicitud HTTP
 * @param {Object} res Obejeto de la respuesta HTTP
 * @returns {Promise<void>} Retorna un mensaje de éxito si todo sale bien, y si falla muestra el error en la consola
 * y retorna un mensaje de error.
 */
export const upCP = async (req, res) => {
  const id = req.params.categoriaPromo_Id;
  try {
    const updatedCp = await updateCP(id);
    if (!updatedCp) {
      return res.status(404).json({ error: "This record does not exist." });
    }
    return res.json({
      message: `Categoria promocion con el id ${id} actualizada.`,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "There was an internal server error." });
  }
};

/**
 * Controlador para manejar la solicitud de eliminar registros de `categoria_promocion`
 * @function
 * @async
 * @param {Object} req Objeto de la solicitud HTTP
 * @param {Object} res Objeto de la respuesta HTTP
 * @returns {Promise<void>} Retorna un mensaje de éxito si todo sale bien, y si falla muestra el error en la consola
 * y retorna un mensaje de error.
 */
export const delCP = async (req, res) => {
  const { ids } = req.body;
  try {
    await deleteCP(ids);
    return res.json({ message: `Categoria Promocion eliminada.` });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "There was an internal server error." });
  }
};
