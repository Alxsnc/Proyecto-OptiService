import { Router } from 'express';
const router = Router();

import * as empleadoControllers from '../controllers/empleado.controller.js';

// Prefijo para las rutas relacionadas con publicaciones
const empleadoRoutes = Router();

//LISTAS PARA EMPLEADO
empleadoRoutes.get('/listaPublicacionesActivas', empleadoControllers.getPublicacionesActivas); // Obtener todas las publicaciones activas para postular
empleadoRoutes.get('/listaPublicacionesActivasPorCategoria/:id_categoria', empleadoControllers.getPublicacionesActivasPorCategoria); // Obtener todas las publicaciones activas por categoria para postular

//POSTULACIONES
empleadoRoutes.post('/postular', empleadoControllers.createPostulacion); // Crear postulacion a una publicación

//CAMBIO DE ESTADOS EN POSTULACIONES
empleadoRoutes.put('/aceptarPostulacion/:id_postulacion', empleadoControllers.aceptarPostulacion); // Aceptar postulación
empleadoRoutes.put('/rechazarPostulacion/:id_postulacion', empleadoControllers.rechazarPostulacion); // Rechazar postulación





// Prefijo de las rutas
router.use('/api/empleado', empleadoRoutes);

export default router;
