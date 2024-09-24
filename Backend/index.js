const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importa cors

const clienteRoutes = require('./routes/clienteRoutes');
/* const pedidoRoutes = require('./routes/pedidoRoutes'); */
const productoRoutes = require('./routes/productoRoutes');
/* const recorridoRoutes = require('./routes/recorridoRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes'); */

const app = express();

// Middleware
app.use(cors()); // Usa CORS para todas las rutas
app.use(bodyParser.json());

// Rutas
app.use('/api/cliente', clienteRoutes);
/* app.use('/api/pedido', pedidoRoutes); */
app.use('/api/producto', productoRoutes); 
/* app.use('/api/recorrido', recorridoRoutes);
app.use('/api/usuario', usuarioRoutes); */

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
