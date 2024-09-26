const express = require('express');
const router = express.Router();

/* Secundarias -----------------------------------------------------------*/
const secundariasController = require('../controllers/secundariasController');


/* Tipo de cliente -----------------------------------------------------------*/
router.get('/tipo-cliente', secundariasController.getAllTipoCliente);

router.get('/tipo-cliente/:id', secundariasController.getTipoClienteById);

/* Zona -------------------------------------------------------------------------*/
router.get('/zona', secundariasController.getAllZona);

router.get('/zona/:id', secundariasController.getZonaById);

/* Localidad --------------------------------------------------------------------*/
router.get('/localidad', secundariasController.getAllLocalidad);

router.get('/localidad/:id', secundariasController.getLocalidadById);


/* Condicion Fiscal --------------------------------------------------------------------*/
router.get('/condicion-fiscal', secundariasController.getAllCondicionFiscal);

router.get('/condicion-fiscal/:id', secundariasController.getCondicionFiscalById);

module.exports = router;
