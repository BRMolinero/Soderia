async function nuevoPedido() {
    const apiUrl = `http://localhost:3000/api/pedido`;
    const pedidoData = obtenerDatosPedido();

    if (!validacionCamposPedido()) return;

    try {
        const saveResponse = await axios.post(apiUrl, pedidoData);
        if (saveResponse.status === 200 || saveResponse.status === 201) {
            //console.log('Pedido guardado:', saveResponse.data);
            Swal.fire({
                icon: 'success',
                title: 'Pedido Guardado',
                text: 'El pedido se ha guardado correctamente.',
                confirmButtonText: 'Entendido'
            }).then(() => {
                location.reload();
            });
        } else {
            throw new Error('Error al guardar el pedido: ' + saveResponse.status);
        }

    } catch (error) {
       // console.error('Error al procesar la solicitud:', error.response ? error.response.data : error.message);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al procesar tu solicitud. Por favor, intenta nuevamente.',
            confirmButtonText: 'Entendido'
        });
    }
}

function validacionCamposPedido() {
    // Obtener valores de los campos del formulario
    let fechaPedido = document.getElementById('fechaPedido').value;
    let cliente = document.getElementById('clienteSelect').value;
    let medioPago = document.getElementById('medioPagoSelect').value;
    let estado = document.getElementById('estadoSelect').value;

    // Variables para detalle de productos
    let productos = document.querySelectorAll('.producto-select');
    let cantidades = document.querySelectorAll('.cantidad-input');

    // Opcional: otros campos
    let direccionEntregaCheck = document.getElementById('diferenteDireccionCheck').checked;
    let direccionEntrega = direccionEntregaCheck ? document.getElementById('direccionEntrega').value : null;

    let error = false;
    let mensajesError = "";
    let camposObligatoriosFaltantes = [];

    // Validaciones para campos generales
    if (fechaPedido === "") {
        camposObligatoriosFaltantes.push("Fecha de Pedido");
        error = true;
    }

    if (cliente === "") {
        camposObligatoriosFaltantes.push("Cliente");
        error = true;
    }

    if (medioPago === "") {
        camposObligatoriosFaltantes.push("Medio de Pago");
        error = true;
    }

    if (estado === "") {
        camposObligatoriosFaltantes.push("Estado");
        error = true;
    }

    // Validación de detalle de productos
    if (productos.length === 0) {
        mensajesError += "Debe añadir al menos un producto al pedido.<br>";
        error = true;
    } else {
        productos.forEach((producto, index) => {
            if (producto.value === "") {
                mensajesError += `Seleccione un producto en la fila ${index + 1}.<br>`;
                error = true;
            }
        });

        cantidades.forEach((cantidad, index) => {
            if (cantidad.value === "" || isNaN(cantidad.value) || parseInt(cantidad.value) <= 0) {
                mensajesError += `Ingrese una cantidad válida para el producto en la fila ${index + 1}.<br>`;
                error = true;
            }
        });
    }

    // Validación de dirección de entrega (si está marcado el checkbox)
    if (direccionEntregaCheck && direccionEntrega === "") {
        camposObligatoriosFaltantes.push("Dirección de Entrega");
        error = true;
    }

    // Mostrar campos obligatorios faltantes
    if (camposObligatoriosFaltantes.length > 0) {
        mensajesError += "Ingrese datos en: " + camposObligatoriosFaltantes.join(", ") + ".<br>";
    }

    // Mostrar alertas de error si es necesario
    if (error) {
        Swal.fire({
            icon: 'error',
            title: 'Campos obligatorios faltantes o con errores',
            html: mensajesError,
            confirmButtonText: 'Entendido'
        });
    }

    return !error; // Retorna false si hay errores
}

async function editarPedido(idPedido) {
    const apiUrl = `http://localhost:3000/api/pedido/${idPedido}`;
    const pedidoData = obtenerDatosPedido();

    try {
        // Realiza la solicitud PUT para actualizar el pedido
        const saveResponse = await axios.put(apiUrl, pedidoData);
        if (saveResponse.status === 200 || saveResponse.status === 204) {
            //console.log('Pedido actualizado:', saveResponse.data);
            Swal.fire({
                icon: 'success',
                title: 'Pedido Actualizado',
                text: 'El pedido se ha actualizado correctamente.',
                confirmButtonText: 'Entendido'
            }).then(() => {
                location.reload(); 
            });
        } else {
            throw new Error('Error al actualizar el pedido: ' + saveResponse.status);
        }

    } catch (error) {
        //console.error('Error al procesar la solicitud:', error.response ? error.response.data : error.message);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al procesar tu solicitud. Por favor, intenta nuevamente.',
            confirmButtonText: 'Entendido'
        });
    }
}

function deshabilitarPedido(pedidoId) {
    const apiUrl = `http://localhost:3000/api/pedido/deshabilitar/${pedidoId}`;
    const pedidoData = { estado: 4 };

    Swal.fire({
        title: '¿Estás seguro?',
        text: "Esta acción cancelará el pedido.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, cancelar',
        cancelButtonText: 'No, mantener'
    }).then((result) => {
        if (result.isConfirmed) {
            axios.put(apiUrl, pedidoData)
                .then(response => {
                    if (response.status === 200) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Pedido cancelado',
                            text: 'El pedido fue cancelado con éxito.',
                            confirmButtonText: 'Aceptar'
                        }).then(() => {
                            location.reload(); // Refrescar la página
                        });
                    }
                })
                .catch(error => {
                    //console.error("Error al cancelar el pedido:", error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Hubo un problema al cancelar el pedido.',
                        confirmButtonText: 'Aceptar'
                    });
                });
        }
    });
}

async function modificarDatosPedido(pedido) {
    //console.log(pedido);
    document.getElementById('fechaPedido').textContent = pedido.fechaPedido;
    
    buscarClientes("editar", pedido);
    cargarModoPago("editar", pedido);
    cargarEstadoPedido("editar", pedido);
    getProductosPedido('productoSelect0');
    checkRecurrente(pedido);
    checkDireccion(pedido);
    cargarFrecuencia("editar", pedido);
    cargarDiaDeEntrega("editar", pedido);
    await precargarDatosPedido(pedido);
}

function obtenerDatosPedido() {
    const productos = [];
    const productosElements = document.querySelectorAll('.producto-row');

    // Iterar sobre cada producto en la sección de detalle del pedido
    productosElements.forEach((productoRow) => {
        const productoSelect = productoRow.querySelector('.producto-select');
        const cantidadInput = productoRow.querySelector('.cantidad-input');

        const idProducto = parseInt(productoSelect.value, 10);
        const cantidad = parseInt(cantidadInput.value, 10);

        // Solo agregar productos que tengan un ID válido y una cantidad mayor a cero
        if (!isNaN(idProducto) && !isNaN(cantidad) && cantidad > 0) {
            productos.push({ idProducto, cantidad });
        }
    });

    // Formatear el objeto para que coincida con el formato esperado por Postman

    const datosPedido = {
        numeroPedido: document.getElementById('ultimoNumeroPedido').value,
        fechaPedido: document.getElementById('fechaPedido').value,
        idCliente: parseInt(document.getElementById('clienteSelect').value, 10),
        direccionEntregaDiferente: document.getElementById('diferenteDireccionCheck').checked ? document.getElementById('direccionEntrega').value : null,
        recurrente: document.getElementById('recurrenteCheck').checked,
        idDiaEntrega: document.getElementById('recurrenteCheck').checked ? parseInt(document.getElementById('diaPedido').value, 10) : null,
        idFrecuencia: document.getElementById('recurrenteCheck').checked ? parseInt(document.getElementById('frecuenciaSelect').value, 10) : null,
        idModoPago: parseInt(document.getElementById('medioPagoSelect').value, 10),
        idEstadoPedido: parseInt(document.getElementById('estadoSelect').value, 10),
        detallesPedido: productos // Lista de productos seleccionados
    };

    // console.log('Datos del pedido formateados:', datosPedido); 

    //console.log(datosPedido);
    return datosPedido;
}

async function cargarPedidosTabla(filter = null) {
    try {
        let response;
        if (filter) {
            response = await axios.get('http://localhost:3000/api/pedido', {
                params: filter // Pasamos los filtros como parámetros de la URL
            });
        } else {
            response = await axios.get('http://localhost:3000/api/pedido');
        }
        //console.log(response.data);

        const tbody = document.querySelector('#pedidosTable tbody');

        // Limpiar el contenido del tbody antes de agregar nuevos datos
        tbody.innerHTML = '';

        // Ordenar los pedidos primero por estado y luego por fecha en orden descendente
        const pedidosOrdenados = response.data.sort((a, b) => {
            // Ordenar por idEstadoPedido (ascendente)
            if (a.idEstadoPedido !== b.idEstadoPedido) {
                return a.idEstadoPedido - b.idEstadoPedido; // Orden ascendente de estados
            }
            // Si tienen el mismo idEstadoPedido, ordenar por fechaPedido (descendente)
            return new Date(b.fechaPedido) - new Date(a.fechaPedido);
        });

        
        pedidosOrdenados.forEach(pedido => agregarFilaPedido(tbody, pedido));
        //console.log(pedidosOrdenados);
    } catch (error) {
        console.error('Error al cargar los pedidos:', error);
    }
}

function agregarFilaPedido(tbody, pedido) {
    const fila = document.createElement('tr');

    // Asignar una clase de Bootstrap para diferenciar el estado del pedido
    if (pedido.estadoPedido === 'Inactivo') {
        fila.classList.add('table-secondary');
    }

    // Crear y agregar las celdas directamente según los datos del pedido
    let celda = document.createElement('td');
    celda.textContent = pedido.numeroPedido;
    fila.appendChild(celda);

    celda = document.createElement('td');
    celda.textContent = pedido.fechaPedido;
    fila.appendChild(celda);

    celda = document.createElement('td');
    celda.textContent = pedido.apellidoCliente + ", " + pedido.nombreCliente;
    fila.appendChild(celda);

    celda = document.createElement('td');
    celda.textContent = pedido.estadoPedido;
    fila.appendChild(celda);

    celda = document.createElement('td');
    celda.textContent = pedido.direccionEntregaDiferente ? pedido.direccionEntregaDiferente : '-';
    fila.appendChild(celda);

    celda = document.createElement('td');
    celda.textContent = pedido.recurrente ? 'Sí' : 'No';
    fila.appendChild(celda);

    celda = document.createElement('td');
    celda.textContent = pedido.frecuencia ? pedido.frecuencia : '-';
    fila.appendChild(celda);

    celda = document.createElement('td');
    celda.textContent = pedido.diaEntrega ? pedido.diaEntrega : '-';
    fila.appendChild(celda);

    celda = document.createElement('td');
    celda.textContent = pedido.modoPago;
    fila.appendChild(celda);

    const valoresPedido = [
        pedido.estadoPedido,
        pedido.diaEntrega,
        pedido.frecuencia,
        pedido.modoPago
    ];

    //-------------------------------------
    // Crear celda de acciones
    const celdaAcciones = document.createElement('td');
    celdaAcciones.classList.add('fixed-column');

    // Crear el contenedor para los botones
    const divBotones = document.createElement('div');
    divBotones.classList.add('d-flex', 'align-items-center');

    //Crear botón Más Información
    const botonDetallePedido = document.createElement("button");
    botonDetallePedido.classList.add('btn', 'btn-sm', 'btn-outline-primary', 'me-1'); // Añadir clases de Bootstrap
    botonDetallePedido.setAttribute('type', 'button'); // Atributos de tipo
    botonDetallePedido.setAttribute('title', 'Detalle Pedido'); // Tooltip
    botonDetallePedido.setAttribute('data-bs-toggle', 'modal'); // Para abrir modal de Bootstrap
    botonDetallePedido.setAttribute('data-bs-target', '#infoModal'); // Target del modal
    botonDetallePedido.setAttribute('data-id-pedido', pedido.idPedido);

    botonDetallePedido.addEventListener('click', () => llenarModalConDatos(valoresPedido, pedido.idPedido, pedido.idCliente));

    const icono = document.createElement("i");
    icono.classList.add('bi', 'bi-info-circle');

    // Añadir el ícono al botón
    botonDetallePedido.appendChild(icono);

    // Crear botón Modificar
    const botonModificar = document.createElement("button");
    botonModificar.classList.add('btn', 'btn-sm', 'btn-outline-primary', 'me-1'); // Añadir clases de Bootstrap
    botonModificar.setAttribute('type', 'button'); // Atributos de tipo
    botonModificar.setAttribute('title', 'Editar'); // Tooltip
    botonModificar.setAttribute('data-bs-toggle', 'modal'); // Para abrir modal de Bootstrap
    botonModificar.setAttribute('data-bs-target', '#pedidoModal'); // Target del modal

    // Añadir el icono de Bootstrap dentro del botón Modificar
    const iconoModificar = document.createElement("i");
    iconoModificar.classList.add('bi', 'bi-pencil-square'); // Añadir clases de Bootstrap Icons
    botonModificar.appendChild(iconoModificar);

    // Añadir el evento de clic para modificar
    botonModificar.addEventListener("click", async () => {
        // Aquí iría la función que maneja la modificación de los datos del pedido
        document.getElementById('pedidoModalLabel').innerHTML = '<i class="fas fa-clipboard-list p-1"></i> Editar Pedido';
        document.getElementById('pedidoModal').setAttribute('data-action', 'editar');
        // document.getElementById('pedidoId').value = pedido.idPedido;
        await modificarDatosPedido(pedido);
        document.getElementById("pedidoId").value = pedido.idPedido;
    });

    // Crear botón Eliminar
    const botonEliminar = document.createElement("button");
    botonEliminar.classList.add('btn', 'btn-sm', 'btn-outline-danger'); // Añadir clases de Bootstrap
    botonEliminar.setAttribute('title', 'Cancelar Pedido'); // Tooltip

    // Añadir el icono de Bootstrap dentro del botón Eliminar
    const iconoEliminar = document.createElement("i");
    iconoEliminar.classList.add('bi', 'bi-trash'); // Añadir clases de Bootstrap Icons
    botonEliminar.appendChild(iconoEliminar);

    // Prevenir la acción de eliminación en pedidos inactivos
    if (pedido.estadoPedido === 'Inactivo') {
        botonEliminar.setAttribute('title', 'Edite para Activarlo'); // Tooltip
        botonEliminar.style.opacity = '0.5'; // Reducir la opacidad
        botonEliminar.style.cursor = 'default'; // Mantener el cursor en 'default'

        botonEliminar.addEventListener("click", function (e) {
            e.preventDefault(); // Evitar la acción de eliminar
        });
    } else {
        botonEliminar.addEventListener("click", function () {
            deshabilitarPedido(pedido.idPedido);
        });
    }

    // Agregar los botones al div contenedor
    divBotones.appendChild(botonDetallePedido);
    divBotones.appendChild(botonModificar);
    divBotones.appendChild(botonEliminar);

    // Añadir el contenedor de botones a la celda de acciones
    celdaAcciones.appendChild(divBotones);

    // Añadir la celda de acciones a la fila
    fila.appendChild(celdaAcciones);

    // Finalmente, agregar la fila al tbody
    tbody.appendChild(fila);
}

/* Detalle */
async function llenarModalConDatos(valoresPedido, idPedido, idCliente) {
    const [estadoPedido, diaEntrega, frecuencia] = valoresPedido;
    //Otra forma de hacerlo
    //const estadoPedido = valoresPedido[estadoPedido], así para cada valor del array

    const responseCliente = await axios.get(`http://localhost:3000/api/cliente/${idCliente}`);

    const datosCliente = responseCliente.data;

    const responsePedido = await axios.get(`http://localhost:3000/api/pedido/${idPedido}`);

    //Prueba para obtener los detalles del pedido
    const responseDetalle = await axios.get(`http://localhost:3000/api/pedido/${idPedido}/detalles`);

    const datosDetalles = responseDetalle.data;
    //console.log(datosDetalles);

    // Obtener los datos del pedido de la respuesta
    const datosPedido = responsePedido.data;
    let direccion = '';

    if (datosPedido.direccionEntregaDiferente === null) {

        let direccion = `${datosCliente.calle} ${datosCliente.numeroCalle}`;

        if (datosCliente.piso) {
            direccion += `, piso ${datosCliente.piso}`;
        }

    } else {
        direccion = datosPedido.direccionEntregaDiferente;
    }


    // Llenar los elementos del modal con los datos

    const fechaISO = datosPedido.fechaPedido;
    const fecha = new Date(fechaISO);

    // Formatear la fecha en el formato deseado (por ejemplo, "14/10/2024")
    const opciones = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const fechaFormateada = fecha.toLocaleDateString('es-ES', opciones);

    document.getElementById('modalFecha').textContent = fechaFormateada;
    document.getElementById('modalCliente').textContent = datosCliente.apellido + ', ' + datosCliente.nombre;
    document.getElementById('modalEstado').textContent = estadoPedido;
    document.getElementById('modalDireccion').textContent = direccion;
    document.getElementById('modalTipo').textContent = datosPedido.recurrente === 1 ? 'Sí' : 'No';
    document.getElementById('modalFrecuencia').textContent = frecuencia;
    document.getElementById('modalDia').textContent = diaEntrega;

    // Llenar la tabla de detalles del pedido
    const detallesContainer = document.getElementById('modalDetalles');
    detallesContainer.innerHTML = ''; // Limpiar cualquier contenido previo

    let totalPedido = 0;

    datosDetalles.detalles.forEach(detalle => {

        // Sumar el subtotal al total del pedido
        totalPedido += detalle.subtotal;

        // Crear una fila para cada detalle del pedido
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${detalle.producto}</td>
            <td>${detalle.cantidad}</td>
            <td>${detalle.precioUnitario}</td>
            <td>${detalle.subtotal.toFixed(2)}</td>
        `;
        detallesContainer.appendChild(fila);
    });

    // Llenar el total
    const formateador = new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS', // Cambia esto a 'ARS' si necesitas pesos argentinos
    });
    const totalFormateado = formateador.format(totalPedido.toFixed(2));
    document.getElementById('modalTotal').textContent = totalFormateado;
}

async function precargarDatosPedido(pedido) {
    document.getElementById('fechaPedido').value = formatearFecha(pedido.fechaPedido);
    const detallesPedido = await obtenerDetallesPedido(pedido.idPedido);

    const productosContainer = document.getElementById('productosContainer');
    productosContainer.innerHTML = '';
    detallesProcesados = detallesPedido.detalles;
    for (const detalle of detallesProcesados) {
        var productoCount = productosContainer.querySelectorAll('.producto-row').length;
        var newProductoRow = document.createElement('div');
        newProductoRow.className = 'd-flex align-items-end mb-3 producto-row';

        newProductoRow.innerHTML = `
            <div class="col-lg-4 col-md-6 col-sm-6 col-7">
                <label for="productoSelect${productoCount}" class="form-label"></label>
                <select id="productoSelect${productoCount}" class="form-select producto-select" required>
                    <option value="" disabled>Seleccione Producto</option>
                    <!-- Aquí se llenará con los productos de la base de datos -->
                </select>
            </div>
            <div class="col-lg-2 col-md-3 col-sm-3 col-3">
                <label for="cantidad${productoCount}" class="form-label"></label>
                <input type="number" id="cantidad${productoCount}" class="form-control cantidad-input" required min="1" step="1" value="${detalle.cantidad}">
            </div>
            <div class="d-flex align-items-end">
                <button type="button" class="btn btn-outline-danger btn-sm" onclick="removeProducto(this)">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
        `;

        // Añadir la nueva fila al contenedor de productos
        productosContainer.appendChild(newProductoRow);

        // Llenar el select del producto con los datos de la base de datos
        await getProductosPedido(`productoSelect${productoCount}`);

        // Seleccionar el producto correspondiente en el select
        const selectProducto = newProductoRow.querySelector(`#productoSelect${productoCount}`);
        selectProducto.value = detalle.idProducto;
    }

    //console.log("Aca se mandaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    //console.log("Estos son los detalles: ", detallesPedido);
}

async function obtenerDetallesPedido(idPedido) {
    const responseDetalle = await axios.get(`http://localhost:3000/api/pedido/${idPedido}/detalles`);
    //console.log("Respuesta de la API:", responseDetalle.data);
    return responseDetalle.data;
}


// ------Modal de nuevo pedido-------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
    // Manejar la visibilidad de la dirección de entrega diferente
    var diferenteDireccionCheck = document.getElementById('diferenteDireccionCheck');
    var direccionEntregaContainer = document.getElementById('direccionEntregaContainer');
    var direccionEntregaInput = document.getElementById('direccionEntrega');

    diferenteDireccionCheck.addEventListener('change', function () {
        if (diferenteDireccionCheck.checked) {
            direccionEntregaContainer.classList.remove('d-none');
            direccionEntregaInput.required = true;
        } else {
            direccionEntregaContainer.classList.add('d-none');
            direccionEntregaInput.required = false;
            direccionEntregaInput.value = ''; // Limpiar el campo si se desmarca
        }
    });

    // Manejar la visibilidad de las opciones recurrentes
    document.getElementById('recurrenteCheck').addEventListener('change', async function () {
        document.getElementById('recurrenteOptions').classList.toggle('d-none', !this.checked);
    });

    // Agregar nuevo producto
    document.getElementById('addProducto').addEventListener('click', async function () {
        var productosContainer = document.getElementById('productosContainer');
        var productoCount = productosContainer.querySelectorAll('.producto-row').length;
        var newProductoRow = document.createElement('div');
        newProductoRow.className = 'd-flex align-items-end mb-3 producto-row';

        // Crear la estructura del HTML para la nueva fila de producto
        newProductoRow.innerHTML = `
            <div class="col-lg-4 col-md-6 col-sm-6 col-7">
                <label for="productoSelect${productoCount}" class="form-label"></label>
                <select id="productoSelect${productoCount}" class="form-select producto-select" required>
                    <option value="" disabled selected>Seleccione Producto</option>
                </select>
            </div>
            <div class="col-lg-2 col-md-3 col-sm-3 col-3">
                <label for="cantidad${productoCount}" class="form-label"></label>
                <input type="number" id="cantidad${productoCount}" class="form-control cantidad-input" required min="1" step="1">
            </div>
            <div class="d-flex align-items-end">
                <button type="button" class="btn btn-outline-danger btn-sm" onclick="removeProducto(this)">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
        `;

        // Añadir la nueva fila al contenedor de productos
        productosContainer.appendChild(newProductoRow);

        // Llenar el select del nuevo producto con los datos de la base de datos
        await getProductosPedido(`productoSelect${productoCount}`);
    });


});

function editProducto(button) {
    var productoRow = button.closest('.producto-row');
    var productoSelect = productoRow.querySelector('.producto-select');
    var cantidadInput = productoRow.querySelector('.cantidad-input');

    // Aquí podrías agregar lógica para editar el producto seleccionado y su cantidad
    alert(`Editar Producto: ${productoSelect.value}, Cantidad: ${cantidadInput.value}`);
}

function removeProducto(button) {
    var productoRow = button.closest('.producto-row');
    productoRow.remove();
}

async function buscarClientes(action, pedido = null) {
    try {
        const response = await axios.get('http://localhost:3000/api/cliente');
        //console.log(response);

        // Filtrar los clientes para excluir aquellos con estado = 0 (inactivos)
        const clientesActivos = response.data.filter(cliente => cliente.estado === 1);

        // Ordenar los clientes activos por apellido alfabéticamente
        const clientesOrdenados = clientesActivos.sort((a, b) => {
            return a.apellido.localeCompare(b.apellido);
        });

        // Limpiar las opciones existentes antes de agregar nuevas opciones
        const selectElement = document.getElementById('clienteSelect');
        selectElement.innerHTML = ''; // Limpiar las opciones actuales del select

        // Agregar la opción predeterminada "Seleccione un cliente"
        const defaultOption = document.createElement('option');
        defaultOption.value = ''; // Dejar el valor vacío
        defaultOption.text = 'Seleccione un cliente';
        defaultOption.disabled = true; // No seleccionable
        defaultOption.selected = true; // Aparece como la opción seleccionada por defecto
        selectElement.appendChild(defaultOption);

        // Agregar las opciones de clientes ordenados
        clientesOrdenados.forEach(cliente => {
            const option = document.createElement('option');
            option.value = cliente.idCliente; // Usar el ID del cliente como valor de la opción
            option.text = `${cliente.apellido}, ${cliente.nombre}`;

            // Marcar como seleccionada si el pedido existe y el idCliente coincide
            if (pedido && cliente.idCliente === pedido.idCliente) {
                option.selected = true;
            }

            selectElement.appendChild(option);
        });

    } catch (error) {
        console.error('Error al buscar clientes:', error);
    }
}

function agregarOptionCliente(cliente) {
    // Obtener el elemento select
    const selectElement = document.getElementById('clienteSelect');

    // Crear una nueva opción con el formato "Apellido Nombre"
    const option = document.createElement('option');
    option.value = cliente.idCliente; // Supongo que el cliente tiene un identificador único
    option.text = `${cliente.apellido} ${cliente.nombre}`; // Concatenar apellido y nombre

    // Agregar la opción al select
    selectElement.appendChild(option);
}

function checkRecurrente(pedido) {
    const recurrenteCheck = document.getElementById('recurrenteCheck');
    const recurrenteOptions = document.getElementById('recurrenteOptions');

    // Verificar si el pedido es recurrente al cargar
    if (pedido.recurrente === 1) {
        recurrenteCheck.checked = true;
        recurrenteOptions.classList.remove('d-none');
    } else {
        recurrenteCheck.checked = false;
        recurrenteOptions.classList.add('d-none');
    }
}

function checkDireccion(pedido) {
    const diferenteDireccionCheck = document.getElementById('diferenteDireccionCheck');
    const direccionEntregaContainer = document.getElementById('direccionEntregaContainer');
    const direccionEntregaInput = document.getElementById('direccionEntrega');
    if (pedido.direccionEntregaDiferente) {
        direccionEntregaContainer.classList.remove('d-none');
        direccionEntregaInput.required = true;
        direccionEntregaInput.value = pedido.direccionEntregaDiferente;
    } else {
        direccionEntregaContainer.classList.add('d-none');
        direccionEntregaInput.required = false;
        direccionEntregaInput.value = ''; // Limpiar el campo si se desmarca
    }
}

function formatearFecha(fecha) {
    const [day, month, year] = fecha.split('-');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
}

function filtrarPedidos() {
    const clienteBuscar = document.getElementById('buscarCliente').value.toLowerCase();
    const fechaInicio = document.getElementById('fechaInicio').value;
    const fechaFin = document.getElementById('fechaFin').value;
    const estadoBuscar = document.getElementById('estadoPedido').value;
    const filasTabla = document.querySelectorAll('#pedidosTable tbody tr');

    filasTabla.forEach(fila => {
        const celdaCliente = fila.querySelector('td:nth-child(3)');
        const celdaFecha = fila.querySelector('td:nth-child(2)');
        const celdaEstado = fila.querySelector('td:nth-child(4)');

        let mostrar = true;

        // Filtrado por cliente
        if (celdaCliente) {
            const nombreCliente = celdaCliente.textContent.toLowerCase();
            if (!nombreCliente.includes(clienteBuscar)) {
                mostrar = false;
            }
        }

        // Filtrado por rango de fechas
        if (celdaFecha && fechaInicio && fechaFin) {
            const fechaTexto = celdaFecha.textContent.trim(); // Obtener texto y eliminar espacios
            const [day, month, year] = fechaTexto.split('-'); // Suponiendo formato DD-MM-AAAA
            const fechaPedido = new Date(year, month - 1, day); // Crear objeto Date con la fecha en el formato adecuado

            const inicio = new Date(fechaInicio);
            const fin = new Date(fechaFin);

            if (fechaPedido < inicio || fechaPedido > fin) {
                mostrar = false;
            }
        }

        // Filtrado por estado
        if (celdaEstado && estadoBuscar) {
            const estadoPedido = celdaEstado.textContent.toLowerCase();
            if (estadoPedido !== estadoBuscar.toLowerCase()) {
                mostrar = false;
            }
        }

        // Mostrar u ocultar la fila según el resultado de los filtros
        fila.style.display = mostrar ? '' : 'none';
    });
}

function getFechaActual() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Añadimos un cero delante si es necesario
    const day = String(today.getDate()).padStart(2, '0');        // Añadimos un cero delante si es necesario

    // Formateamos la fecha como YYYY-MM-DD
    const formattedDate = `${year}-${month}-${day}`;

    // Asignamos la fecha al campo input de tipo date
    document.getElementById("fechaPedido").value = formattedDate;
}

async function getUltimoNumeroPedido() {
    try {
        const response = await axios.get('http://localhost:3000/api/pedido/ultimo-numero');
        const ultimoNumero = response.data.numeroPedido; // Asumiendo que el último número de pedido se recibe en esta propiedad

        return ultimoNumero;

    } catch (error) {
        console.error('Error al cargar el último número de pedido:', error);
        return 0; // Si ocurre un error, devolvemos 0 como valor predeterminado
    }
}

let nuevoNumeroPedido = 0;
botonNuevoPedido = document.getElementById("nuevoPedido");
botonNuevoPedido.addEventListener("click", async function () {
    document.getElementById('ultimoNumeroPedido').value = "";
    document.getElementById('pedidoModalLabel').innerHTML = '<i class="fas fa-file-alt"></i> Nuevo Pedido';
    buscarClientes("crear");
    cargarModoPago();
    cargarEstadoPedido();
    getProductosPedido('productoSelect0');
    cargarFrecuencia();
    cargarDiaDeEntrega();
    getFechaActual();
    nuevoNumeroPedido = await getUltimoNumeroPedido();
    document.getElementById('ultimoNumeroPedido').value = nuevoNumeroPedido + 1;
});

botonResetFiltro = document.getElementById("btnResetFiltro");
botonResetFiltro.addEventListener("click", function () {
    document.getElementById("buscarCliente").value = "";
    document.getElementById("estadoPedido").selectedIndex = 0;
    document.getElementById("fechaInicio").value = "";
    document.getElementById("fechaFin").value = "";
    cargarPedidosTabla();
});

botonGuardarPedido = document.getElementById("savePedido");
botonGuardarPedido.addEventListener("click", function () {
    const pedidoId = document.getElementById("pedidoId").value;

    if (pedidoId) {
        editarPedido(pedidoId); // tengo id entonces existe
    } else {
        nuevoPedido();
    }
});

document.querySelector(".btn-close").addEventListener("click", function () {
    location.reload();
});

cargarPedidosTabla();