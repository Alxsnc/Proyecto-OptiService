import { Router } from 'express';
const router = Router();

import { createPedido, getPedidos, getPedidoById, updatePedido, deletePedido } from '../controllers/pedido.controller';

router.post('/registrarPedido', createPedido); //ruta para crear un pedido 
router.get('/pedidos', getPedidos); //ruta para obtener todos los pedidos
router.get('/pedido/:id', getPedidoById); //ruta para obtener un pedido por id
router.put('/pedido/:id', updatePedido); //ruta para actualizar un pedido
router.delete('/pedido/:id', deletePedido); //ruta para eliminar un pedido

export default router;