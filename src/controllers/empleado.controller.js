import { Publicacion } from "../models/publicacion.model.js";
import { UsuarioRol } from "../models/usuarioRol.model.js";
import { Postulacion } from "../models/postulacion.model.js";
import { Usuario } from "../models/usuario.model.js";
import { Op } from "sequelize";

//Listar publicaciones activa (Para Empleados)
export const getPublicacionesActivas = async (req, res) => {
  try {
    const { id_usuario } = req.params;

    const publicaciones = await Publicacion.findAll({
      where: {
        id_estado_publicacion: 1,
      },
      include: [
        {
          model: UsuarioRol,
          as: "empleador",
          where: {
            id_usuario: {
              [Op.not]: id_usuario,
            },
          },
        },
      ],
    });
    res.json({
      publicaciones,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// export const getPublicacionesActivas = async (req, res) => {
//   try {
//     const { id_usuario } = req.params;

//     const publicaciones = await Publicacion.findAll({
//       attributes: [
//         'id_publicacion',
//         'titulo',
//         'descripcion',
//         'pago',
//         'id_categoria',
//         'provincia',
//         'ciudad',
//       ],
//       where: {
//         id_estado_publicacion: 1,
//       },
//       include: [
//         {
//           model: UsuarioRol,
//           as: "empleador",
//           attributes: ['id_usuario'],
//           where: {
//             id_usuario: {
//               [Op.not]: id_usuario,
//             },
//           },
//           include: [
//             {
//               model: Usuario,
//               attributes: ['nombre', 'apellido', 'email'],
//               as: 'usuario', // Asegúrate de usar el nombre correcto de la relación
//             },
//           ],
//         },
//       ],
//     });

//     const data = publicaciones.map(publicacion => {
//       return {
//         id_publicacion: publicacion.id_publicacion,
//         titulo: publicacion.titulo,
//         descripcion: publicacion.descripcion,
//         pago: publicacion.pago,
//         id_categoria: publicacion.id_categoria,
//         provincia: publicacion.provincia,
//         ciudad: publicacion.ciudad,
//         id_usuario: publicacion.empleador.usuario.id_usuario,
//         nombre: publicacion.empleador.usuario.nombre,
//         apellido: publicacion.empleador.usuario.apellido,
//         email: publicacion.empleador.usuario.email,
//       };
//     });

//     res.json({
//       data,
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

//Listar publicaciones activas por categoria
//TODO: Implementar filtro de usuario
export const getPublicacionesActivasPorCategoria = async (req, res) => {
  try {
    const { id_categoria } = req.params;
    const publicaciones = await Publicacion.findAll({
      where: {
        id_estado_publicacion: 1,
        id_categoria: id_categoria,
      },
    });
    res.json({
      publicaciones,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Crear postulacion a una publicación
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

    // Verificar si la publicación existe y está activa
    const publicacion = await Publicacion.findOne({
      where: {
        id_publicacion: id_publicacion,
        id_estado_publicacion: 1,
      },
    });

    if (!publicacion) {
      return res.status(404).json({
        error:
          "La publicación seleccionada no existe o no está disponible para postular",
      });
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

    //Verificar si el usuario postulo anteriormente a la publicación
    const checkPostulacion = await Postulacion.findOne({
      where: {
        id_publicacion: id_publicacion,
        id_empleado: checkUser.id_usuario_rol,
      },
    });

    if (checkPostulacion) {
      return res
        .status(404)
        .json({ error: "El usuario ya postulo a la publicación" });
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
      data: postulacion,
    });
  } catch (error) {
    res.status(500).json({
      error: "Ocurrió un error al crear la postulación.",
    });
  }
};

//Cambiar estado de postulación a Aceptado
export const aceptarPostulacion = async (req, res) => {
  try {
    const { id_postulacion } = req.params;

    // Verificar si la postulación existe
    const postulacion = await Postulacion.findOne({
      where: {
        id_postulacion: id_postulacion,
      },
    });

    if (!postulacion) {
      return res
        .status(404)
        .json({ error: "La postulación seleccionada no existe" });
    }

    // Verificar si la postulación ya fue aceptada
    if (postulacion.id_estado_postulacion == 2) {
      return res
        .status(409)
        .json({ error: "La postulación ya fue aceptada anteriormente" });
    }

    // Verificar si la postulación ya fue rechazada
    if (postulacion.id_estado_postulacion == 3) {
      return res
        .status(409)
        .json({ error: "La postulación ya fue rechazada anteriormente" });
    }

    // Cambiar estado de postulación a Aceptado
    await Postulacion.update(
      {
        id_estado_postulacion: 2,
      },
      {
        where: {
          id_postulacion: id_postulacion,
        },
      }
    );

    res.status(200).json({
      message: "Postulación aceptada exitosamente.",
    });
  } catch (error) {
    res.status(500).json({
      error: "Ocurrió un error al aceptar la postulación.",
    });
  }
};

//Cambiar estado de postulación a Rechazado
export const rechazarPostulacion = async (req, res) => {
  try {
    const { id_postulacion } = req.params;

    // Verificar si la postulación existe
    const postulacion = await Postulacion.findOne({
      where: {
        id_postulacion: id_postulacion,
      },
    });

    if (!postulacion) {
      return res
        .status(404)
        .json({ error: "La postulación seleccionada no existe" });
    }

    // Verificar si la postulación ya fue aceptada
    if (postulacion.id_estado_postulacion == 2) {
      return res
        .status(409)
        .json({ error: "La postulación ya fue aceptada anteriormente" });
    }

    // Verificar si la postulación ya fue rechazada
    if (postulacion.id_estado_postulacion == 3) {
      return res
        .status(409)
        .json({ error: "La postulación ya fue rechazada anteriormente" });
    }

    // Cambiar estado de postulación a Rechazado
    await Postulacion.update(
      {
        id_estado_postulacion: 3,
      },
      {
        where: {
          id_postulacion: id_postulacion,
        },
      }
    );

    res.status(200).json({
      message: "Postulación rechazada exitosamente.",
    });
  } catch (error) {
    res.status(500).json({
      error: "Ocurrió un error al rechazar la postulación.",
    });
  }
};

//Cancelar postulación a una publicación
export const cancelarPostulacion = async (req, res) => {
  try {
    const { id_postulacion } = req.params;

    // Verificar si la postulación existe
    const postulacion = await Postulacion.findOne({
      where: {
        id_postulacion: id_postulacion,
      },
    });

    if (!postulacion) {
      return res
        .status(404)
        .json({ error: "La postulación seleccionada no existe" });
    }

    // Verificar si la postulación ya fue aceptada
    if (
      postulacion.id_estado_postulacion == 2 ||
      postulacion.id_estado_postulacion == 3
    ) {
      return res.status(404).json({
        error:
          "La postulación ya fue aceptada o rechazada, no se puede cancelar.",
      });
    }

    //Elimina la postulacion
    await Postulacion.destroy({
      where: {
        id_postulacion: id_postulacion,
      },
    });

    res.status(200).json({
      message: "Postulación cancelada exitosamente.",
    });
  } catch (error) {
    res.status(500).json({
      error: "Ocurrió un error al cancelar la postulación.",
    });
  }
};

//Listar postulaciones de un empleado
export const getPostulacionesEmpleado = async (req, res) => {
  try {
    const { id_empleado } = req.params;

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

    const postulaciones = await Postulacion.findAll({
      where: {
        id_empleado: checkUser.id_usuario_rol,
        id_estado_postulacion: 1,
      },
    });
    res.json({
      postulaciones,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Lista de contratos activos de un empleado
export const getContratosActivos = async (req, res) => {
  try {
    const { id_empleado } = req.params;

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

    const postulaciones = await Postulacion.findAll({
      where: {
        id_empleado: checkUser.id_usuario_rol,
        id_estado_postulacion: 2,
      },
      include: [
        {
          model: Publicacion,
          as: "publicacion",
          attributes: [
            "titulo",
            "descripcion",
          ],
          include: [
            {
              model: UsuarioRol,
              as: "empleador",
              attributes: ["id_usuario"],
              include: [
                {
                  model: Usuario,
                  as: "usuario",
                  attributes: ["nombre", "apellido", "email"],
                },
              ],
            },
          ],
        },
        
      ],
    });
    res.json({
      postulaciones,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
