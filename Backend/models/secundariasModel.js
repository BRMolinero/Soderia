const db = require('../db/db');

const tipoCliente = {
  getAll: async () => {
    try {
      const [rows] = await db.query(`
        SELECT 
          t.idTipoCliente,
          t.nombre,
          t.descripcion,
          t.estado
        FROM tipoCliente AS t
      `);
      return rows;
    } catch (error) {
      console.error('Error en getAll:', error);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const [rows] = await db.query('SELECT * FROM tipoCliente WHERE idTipoCliente = ?', [id]);
      return rows[0];
    } catch (error) {
      console.error('Error en getById:', error);
      throw error;
    }
  },
};

const zona = {
  getAll: async () => {
    try {
      const [rows] = await db.query(`
        SELECT 
          z.idZona,
          z.nombre AS zona,
          l.nombre AS localidad,
          z.idLocalidad,
          z.estado
        FROM zona AS z
          INNER JOIN localidad AS l ON z.idLocalidad = l.idLocalidad
      `);
      return rows;
    } catch (error) {
      console.error('Error en getAll:', error);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const [rows] = await db.query(`
        SELECT 
          z.idZona,
          z.nombre AS zona,
          l.nombre AS localidad,
          z.estado
        FROM zona AS z
          INNER JOIN localidad AS l ON z.idLocalidad = l.idLocalidad
        WHERE z.idZona = ?
      `, [id]);
      return rows[0];
    } catch (error) {
      console.error('Error en getById:', error);
      throw error;
    }
  },
};

const localidad = {
  getAll: async () => {
    try {
      const [rows] = await db.query(`
        SELECT 
          l.idLocalidad,
          l.nombre AS localidad,
          l.estado
        FROM localidad AS l
      `);
      return rows;
    } catch (error) {
      console.error('Error en getAll:', error);
      throw error;
    }
  },

  getById: async (id) => {
    const [rows] = await db.query('SELECT * FROM localidad WHERE idLocalidad = ?', [id]);
    return rows[0];
  },
};

const condicionFiscal = {
  getAll: async () => {
    try {
      const [rows] = await db.query(`
        SELECT 
          co.idCondicionFiscal,
          co.nombre AS condicionFiscal,
          co.estado
        FROM condicionFiscal AS co
      `);
      return rows;
    } catch (error) {
      console.error('Error en getAll:', error);
      throw error;
    }
  },

  getById: async (id) => {
    const [rows] = await db.query('SELECT * FROM condicionFiscal WHERE idCondicionFiscal = ?', [id]);
    return rows[0];
  },
};


/* Modo de pago */
const modoPago = {
  getAll: async () => {
    try {
      const [rows] = await db.query(`
        SELECT 
          mp.idModoPago,
          mp.nombre AS modoPago,
          mp.estado
        FROM modoPago AS mp
      `);
      return rows;
    } catch (error) {
      console.error('Error en getAll:', error);
      throw error;
    }
  },

  getById: async (id) => {
    const [rows] = await db.query('SELECT * FROM modoPago WHERE idModoPago = ?', [id]);
    return rows[0];
  },
};

/* Estado de pago */
const estadoPedido = {
  getAll: async () => {
    try {
      const [rows] = await db.query(`
        SELECT 
          ep.idEstadoPedido,
          ep.nombre AS estadoPedido,
          ep.estado
        FROM estadoPedido AS ep
      `);
      return rows;
    } catch (error) {
      console.error('Error en getAll:', error);
      throw error;
    }
  },

  getById: async (id) => {
    const [rows] = await db.query('SELECT * FROM estadoPedido WHERE idEstadoPedido = ?', [id]);
    return rows[0];
  },
};

/* frecuencia */
const frecuencia = {
  getAll: async () => {
    try {
      const [rows] = await db.query(`
        SELECT 
          f.idFrecuencia,
          f.nombre AS frecuencia,
          f.estado
        FROM frecuencia AS f
      `);
      return rows;
    } catch (error) {
      console.error('Error en getAll:', error);
      throw error;
    }
  },

  getById: async (id) => {
    const [rows] = await db.query('SELECT * FROM frecuencia WHERE idFrecuencia = ?', [id]);
    return rows[0];
  },
};

/* dia entrega */
const dia = {
  getAll: async () => {
    try {
      const [rows] = await db.query(`
        SELECT 
          de.idDiaEntrega,
          de.nombre AS diaEntrega,
          de.estado
        FROM diaEntrega AS de
      `);
      return rows;
    } catch (error) {
      console.error('Error en getAll:', error);
      throw error;
    }
  },

  getById: async (id) => {
    const [rows] = await db.query('SELECT * FROM frecuencia WHERE diaEntrega = ?', [id]);
    return rows[0];
  },
};

/* Productos */
const producto = {
  getAll: async () => {
    try {
      const [rows] = await db.query(`
        SELECT 
         p.idProducto, 
         p.codigoInterno,
         p.nombre,
         p.presentacion,
         p.stockMinimo,
         p.stock,
         tp.nombre as tipoProducto,
         pr.razonSocial as proveedor,
         p.estado
        FROM producto AS p
        INNER JOIN tipoProducto as tp on p.idTipoProducto = tp.idTipoProducto
        INNER JOIN proveedor as pr on p.idProveedor = pr.idProveedor
      `);
      return rows;
    } catch (error) {
      console.error('Error en traer todos los productos:', error);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const [rows] = await db.query('SELECT * FROM producto WHERE idProducto = ?', [id]);
      return rows[0];
    } catch (error) {
      console.error('Error en tratar de traer un producto en específico:', error);
      throw error;
    }
  },
};

module.exports = {
  tipoCliente,
  zona,
  localidad,
  condicionFiscal,
  modoPago,
  estadoPedido,
  frecuencia,
  dia,
  producto
};