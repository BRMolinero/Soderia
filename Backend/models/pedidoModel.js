const db = require('../db/db');

const pedido = {
  getAll: async (filter) => {
    try {
      let query = `
      SELECT
        p.idPedido,
        p.numeroPedido,
        DATE_FORMAT(p.fechaPedido, '%d-%m-%Y') AS fechaPedido, 
        c.nombre as nombreCliente,
        p.direccionEntregaDiferente,
        p.recurrente,
        de.nombre as diaEntrega,
        f.nombre as frecuencia,
        mp.nombre as modoPago,
        ep.nombre as estadoPedido
      FROM 
        pedido as p
        INNER JOIN cliente as c ON c.idCliente = p.idCliente
        INNER JOIN diaEntrega as de ON p.idDiaEntrega = de.idDiaEntrega
        INNER JOIN frecuencia as f ON p.idFrecuencia = f.idFrecuencia
        INNER JOIN modoPago as mp ON p.idModoPago = mp.idModoPago
        INNER JOIN estadoPedido as ep ON p.idEstadoPedido = ep.idEstadoPedido
      WHERE 1=1`;
      const queryParams = [];
      /* if (filter.nombre) {
        query += `
          AND (
            c.nombre LIKE ?
            OR c.apellido LIKE ?
            OR c.razonSocial LIKE ?
          )
        `;
        const searchValue = `%${filter.nombre}%`;
        queryParams.push(searchValue, searchValue, searchValue); 
      }
      console.log("AAAAAAAAAAAAAAAAA" + filter.NOMBRE)
 
      if (filter.estado) {
        query += ' AND c.estado = ?';
        queryParams.push(Number(filter.estado)); 
      }
      console.log("AAAAAAAAAAAAAAAAA" + filter.estado) */

      // if (filter.localidad) {
      //   query += ' AND l.nombre = ?';
      //   queryParams.push(filter.localidad);
      // }

      // if (filter.zona) {
      //   query += ' AND z.nombre = ?';
      //   queryParams.push(filter.zona);
      // }

      // if (filter.condicionFiscal) {
      //   query += ' AND cf.nombre = ?';
      //   queryParams.push(filter.condicionFiscal);
      // }

      // if (filter.tipoCliente) {
      //   query += ' AND t.nombre = ?';
      //   queryParams.push(filter.tipoCliente);
      // }

      // Ejecutamos la consulta con los parámetros correspondientes
      const [rows] = await db.query(query, queryParams);
      return rows;


    } catch (error) {
      console.error('Error en getAll:', error);
      throw error;
    }
  },

  getById: async (id) => {
    const [rows] = await db.query('SELECT * FROM pedido WHERE idPedido = ? ', [id]);
    return rows[0];
  },

  create: async (pedido) => {
    try {
      // Validación básica
      /*   if (!pedido || !pedido.numeroPedido) {
          throw new Error('Faltan datos obligatorios');
        }
   */
      const {
        numeroPedido,
        fechaPedido,
        idCliente,
        direccionEntregaDiferente,
        recurrente,
        idDiaEntrega,
        idFrecuencia,
        idModoPago,
        idEstadoPedido,
        detallesPedido
      } = pedido;

      const [clienteResult] = await db.query(
        'SELECT idTipoCliente FROM cliente WHERE idCliente = ?',
        [idCliente]
      );

      if (clienteResult.length === 0) {
        throw new Error(`No se encontró el cliente con idCliente ${idCliente}`);
      }

      const idTipoCliente = clienteResult[0].idTipoCliente;

      const [result] = await db.query(
        'INSERT INTO pedido (numeroPedido, fechaPedido, idCliente, direccionEntregaDiferente, recurrente, idDiaEntrega, idFrecuencia, idModoPago, idEstadoPedido) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [numeroPedido, fechaPedido, idCliente, direccionEntregaDiferente, recurrente, idDiaEntrega, idFrecuencia, idModoPago, idEstadoPedido]
      );

      const idPedido = result.insertId;

      for (const detalle of detallesPedido) {
        const { idProducto, cantidad } = detalle;

        // Buscar el idPrecioUnitario más reciente y activo para el producto dado y el idTipoCliente del cliente
        const [precioResult] = await db.query(
          'SELECT idPrecioUnitario FROM preciounitario WHERE idProducto = ? AND idTipoCliente = ? AND estado = 1 ORDER BY fechaActualizacion DESC LIMIT 1',
          [idProducto, idTipoCliente]
        );

        if (precioResult.length === 0) {
          throw new Error(`No se encontró un idPrecioUnitario activo para el producto con idProducto ${idProducto} y idTipoCliente ${idTipoCliente}`);
        }

        const idPrecioUnitario = precioResult[0].idPrecioUnitario;

        // Insertar el detalle del pedido con el idPrecioUnitario encontrado
        await db.query(
          'INSERT INTO detallePedido (idPedido, idPrecioUnitario, cantidad) VALUES (?, ?, ?)',
          [idPedido, idPrecioUnitario, cantidad]
        );
      }

      return { id: result.insertId, ...pedido };
    } catch (error) {
      console.error('Error al crear pedido:', error);
      throw error; // Manejo del error según tu lógica
    }
  },


  update: async (idPedido, pedido) => {
    const {
      numeroPedido,
      fechaPedido,
      idCliente,
      direccionEntregaDiferente,
      recurrente,
      idDiaEntrega,
      idFrecuencia,
      idModoPago,
      idEstadoPedido,
    } = pedido;

    await db.query(
      `UPDATE pedido 
        SET 
        numeroPedido = ?, 
        fechaPedido = ?, 
        idCliente = ?, 
        direccionEntregaDiferente = ?, 
        recurrente = ?, 
        idDiaEntrega = ?, 
        idFrecuencia = ?, 
        idModoPago = ?, 
        idEstadoPedido = ? 
      WHERE idPedido = ?`,
      [numeroPedido, fechaPedido, idCliente, direccionEntregaDiferente, recurrente, idDiaEntrega, idFrecuencia, idModoPago, idEstadoPedido, idPedido]
    );

    return { idPedido, ...pedido };
  },

  delete: async (id) => {
    await db.query('UPDATE pedido SET estado = 0 WHERE idPedido = ?', [id]);
    return { id };
  },

  restore: async (id) => {
    await db.query('UPDATE pedido SET estado = 1 WHERE idPedido = ?', [id]);
    return { id };
  }
};

module.exports = pedido;