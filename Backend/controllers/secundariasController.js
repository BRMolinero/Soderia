const Secundarias = require('../models/secundariasModel');

/* TIPO CLIENTE---------------------------------------------------------------- */
exports.getAllTipoCliente = async (req, res) => {
  try {
    const tipoCliente = await Secundarias.tipoCliente.getAll(); 
    res.json(tipoCliente);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTipoClienteById = async (req, res) => {
  try {
    const { id } = req.params;
    const tipoCliente = await Secundarias.tipoCliente.getById(id);
    if (tipoCliente) {
      res.json(tipoCliente);
    } else {
      res.status(404).json({ message: 'Tipo de Cliente no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ZONA-------------------------------------------------------------------------- */
exports.getAllZona = async (req, res) => {
  try {
    const zona = await Secundarias.zona.getAll();
    res.json(zona);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getZonaById = async (req, res) => {
  try {
    const { id } = req.params;
    const zona = await Secundarias.zona.getById(id);
    if (zona) {
      res.json(zona);
    } else {
      res.status(404).json({ message: 'Zona no encontrada' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* LOCALIDAD------------------------------------------------------------------- */
exports.getAllLocalidad = async (req, res) => {
  try {
    const localidad = await Secundarias.localidad.getAll();
    res.json(localidad);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getLocalidadById = async (req, res) => {
  try {
    const { id } = req.params;
    const localidad = await Secundarias.localidad.getById(id);
    if (localidad) {
      res.json(localidad);
    } else {
      res.status(404).json({ message: 'Localidad no encontrada' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* CONDICION FISCAL ------------------------------------------------------------------- */
exports.getAllCondicionFiscal = async (req, res) => {
  try {
    const condicionFiscal = await Secundarias.condicionFiscal.getAll();
    res.json(condicionFiscal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getCondicionFiscalById = async (req, res) => {
  try {
    const { id } = req.params;
    const condicionFiscal = await Secundarias.condicionFiscal.getById(id);
    if (condicionFiscal) {
      res.json(condicionFiscal);
    } else {
      res.status(404).json({ message: 'Condición Fiscal no encontrada' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};