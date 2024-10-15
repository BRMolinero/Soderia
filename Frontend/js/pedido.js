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
                <input type="number" id="cantidad${productoCount}" class="form-control cantidad-input" required min="1" step="1" placeholder="1">
            </div>
            <div class="d-flex align-items-end">
                <button type="button" class="btn btn-outline-primary btn-sm me-2" onclick="editProducto(this)">
                    <i class="bi bi-pencil"></i>
                </button>
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
// Función para editar un producto
function editProducto(button) {
    var productoRow = button.closest('.producto-row');
    var productoSelect = productoRow.querySelector('.producto-select');
    var cantidadInput = productoRow.querySelector('.cantidad-input');

    // Aquí podrías agregar lógica para editar el producto seleccionado y su cantidad
    alert(`Editar Producto: ${productoSelect.value}, Cantidad: ${cantidadInput.value}`);
}

// Función para eliminar un producto
function removeProducto(button) {
    var productoRow = button.closest('.producto-row');
    productoRow.remove();
}


/*  */

//Script para manejar la información del modal del boton informacion

document.addEventListener('DOMContentLoaded', function () {
    var infoModal = document.getElementById('infoModal');
    infoModal.addEventListener('show.bs.modal', function (event) {
        var button = event.relatedTarget; // Botón que abrió el modal

        // Obtener los datos del botón
        var id = button.getAttribute('data-id');
        var cliente = button.getAttribute('data-cliente');
        var monto = button.getAttribute('data-monto');
        var tipo = button.getAttribute('data-tipo');
        var fecha = button.getAttribute('data-fecha');
        var estado = button.getAttribute('data-estado');

        // Establecer los valores en el modal
        document.getElementById('modalFecha').textContent = fecha;
        document.getElementById('modalCliente').textContent = cliente;
        document.getElementById('modalEstado').textContent = estado;
        document.getElementById('modalDireccion').textContent = 'N/A'; // Aquí se puede cambiar si es necesario
        document.getElementById('modalTipo').textContent = tipo;
        document.getElementById('modalFrecuencia').textContent = 'N/A'; // Aquí se puede cambiar si es necesario
        document.getElementById('modalDia').textContent = 'N/A'; // Aquí se puede cambiar si es necesario

        // Ejemplo de cómo agregar filas de productos (debes adaptar esto a tus necesidades)
        var detalles = document.getElementById('modalDetalles');
        detalles.innerHTML = `
            <tr>
                <td>Cilindro de Gas 45kg</td>
                <td>2</td>
                <td>$50.00</td>
                <td>$100.00</td>
            </tr>
            <tr>
                <td>Botellón de Agua 12L</td>
                <td>4</td>
                <td>$10.00</td>
                <td>$40.00</td>
            </tr>
        `;

        // Actualizar el total
        document.getElementById('modalTotal').textContent = '$140.00'; // Aquí debes calcular el total dinámicamente si es necesario
    });
});


/* Cliente */
/* Traer los datos del cliente, eso ya debería estar*/
/* pero hay que concatenar el apellido y el nombre */

async function buscarClientes() {
    try {
        const response = await axios.get('http://localhost:3000/api/cliente');
        console.log(response);

        // Filtrar los clientes para excluir aquellos con estado = 0 (inactivos)
        const clientesActivos = response.data.filter(cliente => cliente.estado === 1);

        // Ordenar los clientes activos por apellido alfabéticamente
        const clientesOrdenados = clientesActivos.sort((a, b) => {
            return a.apellido.localeCompare(b.apellido);
        });

        // Limpiar las opciones existentes antes de agregar nuevas opciones
        const selectElement = document.getElementById('clienteSelect');
        selectElement.innerHTML = ''; // Limpiar las opciones actuales del select

        clientesOrdenados.forEach(cliente => agregarOptionCliente(cliente));
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

botonNuevoPedido = document.getElementById("nuevoPedido");
botonNuevoPedido.addEventListener("click", function () {
    buscarClientes();
    cargarModoPago();
    cargarEstadoPedido();
    getProductosPedido('productoSelect0');
    cargarFrecuencia();
    cargarDiaDeEntrega();
});

botonGuardarPedido = document.getElementById("savePedido");
botonGuardarPedido.addEventListener("click", function () {

});

async function nuevoPedido() {
    const apiUrl = `http://localhost:3000/api/pedido`;
    const clienteData = obtenerDatosPedido();

    // if (!validacionCampos()) return;

    try {
        const response = await axios.get(consultaUrl);
        if (response.data.length > 0) {
            // Si hay resultados, el cliente ya existe
            Swal.fire({
                icon: 'warning',
                title: 'Cliente ya existente',
                text: 'Ya existe un cliente con los mismos datos.',
                confirmButtonText: 'Entendido'
            });
        } else {
            // Si no existe, procede a guardar el nuevo cliente
            const saveResponse = await axios.post(apiUrl, clienteData);
            if (saveResponse.status === 200 || saveResponse.status === 201) {
                console.log('Cliente guardado:', saveResponse.data);
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
        }
    } catch (error) {
        console.error('Error al procesar la solicitud:', error.response ? error.response.data : error.message);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al procesar tu solicitud. Por favor, intenta nuevamente.',
            confirmButtonText: 'Entendido'
        });
    }
}

function obtenerDatosPedido() {
    const productos = [];
    const productosElements = document.querySelectorAll('.producto-row');

    // Iterar sobre cada producto en la sección de detalle del pedido
    productosElements.forEach((productoRow, index) => {
        const productoSelect = productoRow.querySelector('.producto-select');
        const cantidadInput = productoRow.querySelector('.cantidad-input');

        const idProducto = parseInt(productoSelect.value, 10);
        const cantidad = parseInt(cantidadInput.value, 10);

        productos.push({ idProducto, cantidad });
    });

    return {
        numeroPedido: '', // Puedes asignar un valor o generar uno dinámicamente si es necesario
        fechaPedido: document.getElementById('fechaPedido').value,
        idCliente: parseInt(document.getElementById('clienteSelect').value, 10),
        direccionEntregaDiferente: document.getElementById('diferenteDireccionCheck').checked ? document.getElementById('direccionEntrega').value : null,
        recurrente: document.getElementById('recurrenteCheck').checked,
        idDiaEntrega: document.getElementById('recurrenteCheck').checked ? parseInt(document.getElementById('diaPedido').value, 10) : null,
        idFrecuencia: document.getElementById('recurrenteCheck').checked ? parseInt(document.getElementById('frecuenciaSelect').value, 10) : null,
        idModoPago: parseInt(document.getElementById('medioPagoSelect').value, 10),
        idEstadoPedido: parseInt(document.getElementById('estadoSelect').value, 10),
        productos: productos // Lista de productos seleccionados
    };
}



// function obtenerDatosPedido() {
//     return {
//         nombre: document.getElementById('nombre').value,
//         apellido: document.getElementById('apellido').value,
//         telefono: document.getElementById('telefono').value,
//         correoElectronico: document.getElementById('email').value,
//         calle: document.getElementById('direccion').value,
//         numeroCalle: parseInt(document.getElementById('numero').value, 10),
//         piso: parseInt(document.getElementById('piso').value, 10),
//         numeroDepartamento: document.getElementById('departamento').value,
//         fechaNacimiento: document.getElementById('fechaNacimiento').value,
//         DNI: document.getElementById('DNI').value,
//         razonSocial: document.getElementById('razonSocial').value,
//         idCondicionFiscal: parseInt(document.getElementById('condicionFiscal').value, 10),
//         cuitCuil: document.getElementById('cuit').value,
//         idZona: parseInt(document.getElementById('zona').value, 10),
//         idTipoCliente: parseInt(document.getElementById('tipoCliente').value, 10),
//         estado: parseInt(document.getElementById('estado').value, 10)
//     };
// }

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

        const tbody = document.querySelector('#pedidosTable tbody');

        // Limpiar el contenido del tbody antes de agregar nuevos datos
        tbody.innerHTML = '';

        // Ordenar los clientes primero por estado y luego por apellido
        const pedidosOrdenados = response.data.sort((a, b) => {
            // Ordenar por idEstadoPedido (ascendente)
            if (a.idEstadoPedido !== b.idEstadoPedido) {
                return a.idEstadoPedido - b.idEstadoPedido; // Orden ascendente de estados
            }
            // Si tienen el mismo idEstadoPedido, ordenar por fechaPedido (ascendente)
            return new Date(a.fechaPedido) - new Date(b.fechaPedido);
        });

        // Iterar sobre cada cliente y agregar a la tabla
        pedidosOrdenados.forEach(pedido => agregarFilaPedido(tbody, pedido));
    } catch (error) {
        console.error('Error al cargar los clientes:', error);
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
    celda.textContent = pedido.nombreCliente;
    fila.appendChild(celda);

    celda = document.createElement('td');
    celda.textContent = pedido.direccionEntregaDiferente ? 'Sí' : 'No';
    fila.appendChild(celda);

    celda = document.createElement('td');
    celda.textContent = pedido.recurrente ? 'Sí' : 'No';
    fila.appendChild(celda);

    celda = document.createElement('td');
    celda.textContent = pedido.diaEntrega;
    fila.appendChild(celda);

    celda = document.createElement('td');
    celda.textContent = pedido.frecuencia;
    fila.appendChild(celda);

    celda = document.createElement('td');
    celda.textContent = pedido.modoPago;
    fila.appendChild(celda);

    celda = document.createElement('td');
    celda.textContent = pedido.estadoPedido;
    fila.appendChild(celda);

    //-------------------------------------
    // Crear celda de acciones
    const celdaAcciones = document.createElement('td');
    celdaAcciones.classList.add('fixed-column');

    // Crear el contenedor para los botones
    const divBotones = document.createElement('div');
    divBotones.classList.add('d-flex', 'align-items-center');

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
    botonModificar.addEventListener("click", function () {
        // Aquí iría la función que maneja la modificación de los datos del pedido
        document.getElementById('pedidoModalLabel').innerHTML = '<i class="bi bi-person-plus p-1"></i> Editar Pedido';
        document.getElementById('pedidoModal').setAttribute('data-action', 'editar');
        document.getElementById('pedidoId').value = pedido.idPedido;
        modificarDatosPedido(pedido);
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
            cancelarPedido(pedido.idPedido);
        });
    }

    // Agregar los botones al div contenedor
    divBotones.appendChild(botonModificar);
    divBotones.appendChild(botonEliminar);

    // Añadir el contenedor de botones a la celda de acciones
    celdaAcciones.appendChild(divBotones);

    // Añadir la celda de acciones a la fila
    fila.appendChild(celdaAcciones);

    // Finalmente, agregar la fila al tbody
    tbody.appendChild(fila);
}


//JSON de ejemplo para cargar pedidos
/* 
[
    {
        "idPedido": 19,
        "numeroPedido": 1009,
        "fechaPedido": "14-10-2024",
        "nombreCliente": "Ana",
        "direccionEntregaDiferente": 1,
        "recurrente": 0,
        "diaEntrega": "Viernes",
        "frecuencia": "Mensual",
        "modoPago": "Transferencia",
        "estadoPedido": "Pendiente"
    },
    {
        "idPedido": 20,
        "numeroPedido": 1010,
        "fechaPedido": "14-10-2024",
        "nombreCliente": "Juan",
        "direccionEntregaDiferente": 0,
        "recurrente": 1,
        "diaEntrega": "Lunes",
        "frecuencia": "Semanal",
        "modoPago": "Efectivo",
        "estadoPedido": "Entregado"
    },
    {
        "idPedido": 21,
        "numeroPedido": 1011,
        "fechaPedido": "14-10-2024",
        "nombreCliente": "María",
        "direccionEntregaDiferente": 1,
        "recurrente": 0,
        "diaEntrega": "Miércoles",
        "frecuencia": "Quincenal",
        "modoPago": "Tarjeta",
        "estadoPedido": "En Proceso"
    },
    {
        "idPedido": 22,
        "numeroPedido": 1012,
        "fechaPedido": "14-10-2024",
        "nombreCliente": "Carlos",
        "direccionEntregaDiferente": 0,
        "recurrente": 1,
        "diaEntrega": "Martes",
        "frecuencia": "Mensual",
        "modoPago": "Transferencia",
        "estadoPedido": "Pendiente"
    },
    {
        "idPedido": 23,
        "numeroPedido": 1013,
        "fechaPedido": "14-10-2024",
        "nombreCliente": "Sofía",
        "direccionEntregaDiferente": 1,
        "recurrente": 0,
        "diaEntrega": "Jueves",
        "frecuencia": "Semanal",
        "modoPago": "Efectivo",
        "estadoPedido": "En Proceso"
    },
    {
        "idPedido": 24,
        "numeroPedido": 1014,
        "fechaPedido": "14-10-2024",
        "nombreCliente": "Miguel",
        "direccionEntregaDiferente": 0,
        "recurrente": 1,
        "diaEntrega": "Viernes",
        "frecuencia": "Quincenal",
        "modoPago": "Tarjeta",
        "estadoPedido": "Entregado"
    },
    {
        "idPedido": 25,
        "numeroPedido": 1015,
        "fechaPedido": "14-10-2024",
        "nombreCliente": "Laura",
        "direccionEntregaDiferente": 1,
        "recurrente": 0,
        "diaEntrega": "Lunes",
        "frecuencia": "Mensual",
        "modoPago": "Transferencia",
        "estadoPedido": "Pendiente"
    },
    {
        "idPedido": 26,
        "numeroPedido": 1016,
        "fechaPedido": "14-10-2024",
        "nombreCliente": "Javier",
        "direccionEntregaDiferente": 0,
        "recurrente": 1,
        "diaEntrega": "Martes",
        "frecuencia": "Semanal",
        "modoPago": "Efectivo",
        "estadoPedido": "En Proceso"
    },
    {
        "idPedido": 27,
        "numeroPedido": 1017,
        "fechaPedido": "14-10-2024",
        "nombreCliente": "Elena",
        "direccionEntregaDiferente": 1,
        "recurrente": 0,
        "diaEntrega": "Miércoles",
        "frecuencia": "Quincenal",
        "modoPago": "Tarjeta",
        "estadoPedido": "Pendiente"
    },
    {
        "idPedido": 28,
        "numeroPedido": 1018,
        "fechaPedido": "14-10-2024",
        "nombreCliente": "Andrés",
        "direccionEntregaDiferente": 0,
        "recurrente": 1,
        "diaEntrega": "Jueves",
        "frecuencia": "Mensual",
        "modoPago": "Transferencia",
        "estadoPedido": "Entregado"
    }
]

*/

//JSON de ejemplo para cargar pedido con detalle
/*
{
    "numeroPedido": 1010,
    "fechaPedido": "2024-10-14",
    "idCliente": 5,
    "direccionEntregaDiferente": true,
    "recurrente": false,
    "idDiaEntrega": 3,
    "idFrecuencia": 2,
    "idModoPago": 1,
    "idEstadoPedido": 1,
    "productos": [
        {
            "idProducto": 12,
            "cantidad": 3,
            "precioUnitario": 50.0
        },
        {
            "idProducto": 7,
            "cantidad": 1,
            "precioUnitario": 30.0
        },
        {
            "idProducto": 15,
            "cantidad": 2,
            "precioUnitario": 20.0
        }
    ]
}

*/

const pedidoData = {
    numeroPedido: 1010,
    fechaPedido: "2024-10-14",
    idCliente: 5,
    direccionEntregaDiferente: true,
    recurrente: false,
    idDiaEntrega: 3,
    idFrecuencia: 2,
    idModoPago: 1,
    idEstadoPedido: 1,
    detallesPedido: [
        { idProducto: 12, cantidad: 3, precioUnitario: 50.0 },
        { idProducto: 7, cantidad: 1, precioUnitario: 30.0 },
        { idProducto: 15, cantidad: 2, precioUnitario: 20.0 }
    ]
};

/* ModoPago */



/* Estado Pago */


/* DiaEntrega */


/* Frecuencia */



