const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

// Obtener todos los cliente
router.get('/', clienteController.getAllCliente);

// Obtener un cliente por ID
router.get('/:id', clienteController.getClienteById);

// Crear un nuevo cliente
router.post('/', clienteController.createCliente);

// Actualizar un cliente existente
router.put('/:id', clienteController.updateCliente);

// Eliminar un cliente
router.delete('/:id', clienteController.deleteCliente);

module.exports = router;
