import { Router } from 'express';
const router = Router();

import { createUser, deleteUser, getUsers, updateUser, createPedido, getPedidos, getPedidoById, updatePedido, deletePedido } from '../controllers/index.controller';

//router.get('/rol', getRoles);
//router.get('/rol/:id', getRoleById);

router.get('/usuarios', getUsers); //ruta para obtener todos los usuarios
router.post('/registroUsuario', createUser); //ruta para crear un usuario
router.put('/usuario/:id', updateUser); //ruta para actualizar un usuario
router.delete('/usuario/:id', deleteUser); //ruta para eliminar un usuario

router.post('/registrarPedido', createPedido); //ruta para crear un pedido 
router.get('/pedidos', getPedidos); //ruta para obtener todos los pedidos
router.get('/pedido/:id', getPedidoById); //ruta para obtener un pedido por id
router.put('/pedido/:id', updatePedido); //ruta para actualizar un pedido
router.delete('/pedido/:id', deletePedido); //ruta para eliminar un pedido

export default router;
