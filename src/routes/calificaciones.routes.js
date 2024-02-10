import { Router } from 'express';
const router = Router();

import * as calificacionesControllers from '../controllers/calificacion.controller.js';

//prefijo rutas relacionadas con categorias
const calificacionesRoutes = Router();

//Generar calificacion empleador a empleado
calificacionesRoutes.post('/calificarEmpleado', calificacionesControllers.generarCalificacionEmpleado);

//Generar calificacion empleado a empleador
calificacionesRoutes.post('/calificarEmpleador', calificacionesControllers.generarCalificacionEmpleador);

//Control de calificaciones empleador to empleado
calificacionesRoutes.put('/verificarYCerrar/:id_publicacion', calificacionesControllers.verificarYCerrarPublicacion); 

//Obtener calificaciones de un usuario
calificacionesRoutes.get('/obtenerCalificaciones/:id_usuario', calificacionesControllers.obtenerCalificaciones);

//prefijos de las rutas
router.use('/api/calificaciones', calificacionesRoutes);

export default router;
