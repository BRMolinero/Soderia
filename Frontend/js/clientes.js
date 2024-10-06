async function cargarClientesTabla(filter = null) {
    try {
        if (filter) {
            response = await axios.get('http://localhost:3000/api/cliente', {
                params: filter // Pasamos los filtros como parámetros de la URL
            });
            console.log(response.data); // Verifica que estás recibiendo datos
        } else {
            response = await axios.get('http://localhost:3000/api/cliente');
            console.log(response.data); // Verifica que estás recibiendo datos
        }

        const tbody = document.querySelector('#clientesTable tbody');

        // Limpiar el contenido del tbody antes de agregar nuevos datos
        tbody.innerHTML = '';

        // Iterar sobre cada cliente y agregar a la tabla
        response.data.forEach(cliente => agregarFilaCliente(tbody, cliente));
    } catch (error) {
        console.error('Error al cargar los clientes:', error);
    }
}

function agregarFilaCliente(tbody, cliente) {
    const fila = document.createElement('tr');

    // Crear y agregar las celdas directamente
    let celda = document.createElement('td');
    celda.textContent = cliente.nombre;
    fila.appendChild(celda);

    celda = document.createElement('td');
    celda.textContent = cliente.apellido;
    fila.appendChild(celda);

    celda = document.createElement('td');
    celda.textContent = `${cliente.calle} ${cliente.numeroCalle} ${cliente.piso ? ', Piso ' + cliente.piso : ''} ${cliente.numeroDepartamento ? ', Dpto ' + cliente.numeroDepartamento : ''}`;
    fila.appendChild(celda);

    celda = document.createElement('td');
    celda.textContent = cliente.localidad;
    fila.appendChild(celda);

    celda = document.createElement('td');
    celda.textContent = cliente.zona;
    fila.appendChild(celda);

    celda = document.createElement('td');
    celda.textContent = cliente.tipoCliente;
    fila.appendChild(celda);

    celda = document.createElement('td');
    celda.textContent = cliente.razonSocial;
    fila.appendChild(celda);

    celda = document.createElement('td');
    celda.textContent = cliente.condicionFiscal;
    fila.appendChild(celda);

    celda = document.createElement('td');
    celda.textContent = cliente.cuitCuil;
    fila.appendChild(celda);

    celda = document.createElement('td');
    celda.textContent = cliente.correoElectronico;
    fila.appendChild(celda);

    celda = document.createElement('td');
    celda.textContent = cliente.telefono;
    fila.appendChild(celda);

    celda = document.createElement('td');
    celda.textContent = cliente.fechaNacimiento;
    fila.appendChild(celda);

    celda = document.createElement('td');
    celda.textContent = cliente.DNI;
    fila.appendChild(celda);

    celda = document.createElement('td');
    celda.textContent = cliente.estado === 1 ? 'Activo' : 'Inactivo';
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
    botonModificar.setAttribute('data-bs-target', '#clienteModal'); // Target del modal

    // Añadir el icono de Bootstrap dentro del botón Modificar
    const iconoModificar = document.createElement("i");
    iconoModificar.classList.add('bi', 'bi-pencil-square'); // Añadir clases de Bootstrap Icons
    botonModificar.appendChild(iconoModificar);

    // Añadir el evento de clic para modificar
    botonModificar.addEventListener("click", function () {
        // Aquí iría la función que maneja la modificación de los datos
        document.getElementById('clienteModalLabel').innerHTML = '<i class="bi bi-person-plus p-1"></i> Editar Cliente';
        document.getElementById('clienteModal').setAttribute('data-action', 'editar');
        document.getElementById('clienteId').value = cliente.idCliente;
        modificarDatos(cliente);
    });

    // Crear botón Eliminar
    const botonEliminar = document.createElement("button");
    botonEliminar.classList.add('btn', 'btn-sm', 'btn-outline-danger'); // Añadir clases de Bootstrap
    botonEliminar.setAttribute('title', 'Eliminar'); // Tooltip

    // Añadir el icono de Bootstrap dentro del botón Eliminar
    const iconoEliminar = document.createElement("i");
    iconoEliminar.classList.add('bi', 'bi-trash'); // Añadir clases de Bootstrap Icons
    botonEliminar.appendChild(iconoEliminar);

    // Añadir el evento de clic para eliminar
    botonEliminar.addEventListener("click", function () {
        // eliminarCliente(cliente.idCliente);
        deshabilitarCliente(cliente.idCliente);
    });

    // Agregar los botones al div contenedor
    divBotones.appendChild(botonModificar);
    divBotones.appendChild(botonEliminar);

    // Añadir el contenedor de botones a la celda de acciones
    celdaAcciones.appendChild(divBotones);

    // Añadir la celda a la fila
    fila.appendChild(celdaAcciones);

    // Finalmente, agregar la fila al tbody
    tbody.appendChild(fila);

    //-------------------------------------

}
let botonGuardar = document.getElementById("guardarBoton");


function nuevoCliente() {
    const apiUrl = `http://localhost:3000/api/cliente`;
    const clienteData = obtenerDatosFormulario();

    // if (!validarDatos(clienteData)) return; // Valida los datos antes de enviarlos

    axios.post(apiUrl, clienteData)
        .then(function (response) {
            if (response.status === 200 || response.status === 201) {
                console.log('Cliente guardado:', response.data);
                alert("Cliente Guardado");
                location.reload();
            } else {
                throw new Error('Error al guardar el cliente: ' + response.status);
            }
        })
        .catch(function (error) {
            console.error('Error al guardar el cliente:', error.response ? error.response.data : error.message);
            alert('Error al guardar el cliente. Intenta nuevamente.');
        });

}

function obtenerDatosFormulario() {
    return {
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        telefono: document.getElementById('telefono').value,
        correoElectronico: document.getElementById('email').value,
        calle: document.getElementById('direccion').value,
        numeroCalle: parseInt(document.getElementById('numero').value, 10),
        piso: parseInt(document.getElementById('piso').value, 10),
        numeroDepartamento: document.getElementById('departamento').value,
        fechaNacimiento: document.getElementById('fechaNacimiento').value,
        DNI: document.getElementById('DNI').value,
        razonSocial: document.getElementById('razonSocial').value,
        idCondicionFiscal: parseInt(document.getElementById('condicionFiscal').value, 10),
        cuitCuil: document.getElementById('cuit').value,
        idZona: parseInt(document.getElementById('zona').value, 10),
        idTipoCliente: parseInt(document.getElementById('tipoCliente').value, 10),
        estado: parseInt(document.getElementById('estado').value, 10)
    };
}

// ver si la uso
function validarDatos(clienteData) {
    const camposObligatorios = ['nombre', 'apellido', 'telefono', 'correoElectronico', 'calle', 'numeroCalle', 'fechaNacimiento', 'idZona', 'idTipoCliente'];
    for (const campo of camposObligatorios) {
        if (!clienteData[campo]) {
            alert(`Falta completar el campo: ${campo}`);
            return false;
        }
    }
    return true;
}

botonGuardar.addEventListener("click", function (event) {
    event.preventDefault();

    const clienteId = document.getElementById('clienteId').value;

    if (clienteId) {
        editarCliente(clienteId);
    } else {
        nuevoCliente();
    }

});

function editarCliente(clienteId) {
    const apiUrl = `http://localhost:3000/api/cliente/${clienteId}`;
    const clienteData = obtenerDatosFormulario(); // Recoge los datos del formulario

    axios.put(apiUrl, clienteData)
        .then(response => {
            if (response.status === 200) {
                alert("Cliente actualizado con éxito");
                location.reload(); // Refrescar la página
            }
        })
        .catch(error => {
            console.error("Error al actualizar el cliente:", error);
            alert("Error al actualizar el cliente.");
        });
}

function deshabilitarCliente(clienteId) {
    const apiUrl = `http://localhost:3000/api/cliente/deshabilitar/${clienteId}`;
    const clienteData = { estado: 0 };

    axios.put(apiUrl, clienteData)
        .then(response => {
            if (response.status === 200) {
                alert("Cliente deshabilitado con éxito");
                location.reload(); // Refrescar la página
            }
        })
        .catch(error => {
            console.error("Error al deshabilitar el cliente:", error);
            alert("Error al deshabilitar el cliente.");
        });
}

let botonNuevoCliente = document.getElementById("botonNuevoCliente");
botonNuevoCliente.addEventListener("click", function (event) {
    document.getElementById('clienteModalLabel').innerHTML = '<i class="bi bi-person-plus p-1"></i>Nuevo Cliente';
    cargarLocalidades('crear');
    cargarTiposCliente('crear');
    cargarCondicionFiscal('crear');
});

let botonFiltrar = document.getElementById("btnFiltrar");
botonFiltrar.addEventListener("click", function (event) {
    filter = obtenerDatosFiltro();
    cargarClientesTabla(filter);
});

function obtenerDatosFiltro() {
    const nombre = document.getElementById('filtroNombre').value;
    const estado = parseInt(document.getElementById('filtroEstado').value, 10);
    // const localidad = document.getElementById('filtroLocalidad').value;

    // Retornamos un objeto con los valores de los filtros
    return {
        nombre: nombre || '',
        estado: estado || '',
        // localidad: localidad || ''
    };
}


function modificarDatos(cliente) {
    console.log(cliente);
    cargarLocalidades('editar', cliente);
    cargarTiposCliente('editar', cliente);
    cargarCondicionFiscal('editar', cliente);
    precargarDatosCliente(cliente);
}

//Función para cargar datos del cliente al editar

function precargarDatosCliente(cliente) {
    document.getElementById('apellido').value = cliente.apellido;
    document.getElementById('nombre').value = cliente.nombre;
    document.getElementById('direccion').value = cliente.calle;
    document.getElementById('numero').value = cliente.numeroCalle;
    document.getElementById('piso').value = cliente.piso;
    document.getElementById('departamento').value = cliente.numeroDepartamento;
    document.getElementById('email').value = cliente.correoElectronico;
    document.getElementById('cuit').value = cliente.cuitCuil,
    document.getElementById('razonSocial').value = cliente.razonSocial,
    document.getElementById('estado').value = cliente.estado,
    document.getElementById('telefono').value = cliente.telefono,
    fechaNacimiento = formatearFecha(cliente.fechaNacimiento);
    document.getElementById('fechaNacimiento').value = fechaNacimiento,
    document.getElementById('DNI').value = cliente.DNI;
}

function formatearFecha(fecha) {
    const partes = fecha.split('-');
    const dia = partes[0];
    const mes = partes[1];
    const anio = partes[2];

    // Retornar en el formato "aaaa-mm-dd"
    return `${anio}-${mes}-${dia}`;
}

cargarClientesTabla();