import { Router } from 'express';
const router = Router();

import * as publicacionControllers from '../controllers/publicacion.controller.js';

// Prefijo para las rutas relacionadas con publicaciones
const publicacionRoutes = Router();


//CREAR PUBLICACION SOLO EMPLEADOR
publicacionRoutes.post('/nuevaPublicacion', publicacionControllers.createPublicacion);

//LISTAS PARA EMPLEADOR
publicacionRoutes.get('/listaPublicaciones/activas/:id_usuario', publicacionControllers.getPublicacionesActivasUsuario); // Obtener publicaciones activas por usuario
publicacionRoutes.get('/listaPublicaciones/categorias/:nombre_categoria', publicacionControllers.getPublicacionesActivasPorCategoria); // Obtener publicaciones activas por categoria
publicacionRoutes.get('/listaPublicaciones/cerradas/:id_usuario', publicacionControllers.getPublicacionesCerradasUsuario); // Obtener publicaciones cerradas por usuario

//LISTAS PARA EMPLEADO
publicacionRoutes.get('/listaPublicaciones/:id_usuario', publicacionControllers.getPublicaciones); // Obtener todas las publicaciones activas para postular


//UDPATE PUBLICACION *ACTIVAS Y EN ESPERA, NO SE MODIFICAN PUBLICACIONES CERRADAS*
publicacionRoutes.put('/:id', publicacionControllers.updatePublicacion);

//DELETE PUBLICACION ACTIVA  *PUBLICACIONES EN ESPERA (2) Y CERRADAS (3) NO SE ELIMINAR*
publicacionRoutes.delete('/eliminarPublicacion/:id', publicacionControllers.deletePublicacion);

//LISTAS GRAL (VER SI SE IMPLEMENTAN)
publicacionRoutes.get('/:id', publicacionControllers.getPublicacionById); // Obtener una publicación por su ID ??
publicacionRoutes.get('/listaPublicaciones', publicacionControllers.getPublicaciones); // Obtener todas las publicaciones


// Prefijo de las rutas
router.use('/api/publicaciones', publicacionRoutes);

export default router;
