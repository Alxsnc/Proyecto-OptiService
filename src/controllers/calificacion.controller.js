import { Calificacion } from "../models/calificacion.model";
import { Publicacion } from "../models/publicacion.model";
import { Postulacion } from "../models/postulacion.model";

//Generar calificacion
export const generarCalificacion = async (req, res) => {
  try {
    const { id_publicacion, puntuacion, comentario, id_usuario_calificador, id_usuario_calificado } = req.body;

    const calificacion = await Calificacion.create({
      id_publicacion,
      puntuacion,
      comentario,
      id_usuario_calificador,
      id_usuario_calificado,
    });

    res.json({
      message: "Se ha generado la calificacion exitosamente",
      data: calificacion,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};