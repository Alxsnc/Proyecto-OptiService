import { Router } from "express";
const router = Router();

import * as userControllers from '../controllers/user.controller.js';

// Prefijo rutas relacionadas con usuarios
const userRoutes = Router();

userRoutes.get('/', userControllers.getUsers); // Obtener todos los usuarios
userRoutes.get('/obtenerUsuario/:id', userControllers.getUserById); // Obtener un usuario por su ID
userRoutes.patch('/editarUsuario/:id', userControllers.updateUser); // Actualizar un usuario
userRoutes.delete('/:id', userControllers.deleteUser); // Eliminar un usuario

// Prefijos de las rutas
router.use('/api/usuarios', userRoutes);

export default router;