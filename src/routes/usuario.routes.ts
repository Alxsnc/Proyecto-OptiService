import { Router } from 'express';
const router = Router();

import { createUser, deleteUser, getUsers, updateUser } from '../controllers/usuario.controller';

router.get('/usuarios', getUsers); //ruta para obtener todos los usuarios
router.post('/registroUsuario', createUser); //ruta para crear un usuario
router.put('/usuario/:id', updateUser); //ruta para actualizar un usuario
router.delete('/usuario/:id', deleteUser); //ruta para eliminar un usuario

export default router;
