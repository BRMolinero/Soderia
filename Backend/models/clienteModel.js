const db = require('../db/db');

const cliente = {
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM cliente');
    return rows;
  },
  getById: async (id) => {
    const [rows] = await db.query('SELECT * FROM cliente WHERE idCliente = ?', [id]);
    return rows[0];
  },
  create: async (cliente) => {
    const { nombre, apellido, telefono, correoElectronico, domicilio, fechaNacimiento, DNI, razonSocial, condicionFiscal, cuitCuil, idZona, idTipoCliente, estado } = cliente;
    const [result] = await db.query(
      'INSERT INTO cliente (nombre, apellido, telefono, correoElectronico, domicilio, fechaNacimiento, DNI, razonSocial, condicionFiscal, cuitCuil, idZona, idTipoCliente, estado) VALUES (?, ?, ?)',
      [nombre, apellido, telefono, correoElectronico, domicilio, fechaNacimiento, DNI, razonSocial, condicionFiscal, cuitCuil, idZona, idTipoCliente, estado]
    );
    return { id: result.insertId, ...cliente };
  },
  update: async (id, cliente) => {
    const { nombre, apellido, telefono, correoElectronico, domicilio, fechaNacimiento, DNI, razonSocial, condicionFiscal, cuitCuil, idZona, idTipoCliente, estado } = cliente;
    await db.query(
      'UPDATE cliente SET nombre = ?, apellido = ?, telefono = ?, correoElectronico = ?, domicilio = ?, fechaNacimiento = ?, DNI = ?, razonSocial = ?, condicionFiscal = ?, cuitCuil = ?, idZona = ?, idTipoCliente = ?, estado = ? WHERE idcliente = ?',
      [nombre, apellido, telefono, correoElectronico, domicilio, fechaNacimiento, DNI, razonSocial, condicionFiscal, cuitCuil, idZona, idTipoCliente, estado, id]
    );
    return { id, ...cliente };
  },
  delete: async (id) => {
    await db.query('DELETE FROM cliente WHERE idCliente = ?', [id]);
    return { id };
  }
};

module.exports = cliente;
