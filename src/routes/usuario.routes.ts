import { Router } from 'express';
const router = Router();

import {
    createUser,
    deleteUser,
    getUserById,
    getUsers,
    loginUser,
    updateUser
} from '../controllers/usuario.controller';

// Prefijo rutas relacionadas con usuarios
const userRoutes = Router();

userRoutes.get('/', getUsers); // Obtener todos los usuarios
userRoutes.get('/:id', getUserById); // Obtener un usuario por su ID
userRoutes.patch('/:id', updateUser); // Actualizar un usuario
userRoutes.delete('/:id', deleteUser); // Eliminar un usuario

// Prefijo rutas relacionadas con autenticación
const authRoutes = Router();
authRoutes.post('/registro', createUser); // Registro de usuario
authRoutes.post('/login', loginUser); // Inicio de sesión

// Prefijos de las rutas
router.use('/api/usuarios', userRoutes);
router.use('/api/auth', authRoutes);

export default router;

