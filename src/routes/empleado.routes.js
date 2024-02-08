import { Router } from 'express';
const router = Router();

import * as empleadoControllers from '../controllers/empleado.controller.js';

// Prefijo para las rutas relacionadas con publicaciones
const empleadoRoutes = Router();

//LISTAS PARA EMPLEADO
empleadoRoutes.get('/listaPublicacionesActivas/:id_usuario', empleadoControllers.getPublicacionesActivas); // Obtener todas las publicaciones activas para postular
empleadoRoutes.get('/listaPublicacionesActivasPorCategoria/:id_categoria', empleadoControllers.getPublicacionesActivasPorCategoria); // Obtener todas las publicaciones activas por categoria para postular

//POSTULACIONES
//CRUD POSTULACIONES
empleadoRoutes.post('/postular', empleadoControllers.createPostulacion); // Crear postulacion a una publicación

//CAMBIO DE ESTADOS EN POSTULACIONES
empleadoRoutes.put('/aceptarPostulacion/:id_postulacion', empleadoControllers.aceptarPostulacion); // Aceptar postulación
empleadoRoutes.put('/rechazarPostulacion/:id_postulacion', empleadoControllers.rechazarPostulacion); // Rechazar postulación

//CANCELAR POSTULACION
empleadoRoutes.delete('/cancelarPostulacion/:id_postulacion', empleadoControllers.cancelarPostulacion); // Cancelar postulación

//LISTAS
empleadoRoutes.get('/listaPostulaciones/:id_empleado', empleadoControllers.getPostulacionesEmpleado); // Obtener todas las postulaciones de un empleado
empleadoRoutes.get('/listaContratosActivos/:id_empleado', empleadoControllers.getContratosActivos); // Obtener todas las postulaciones aceptadas de un empleado

// Prefijo de las rutas
router.use('/api/empleado', empleadoRoutes);

export default router;
