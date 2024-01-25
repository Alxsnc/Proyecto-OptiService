import { Router } from 'express';
const router = Router();

import * as categoriasControllers from '../controllers/categorias.controller.js';

//prefijo rutas relacionadas con categorias
const categoriasRoutes = Router();

categoriasRoutes.get('/', categoriasControllers.getCategorias); // Obtener todas las categorias

//prefijos de las rutas
router.use('/api/categorias', categoriasRoutes);

export default router;
