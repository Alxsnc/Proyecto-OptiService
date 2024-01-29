import { Router } from 'express';
const router = Router();

import * as publicacionControllers from '../controllers/publicacion.controller.js';

// Prefijo para las rutas relacionadas con publicaciones
const publicacionRoutes = Router();


//CREAR PUBLICACION SOLO EMPLEADOR
publicacionRoutes.post('/nuevaPublicacion', publicacionControllers.createPublicacion);

//LISTAS PARA EMPLEADOR
publicacionRoutes.get('/listaPublicaciones/activas/:id_usuario', publicacionControllers.getPublicacionesActivasUsuario); // Obtener publicaciones activas por usuario
publicacionRoutes.get('/listaPublicaciones/categorias/:id_categoria', publicacionControllers.getPublicacionesActivasPorCategoria); // Obtener publicaciones activas por categoria
publicacionRoutes.get('/listaPublicaciones/cerradas/:id_usuario', publicacionControllers.getPublicacionesCerradasUsuario); // Obtener publicaciones cerradas por usuario

//UDPATE PUBLICACION *ACTIVAS Y EN ESPERA, NO SE MODIFICAN PUBLICACIONES CERRADAS*
publicacionRoutes.get('/publicacionById/:id', publicacionControllers.getPublicacionById); // Obtener una publicación por su ID
publicacionRoutes.put('/modificarPublicacion/:id', publicacionControllers.updatePublicacion); //modificar publicacion

//DELETE PUBLICACION ACTIVA  *PUBLICACIONES EN ESPERA (2) Y CERRADAS (3) NO SE ELIMINAR*
publicacionRoutes.delete('/eliminarPublicacion/:id', publicacionControllers.deletePublicacion);

//LISTA DE POSTULANTES
publicacionRoutes.get('/listaPostulantes/:id_publicacion', publicacionControllers.getPostulantesPorPublicacion); // Obtener postulantes por publicacion

// Prefijo de las rutas
router.use('/api/publicaciones', publicacionRoutes);

export default router;
