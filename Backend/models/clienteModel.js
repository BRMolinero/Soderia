const db = require('../db/db');

const cliente = {
/*  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM cliente');
    return rows;
  },  */
  getAll: async () => {
    try {
      const [rows] = await db.query(`
        SELECT 
          c.DNI,
          c.apellido,
          c.condicionFiscal,
          c.correoElectronico,
          c.cuitCuil,
          c.domicilio,
          c.estado,
          DATE_FORMAT(c.fechaNacimiento, '%d-%m-%Y') AS fechaNacimiento, 
          c.idCliente,
          c.nombre,
          c.razonSocial,
          c.telefono,
          z.nombre AS zona_nombre,
          l.nombre AS localidad_nombre,  
          t.nombre AS tipo_cliente_nombre
        FROM 
          cliente c
          INNER JOIN zona z ON c.idZona = z.idZona
          INNER JOIN localidad l ON z.idLocalidad = l.idLocalidad  
          INNER JOIN tipoCliente t ON c.idTipoCliente = t.idTipoCliente
      `);
      return rows;
    } catch (error) {
      console.error('Error en getAll:', error);
      throw error;
    }
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
