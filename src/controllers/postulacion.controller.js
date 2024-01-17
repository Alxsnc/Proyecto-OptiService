import { Postulacion } from "../models/postulacion.model.js";
import { Publicacion } from "../models/publicacion.model.js";
import { UsuarioRol } from "../models/usuarioRol.model.js";

export const createPostulacion = async (req, res) => {
  try {
    // Validación de datos
    const { id_publicacion, id_empleado } = req.body;

    // Verificar campos requeridos
    if (!id_publicacion || !id_empleado) {
      return res.status(400).json({
        error: "Todos los campos son obligatorios",
      });
    }

    // Verificar si la publicación existe
    const publicacion = await Publicacion.findOne({
      where: {
        id_publicacion: id_publicacion,
      },
    });

    if (!publicacion) {
      return res
        .status(404)
        .json({ error: "La publicación seleccionada no existe" });
    }

    // Verificar si el usuario es un empleado
    const checkUser = await UsuarioRol.findOne({
      where: {
        id_usuario: id_empleado,
        id_rol: 3,
      },
    });

    if (!checkUser) {
      return res
        .status(404)
        .json({ error: "El usuario seleccionado no es un empleado" });
    }

    // Crear postulación
    const postulacion = await Postulacion.create({
      id_publicacion,
      id_estado_postulacion: 1, //Todas las postulaciones se crean con estado pendiente (1)
      id_empleado: checkUser.id_usuario_rol,
    });

    // Respuesta Servidor
    res.status(201).json({
      message: "Postulación creada exitosamente.",
      postulacion,
    });
  } catch (error) {
    res.status(500).json({
      error: "Ocurrió un error al crear la postulación.",
    });
  }
};

export const getPostulaciones = async (req, res) => {
  try {
    const postulaciones = await Postulacion.findAll({
      include: [
        {
          model: Publicacion,
          as: "publicacion",
          attributes: ["id_publicacion", "titulo", "descripcion"],
        },
        {
          model: UsuarioRol,
          as: "empleado",
          attributes: ["id_usuario_rol"],
        },
      ],
    });

    res.status(200).json({
      postulaciones,
    });
  } catch (error) {
    res.status(500).json({
      error: "Ocurrió un error al obtener las postulaciones.",
    });
  }
};
