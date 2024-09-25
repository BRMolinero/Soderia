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

// Agrega una fila a la tabla para un cliente específico
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
            <button class="btn btn-sm btn-outline-primary me-1" title="Editar" onclick="editarCliente(${cliente.idCliente})">
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

// Obtener los datos del nuevo cliente desde el formulario
function obtenerNuevoCliente() {
    return {
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        domicilio: `${document.getElementById('direccion').value} ${document.getElementById('numero').value}`,
        /* falta numero de calle, piso y dpto */
        localidad: document.getElementById('ciudad').value,
        zona: document.getElementById('zona').value,
        tipoCliente: document.getElementById('tipoCliente').value,
        razonSocial: document.getElementById('razonSocial').value || null,
        condicionFiscal: document.getElementById('condicionFiscal').value,
        cuitCuil: document.getElementById('cuit').value,
        correoElectronico: document.getElementById('email').value,
        telefono: document.getElementById('telefono').value,
        fechaNacimiento: document.getElementById('fechaNacimiento').value,
        DNI: document.getElementById('DNI').value,
        estado: 1 // Establecer el cliente como activo
    };
}

// Manejo del evento de guardar
document.getElementById('guardarBoton').addEventListener('click', async () => {
    const nuevoCliente = obtenerNuevoCliente();

    try {
        const response = await axios.post('http://localhost:3000/api/cliente', nuevoCliente);
        
        if (response.status === 201) {
            cargarClientesTabla(); // Recargar la tabla
            alert('Cliente agregado exitosamente');
        } else {
            console.error('Error al agregar el cliente');
        }
    } catch (error) {
        console.error('Error al agregar cliente:', error);
    }
});

// Llamar a cargarClientes para inicializar la tabla
cargarClientesTabla();
