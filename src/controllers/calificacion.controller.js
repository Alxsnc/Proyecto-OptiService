import { Calificacion } from "../models/calificacion.model.js";
import { Publicacion } from "../models/publicacion.model.js";
import { Postulacion } from "../models/postulacion.model.js";

//Generar calificacion
export const generarCalificacionEmpleado = async (req, res) => {
  try {
    const { id_publicacion, id_postulacion, puntuacion, comentario, id_usuario_calificador, id_usuario_calificado } = req.body;

    const calificacion = await Calificacion.create({
      id_publicacion,
      puntuacion,
      comentario,
      id_usuario_calificador,
      id_usuario_calificado,
    });
    
    await Postulacion.update(
      { calificado: true },
      { where: { id_postulacion } } 
    );

    res.status(201).json({
      message: "Se ha generado la calificacion exitosamente",
      data: calificacion,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const generarCalificacionEmpleador = async (req, res) => {
  try {
    const { id_publicacion, puntuacion, comentario, id_usuario_calificador, id_usuario_calificado } = req.body;

    const calificacion = await Calificacion.create({
      id_publicacion,
      puntuacion,
      comentario,
      id_usuario_calificador,
      id_usuario_calificado,
    });

    await Publicacion.update(
      { calificado: true },
      { where: { id_publicacion } } 
    );
    

    res.status(201).json({
      message: "Se ha generado la calificacion exitosamente",
      data: calificacion,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


//Verificar si el empleador califico a todos los postulantes para cerrar la publicacion
export const verificarYCerrarPublicacion = async (req, res) => {
  try {
    const { id_publicacion } = req.params;

    const publicacion = await Publicacion.findByPk(id_publicacion);

    if (!publicacion) {
      return res.status(400).json({ message: "La publicación no existe." });
    }

    const postulaciones = await Postulacion.findAll({
      where: {
        id_publicacion,
        id_estado_postulacion: 2,
      },
    });

    const calificaciones = await Calificacion.findAll({
      where: {
        id_publicacion,
      },
    });

    if (postulaciones.length === calificaciones.length) {
      // Cambiar el estado de la publicación a "cerrada"
      await publicacion.update({ id_estado_publicacion: 3 }); //La publicacion pasa a estado cerrado (3)

      return res.status(200).json({ message: "Todos los postulantes han sido calificados por el empleador. La publicación ha sido cerrada." });
    }

    return res.status(400).json({ message: "Aún hay postulantes que no han sido calificados por el empleador. No se puede cerrar la publicación." });
  } catch (error) {
    res.status(500).json({ error: "Ocurrió un error al procesar la solicitud." });
  }
};


//Obtener calificaciones de un usuario
export const obtenerCalificaciones = async (req, res) => {
  try {
    const { id_usuario } = req.params;

    const calificaciones = await Calificacion.findAll({
      where: {
        id_usuario_calificado: id_usuario,
      },
    });

    res.json({ data: calificaciones });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};