const Producto = require('../models/productoModel');

// Obtener todos los producto
//exports es para permitir q en otro lado se use
//objeto punto algo es un metodo
exports.getAllProducto = async (req, res) => {
  try {
    const producto = await Producto.getAll();
    res.json(producto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener un producto por ID
exports.getProductoById = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await Producto.getById(id);
    if (producto) {
      res.json(producto);
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Crear un nuevo producto
exports.createProducto = async (req, res) => {
  try {
    const nuevoProducto = req.body;
    const producto = await Producto.create(nuevoProducto);
    res.status(201).json(producto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar un producto existente
exports.updateProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const datosActualizados = req.body;
    const producto = await Producto.update(id, datosActualizados);
    res.json(producto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar un producto
exports.deleteProducto = async (req, res) => {
  try {
    const { id } = req.params;
    await Producto.delete(id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
