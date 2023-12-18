import { Router } from 'express';
const router = Router();

import {
    createPublicacion,
    getPublicaciones,
    getPublicacionById,
    getPublicacionesPorUsuario,
    updatePublicacion,
    deletePublicacion
    
} from '../controllers/publicacion.controller.js';

// Prefijo para las rutas relacionadas con publicaciones
const publicacionRoutes = Router();

publicacionRoutes.post('/nuevaPublicacion', createPublicacion); // Crear una nueva publicación
publicacionRoutes.get('/', getPublicaciones); // Obtener todas las publicaciones
publicacionRoutes.get('/:id', getPublicacionById); // Obtener una publicación por su ID
publicacionRoutes.get('/usuario/:id_usuario', getPublicacionesPorUsuario); // Obtener publicaciones por usuario
publicacionRoutes.put('/:id', updatePublicacion); // Actualizar una publicación por su ID
publicacionRoutes.delete('/:id', deletePublicacion); // Eliminar una publicación por su ID

// Prefijo de las rutas
router.use('/api/publicaciones', publicacionRoutes);

export default router;
