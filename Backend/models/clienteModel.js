const db = require('../db/db');

const cliente = {
  getAll: async () => {
    try {
      const [rows] = await db.query(`
        SELECT 
          c.idCliente,
          c.nombre,
          c.apellido,  
          c.telefono,
          c.correoElectronico,
          c.calle,
          c.numeroCalle,
          c.piso,
          c.numeroDepartamento,
          DATE_FORMAT(c.fechaNacimiento, '%d-%m-%Y') AS fechaNacimiento, 
          c.DNI,
          t.nombre AS tipoCliente,
          c.razonSocial,
          cf.nombre as condicionFiscal,
          c.cuitCuil,
          z.nombre AS zona,
          l.nombre AS localidad,  
          c.estado
        FROM 
          cliente c
          INNER JOIN zona z ON c.idZona = z.idZona
          INNER JOIN localidad l ON z.idLocalidad = l.idLocalidad
          INNER JOIN tipoCliente t ON c.idTipoCliente = t.idTipoCliente
          INNER JOIN condicionFiscal AS cf ON c.idCondicionFiscal = cf.idCondicionFiscal
      `);
      return rows;
    } catch (error) {
      console.error('Error en getAll:', error);
      throw error;
    }
  },

  getById: async (id) => {
    const [rows] = await db.query('SELECT * FROM cliente WHERE idCliente = ? AND estado = 1', [id]);
    return rows[0];
  },

  create: async (cliente) => {
    try {
      // Validación básica
      if (!cliente || !cliente.nombre || !cliente.apellido) {
        throw new Error('Faltan datos obligatorios');
      }

      const {
        nombre,
        apellido,
        telefono,
        correoElectronico,
        calle,
        numeroCalle,
        piso,
        numeroDepartamento,
        fechaNacimiento,
        DNI,
        razonSocial,
        idCondicionFiscal,
        cuitCuil,
        idZona,
        idTipoCliente,
        estado
      } = cliente;

      const [result] = await db.query(
        'INSERT INTO cliente (nombre, apellido, telefono, correoElectronico, calle, numeroCalle, piso, numeroDepartamento, fechaNacimiento, DNI, razonSocial, idCondicionFiscal, cuitCuil, idZona, idTipoCliente, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [nombre, apellido, telefono, correoElectronico, calle, numeroCalle, piso, numeroDepartamento, fechaNacimiento, DNI, razonSocial, idCondicionFiscal, cuitCuil, idZona, idTipoCliente, estado]
      );

      return { id: result.insertId, ...cliente };
    } catch (error) {
      console.error('Error al crear cliente:', error);
      throw error; // O maneja el error como desees
    }
  },

  update: async (idCliente, cliente) => {
    const {
      nombre,
      apellido,
      telefono,
      correoElectronico,
      calle,
      numeroCalle,
      piso,
      numeroDepartamento,
      fechaNacimiento,
      DNI,
      razonSocial,
      idCondicionFiscal,
      cuitCuil,
      idZona,
      idTipoCliente,
      estado
    } = cliente;

    await db.query(
      `UPDATE cliente 
        SET 
          nombre = ?, 
          apellido = ?, 
          telefono = ?, 
          correoElectronico = ?, 
          calle = ?, 
          numeroCalle = ?, 
          piso = ?, 
          numeroDepartamento = ?, 
          fechaNacimiento = ?, 
          DNI = ?, 
          razonSocial = ?, 
          idCondicionFiscal = ?, 
          cuitCuil = ?, 
          idZona = ?, 
          idTipoCliente = ?, 
          estado = ? 
      WHERE idCliente = ?`,
      [nombre, apellido, telefono, correoElectronico, calle, numeroCalle, piso, numeroDepartamento, fechaNacimiento, DNI, razonSocial, idCondicionFiscal, cuitCuil, idZona, idTipoCliente, estado, idCliente]
    );

    return { idCliente, ...cliente };
  },

  delete: async (id) => {
    await db.query('UPDATE cliente SET estado = 0 WHERE idCliente = ?', [id]);
    return { id };
  },

  restore: async (id) => {
    await db.query('UPDATE cliente SET estado = 1 WHERE idCliente = ?', [id]);
    return { id };
  }
};

module.exports = cliente;