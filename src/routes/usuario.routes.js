import { Router } from "express";
const router = Router();

import * as userControllers from '../controllers/usuario.controller.js';

// Prefijo rutas relacionadas con usuarios
const userRoutes = Router();

userRoutes.get('/', userControllers.getUsers); // Obtener todos los usuarios
userRoutes.get('/:id', userControllers.getUserById); // Obtener un usuario por su ID
userRoutes.put('/:id', userControllers.updateUser); // Actualizar un usuario
userRoutes.delete('/:id', userControllers.deleteUser); // Eliminar un usuario

// Prefijo rutas relacionadas con autenticación
const authRoutes = Router();
authRoutes.post('/registro', userControllers.createUser); // Registro de usuario
authRoutes.post('/login', userControllers.loginUser); // Inicio de sesión

// Prefijos de las rutas
router.use('/api/usuarios', userRoutes);
router.use('/api/auth', authRoutes);

export default router;