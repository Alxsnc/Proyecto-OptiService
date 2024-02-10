import { Publicacion } from "../models/publicacion.model.js";
import { Categoria } from "../models/categoria.model.js";
import { UsuarioRol } from "../models/usuarioRol.model.js";
import { Postulacion } from "../models/postulacion.model.js";
import { Usuario } from "../models/usuario.model.js";

//Crear Publicacion
export const createPublicacion = async (req, res) => {
  try {
    // Validación de datos
    const {
      titulo,
      descripcion,
      pago,
      id_categoria,
      provincia,
      ciudad,
      id_usuario,
    } = req.body;

    // Verificar campos requeridos
    if (
      !titulo ||
      !descripcion ||
      !pago ||
      !id_categoria ||
      !provincia ||
      !ciudad
    ) {
      return res.status(400).json({
        error: "Todos los campos son obligatorios",
      });
    }

    // Buscar el id de la categoría correspondiente al nombre proporcionado
    const categoria = await Categoria.findOne({
      where: {
        id_categoria: id_categoria,
      },
    });

    // Verificar si la categoría existe
    if (!categoria) {
      return res
        .status(404)
        .json({ error: "La categoría seleccionada no existe" });
    }

    // Verificar si el usuario es un empleador
    const checkUser = await UsuarioRol.findOne({
      where: {
        id_usuario: id_usuario,
        id_rol: 2,
      },
    });

    if (!checkUser) {
      return res
        .status(404)
        .json({ error: "El usuario seleccionado no es un empleador" });
    }

    // Crear publicación
    const publicacion = await Publicacion.create({
      titulo,
      descripcion,
      pago,
      id_categoria: id_categoria,
      id_estado_publicacion: 1, //Todas las publicaciones se crean con estado Activa (1)
      provincia,
      ciudad,
      id_empleador: checkUser.id_usuario_rol,
    });

    // Respuesta
    res.status(201).json({
      message: "Publicación creada exitosamente.",
      publicacion,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Listar publicaciones cerradas por usuario
export const getPublicacionesCerradasUsuario = async (req, res) => {
  try {
    const id_usuario = req.params.id_usuario;

    const checkEmpleador = await UsuarioRol.findOne({
      where: {
        id_usuario: id_usuario,
        id_rol: 2,
      },
    });

    const publicaciones = await Publicacion.findAll({
      where: {
        id_empleador: checkEmpleador.id_usuario_rol,
        id_estado_publicacion: 3,
      },
    });
    res.json({
      publicaciones,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener una publicación por su ID
export const getPublicacionById = async (req, res) => {
  try {
    const id_publicacion = req.params.id;
    const publicacion = await Publicacion.findOne({
      attributes: [
        "id_publicacion",
        "titulo",
        "descripcion",
        "pago",
        "id_categoria",
        "provincia",
        "ciudad",
      ],
      where: { id_publicacion: id_publicacion },
    });
    res.json({
      publicacion,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener publicaciones activas por usuario
export const getPublicacionesActivasUsuario = async (req, res) => {
  try {
    const id_usuario = req.params.id_usuario;

    const checkEmpleador = await UsuarioRol.findOne({
      where: {
        id_usuario: id_usuario,
        id_rol: 2,
      },
    });

    const publicaciones = await Publicacion.findAll({
      where: {
        id_empleador: checkEmpleador.id_usuario_rol,
        id_estado_publicacion: 1,
      },
    });
    res.json({
      publicaciones,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar una publicación
export const updatePublicacion = async (req, res) => {
  try {
    const id_publicacion = req.params.id;
    const { titulo, descripcion, pago, id_categoria, provincia, ciudad } =
      req.body;

    // Verificar campos requeridos
    if (
      !titulo ||
      !descripcion ||
      !pago ||
      !id_categoria ||
      !provincia ||
      !ciudad
    ) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios" });
    }

    // Buscar la publicación que se va a actualizar
    const publicacion = await Publicacion.findOne({
      where: { id_publicacion: id_publicacion },
    });

    // Verificar si la publicación existe
    if (!publicacion) {
      return res.status(404).json({ error: "La publicación no existe" });
    }

    // Buscar el id de la nueva categoría
    const categoria = await Categoria.findOne({
      where: {
        id_categoria: id_categoria,
      },
    });

    // Verificar si la categoría existe
    if (!categoria) {
      return res
        .status(404)
        .json({ error: "La categoría seleccionada no existe" });
    }

    // Actualizar publicación
    await Publicacion.update(
      {
        titulo,
        descripcion,
        pago,
        id_categoria: id_categoria, // Actualizar la categoría
        provincia,
        ciudad,
      },
      {
        where: { id_publicacion: id_publicacion },
      }
    );

    // Respuesta
    res.json({
      message: "Publicación actualizada exitosamente",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar una publicación
export const deletePublicacion = async (req, res) => {
  try {
    const id_publicacion = req.params.id;

    // Buscar la publicación que se va a eliminar
    const publicacion = await Publicacion.findOne({
      where: { id_publicacion: id_publicacion },
    });

    // Verificar si la publicación existe
    if (!publicacion) {
      return res.status(404).json({ error: "La publicación no existe" });
    }

    // Verificar si la publicación tiene postulaciones en estado Aceptada o Rechazada
    const postulaciones = await Postulacion.findOne({
      where: {
        id_publicacion: id_publicacion,
        id_estado_postulacion: [2, 3],
      }, // Solo las postulaciones en estado Aceptadas (2) o Rechazadas (3)},
    });

    if (postulaciones) {
      return res.status(404).json({
        error:
          "La publicación no puede ser eliminada porque tiene postulaciones en estado Aceptada o Rechazada",
      });
    } else {
      await Postulacion.destroy({
        where: {
          id_publicacion: id_publicacion,
          id_estado_postulacion: 1,
        }, // Solo las postulaciones en estado Pendiente (1)},
      });

      await Publicacion.destroy({
        where: { id_publicacion: id_publicacion },
      });

      return res.status(200).json({ message: "Operacón Exitosa!" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener publicaciones activas por categoría
export const getPublicacionesActivasPorCategoria = async (req, res) => {
  try {
    const id_categoria = req.params.id_categoria;

    // Verificar si la categoría existe
    const categoria = await Categoria.findOne({
      where: {
        id_categoria: id_categoria,
      },
    });

    if (!categoria) {
      return res
        .status(404)
        .json({ error: "La categoría especificada no existe" });
    }

    // Obtener las publicaciones de la categoría
    const publicaciones = await Publicacion.findAll({
      where: {
        id_categoria: id_categoria,
        id_estado_publicacion: 1, // Solo las publicaciones activas
      },
    });

    // Respuesta
    res.json({
      publicaciones,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Lista de postulantes en una publicacion
export const getPostulantesPorPublicacion = async (req, res) => {
  try {
    const { id_publicacion } = req.params;

    const postulantes = await Postulacion.findAll({
      where: {
        id_publicacion: id_publicacion,
      },
      include: [
        {
          model: UsuarioRol,
          as: "empleado",
          include: [
            {
              model: Usuario,
              as: "usuario",
              attributes: ["nombre", "apellido", "email"],
            },
          ],
        },
      ],
    });

    const postulantesInfo = postulantes
      .filter((postulacion) => postulacion.id_estado_postulacion === 1)
      .map((postulacion) => {
        const empleado = postulacion.empleado;
        const usuario = empleado.usuario;
        return {
          id_postulacion: postulacion.id_postulacion,
          nombre: usuario.nombre,
          apellido: usuario.apellido,
          email: usuario.email,
          id_estado_postulacion: postulacion.id_estado_postulacion,
          id_postulante: empleado.id_usuario_rol,
          // Puedes agregar más campos si es necesario
        };
      });

    const postulantesAceptados = postulantes
      .filter((postulacion) => postulacion.id_estado_postulacion === 2)
      .map((postulacion) => {
        const empleado = postulacion.empleado;
        const usuario = empleado.usuario;
        return {
          id_postulacion: postulacion.id_postulacion,
          nombre: usuario.nombre,
          apellido: usuario.apellido,
          email: usuario.email,
          id_estado_postulacion: postulacion.id_estado_postulacion,
          id_postulante: empleado.id_usuario_rol,
          calificado: postulacion.calificado,
          // Puedes agregar más campos si es necesario
        };
      });

    res.json({
      data: postulantesInfo,
      aceptados: postulantesAceptados,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
