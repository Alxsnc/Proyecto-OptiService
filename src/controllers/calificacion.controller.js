import { Calificacion } from "../models/calificacion.model.js";
import { Publicacion } from "../models/publicacion.model.js";
import { Postulacion } from "../models/postulacion.model.js";
import { where } from "sequelize";

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

    await Postulacion.update(
      { calificacion_done: true },
      { where: { 
        id_publicacion,
        id_empleado: id_usuario_calificador
      } } 
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
        calificado: true,
        calificacion_done: true,
      },
    });

    if (postulaciones.length > 0) {
      await Publicacion.update(
        { id_estado_publicacion: 3,
        calificado: true },
        { where: { id_publicacion } }
      );

      return res.status(200).json({ message: "Todos los involucrados han sido calificados. La publicación ha sido cerrada." });
    }

    return res.status(400).json({ message: "Existen involucrados que no han sido calificados. No se puede cerrar la publicación." });
  } catch (error) {
    res.status(500).json({ error: "Ocurrió un error al procesar la solicitud." });
  }
};


//Obtener calificaciones de un usuario
export const promedioCalificaciones = async (req, res) => {
  try {
    const { id_usuario } = req.params;

    const calificaciones = await Calificacion.findAll({
      where: {
        id_usuario_calificado: id_usuario,
      },
    });

    let total = 0;
    for (const calificacion of calificaciones) {
      total += calificacion.puntuacion;
    }

    const promedio = total / calificaciones.length;

    if (promedio === null || promedio === undefined || isNaN(promedio)) {
      promedio = 0;
    }

    res.json({ data: promedio.toFixed(1) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};