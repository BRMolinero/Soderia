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

module.exports = {
  tipoCliente,
  zona,
  localidad,
};
