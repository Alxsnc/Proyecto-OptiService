import { Usuario } from "../models/usuario.model.js";
import { UsuarioRol } from "../models/usuarioRol.model.js";

//Eliminar usuario
export const deleteUser = async (req, res) => {
  try {
    //validacion de datos
    const id_usuario = req.params.id;

    //verificar si la cedula ya existe
    const usuarioExistente = await Usuario.findOne({
      where: { id_usuario: id_usuario },
    });

    if (!usuarioExistente) {
      return res.status(400).json({ error: "El usuario no existe" });
    }

    // Eliminar roles asociados al usuario
    await UsuarioRol.destroy({
      where: {
        id_usuario,
      },
    });

    //eliminar usuario
    await Usuario.destroy({
      where: {
        id_usuario,
      },
    });

    //Devolver respuesta adecuada
    return res.status(200).json({
      message: "Usuario eliminado exitosamente",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error al eliminar el usuario",
    });
  }
};

//Listar usuarios
export const getUsers = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      attributes: { exclude: ["contrasena"] },
    });

    return res.status(200).json({
      message: "Usuarios listados exitosamente",
      data: usuarios,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error al listar los usuarios",
    });
  }
};

//Obtener usuario por su id (cedula)
export const getUserById = async (req, res) => {
  try {
    const id_usuario = req.params.id;

    const usuario = await Usuario.findOne({
      where: { id_usuario: id_usuario },
      attributes: { exclude: ["contrasena"] },
    });

    if (!usuario) {
      return res.status(400).json({ error: "El usuario no existe" });
    }

    return res.status(200).json({
      message: "Usuario encontrado exitosamente",
      data: usuario,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error al obtener el usuario",
    });
  }
};

//Actualizar usuario
export const updateUser = async (req, res) => {
  try {
    //validacion de datos
    const id_usuario = req.params.id;
    const { nombre, apellido, fecha_nac } = req.body;

    //verificar si la cedula ya existe
    const usuarioExistente = await Usuario.findOne({
      where: { id_usuario: id_usuario },
    });

    if (!usuarioExistente) {
      return res.status(400).json({ error: "El usuario no existe" });
    }

    //actualizar usuario
    //Establecer los campos que son necesarios para actualizar
    await Usuario.update(
      {
        nombre,
        apellido,
        fecha_nac,
      },
      {
        where: {
          id_usuario,
        },
      }
    );

    //Devolver respuesta adecuada
    return res.status(200).json({
      message: "Usuario actualizado exitosamente",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error al actualizar el usuario",
    });
  }
};



