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





/* document.getElementById('guardarBoton').addEventListener('click', async () => {
    // Recoger datos del formulario
    const clienteData = {
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        telefono: document.getElementById('telefono').value,
        correoElectronico: document.getElementById('email').value,
        calle: document.getElementById('direccion').value,
        numeroCalle: document.getElementById('numero').value,
        piso: document.getElementById('piso').value,
        numeroDepartamento: document.getElementById('departamento').value,
        fechaNacimiento: document.getElementById('fechaNacimiento').value,
        DNI: document.getElementById('DNI').value,
        razonSocial: document.getElementById('razonSocial').value,
        idCondicionFiscal: document.getElementById('condicionFiscal').value,
        cuitCuil: document.getElementById('cuit').value,
        idZona: document.getElementById('zona').value, // Asumiendo que tienes opciones en el select
        idTipoCliente: document.getElementById('tipoCliente').value // Asumiendo que tienes opciones en el select
    };

    // Enviar datos a la API
    try {
        const response = await axios.post('http://localhost:3000/api/cliente', clienteData, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        console.log('Cliente guardado:', response.data);
        // Aquí puedes manejar la respuesta, como cerrar el modal o mostrar un mensaje
        $('#clienteModal').modal('hide'); // Cerrar el modal
    } catch (error) {
        console.error('Error:', error);
        // Aquí puedes manejar errores, como mostrar un mensaje de error al usuario
    }
}); */

document.getElementById('formularioPersonal').addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita el envío por defecto del formulario
    const clienteData = {
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        telefono: document.getElementById('telefono').value,
        correoElectronico: document.getElementById('email').value,
        calle: document.getElementById('direccion').value,
        numeroCalle: document.getElementById('numero').value,
        piso: document.getElementById('piso').value,
        numeroDepartamento: document.getElementById('departamento').value,
        fechaNacimiento: document.getElementById('fechaNacimiento').value,
        DNI: document.getElementById('DNI').value,
        razonSocial: document.getElementById('razonSocial').value,
        idCondicionFiscal: document.getElementById('condicionFiscal').value,
        cuitCuil: document.getElementById('cuit').value,
        idZona: document.getElementById('zona').value,
        idTipoCliente: document.getElementById('tipoCliente').value
    };

    try {
        const response = await axios.post('http://localhost:3000/api/cliente', clienteData, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        console.log('Cliente guardado:', response.data);
        $('#clienteModal').modal('hide'); // Cerrar el modal
        cargarClientesTabla(); // Recargar la tabla de clientes
    } catch (error) {
        console.error('Error:', error);
        // Mostrar mensaje de error al usuario
    }
});





// Llamar a cargarClientes para inicializar la tabla
cargarClientesTabla();
