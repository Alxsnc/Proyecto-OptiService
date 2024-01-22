import { Router } from 'express';
const router = Router();

import * as publicacionControllers from '../controllers/publicacion.controller.js';

// Prefijo para las rutas relacionadas con publicaciones
const publicacionRoutes = Router();

publicacionRoutes.post('/nuevaPublicacion', publicacionControllers.createPublicacion); // Crear una nueva publicación
publicacionRoutes.get('/listaPublicaciones', publicacionControllers.getPublicaciones); // Obtener todas las publicaciones
publicacionRoutes.get('/:id', publicacionControllers.getPublicacionById); // Obtener una publicación por su ID
publicacionRoutes.get('/listaPublicaciones/:id_usuario', publicacionControllers.getPublicacionesPorUsuario); // Obtener publicaciones por usuario
publicacionRoutes.put('/:id', publicacionControllers.updatePublicacion); // Actualizar una publicación por su ID
publicacionRoutes.delete('/:id', publicacionControllers.deletePublicacion); // Eliminar una publicación por su ID
publicacionRoutes.get('/categorias/:nombre_categoria', publicacionControllers.getPublicacionesPorCategoria); // Obtener publicaciones por categoria

// Prefijo de las rutas
router.use('/api/publicaciones', publicacionRoutes);

export default router;
