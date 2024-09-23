const db = require('../db/db');

const Producto = {
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM producto');
    return rows;
  },
  getById: async (id) => {
    const [rows] = await db.query('SELECT * FROM producto WHERE idProducto = ?', [id]);
    return rows[0];
  },
  create: async (producto) => {
    const { nombre, descripcion, precio } = producto;
    const [result] = await db.query(
      'INSERT INTO producto (nombre, descripcion, precio) VALUES (?, ?, ?)',
      [nombre, descripcion, precio]
    );
    return { id: result.insertId, ...producto };
  },
  update: async (id, producto) => {
    const { nombre, descripcion, precio } = producto;
    await db.query(
      'UPDATE producto SET nombre = ?, descripcion = ?, precio = ? WHERE idProducto = ?',
      [nombre, descripcion, precio, id]
    );
    return { id, ...producto };
  },
  delete: async (id) => {
    await db.query('DELETE FROM producto WHERE idProducto = ?', [id]);
    return { id };
  }
};

module.exports = Producto;
