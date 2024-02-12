import { Calificacion } from "../models/calificacion.model.js";

const promedioCalif = async (aux) => { // Asegúrate de que la función sea asíncrona
    try {
        const calificaciones = await Calificacion.findAll({ // Espera a que se resuelva la promesa
            where: {
                id_usuario_calificado: aux,
            },
        });

        let total = 0;
        let promedio = 0;

        for (const calificacion of calificaciones) {
            total += calificacion.puntuacion;
        }

        promedio = total / calificaciones.length;

        if(promedio === null || promedio === undefined || isNaN(promedio)){
            promedio = 0;
        }

        return promedio.toFixed(1);
    } catch (error) {
        console.error("Error al calcular el promedio de calificaciones:", error)
    }
}
export default promedioCalif;