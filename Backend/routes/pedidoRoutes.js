const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');

// Obtener todos los Pedidos
router.get('/', pedidoController.getAllPedido);

//Obtener último número de pedido registrado
router.get('/ultimo-numero', pedidoController.getUltimoNumeroPedido);

//Obtener número de pedido por ID
router.get('/ultimo-numero/:id', pedidoController.getNumeroPedidoId);

// Obtener un Pedido por ID
router.get('/:id', pedidoController.getPedidoById);

// Obtener detalles de un Pedido por ID
router.get('/:id/detalles', pedidoController.getDetallesPedidoByIdPedido);

// Crear un nuevo Pedido
router.post('/', pedidoController.createPedido);

// Actualizar un Pedido existente
router.put('/:id', pedidoController.updatePedido);

// Deshabilitar un Pedido
router.put('/deshabilitar/:id', pedidoController.deshabilitarPedido);

module.exports = router;
