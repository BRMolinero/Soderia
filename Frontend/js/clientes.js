async function cargarClientesTabla() {
    try {
        const response = await axios.get('http://localhost:3000/api/cliente');
        console.log(response.data); // Verifica que estás recibiendo datos

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

    // Crear celda de acciones
    const celdaAcciones = document.createElement('td');
    celdaAcciones.classList.add('fixed-column');
    celdaAcciones.innerHTML = `
        <div class="d-flex align-items-center">
            <button class="btn btn-sm btn-outline-primary me-1" title="Editar" data-bs-toggle="modal"
                        data-bs-target="#editarClienteModal
                        " onclick="editarCliente(${cliente.idCliente})">
                <i class="bi bi-pencil-square"></i>
            </button>
           



            <button class="btn btn-sm btn-outline-danger" title="Eliminar" onclick="eliminarCliente(${cliente.idCliente})">
                <i class="bi bi-trash"></i>
            </button>
        </div>
    `;
    fila.appendChild(celdaAcciones);

    tbody.appendChild(fila);
}

let formulario = document.getElementById("formularioPersonal");
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
        numeroDepartamento: parseInt(document.getElementById('departamento').value, 10),
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
    nuevoCliente();

    // Si quieres cerrar el modal después de guardar el cliente
/*     let clienteModal = new bootstrap.Modal(document.getElementById('clienteModal'));
    clienteModal.hide(); */
});



cargarClientesTabla();
