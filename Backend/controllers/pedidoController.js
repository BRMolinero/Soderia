const Pedido = require('../models/pedidoModel');

// Obtener todos los Pedidos
//exports es para permitir q en otro lado se use
exports.getAllPedido = async (req, res) => {
  try {
    const filter = req.query; // Extraemos los filtros de req.query
    const pedido = await Pedido.getAll(filter); // Pasamos los filtros al modelo
    res.json(pedido);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener un Pedido por ID
exports.getPedidoById = async (req, res) => {
  try {
    const { id } = req.params;
    const pedido = await Pedido.getById(id);
    if (pedido) {
      res.json(pedido);
    } else {
      res.status(404).json({ message: 'Pedido no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Crear un nuevo Pedido
exports.createPedido = async (req, res) => {
  try {
    const nuevoPedido= req.body;
    const pedido = await Pedido.create(nuevoPedido);
    res.status(201).json(pedido);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar un Pedido existente
exports.updatePedido = async (req, res) => {
  try {
    const { id } = req.params;
    const datosActualizados = req.body;
    const pedido = await Pedido.update(id, datosActualizados);
    res.json(pedido);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Baja lógica de un Pedido
exports.deshabilitarPedido = async (req, res) => {
  try {
    const { id } = req.params;
    const pedido = await Pedido.delete(id, { estado: 0 }); // Cambiar solo el estado a 0
    res.json(pedido);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};