async function cargarClientes() {
    try {
        // Llama a la API para obtener los datos de los clientes
        const response = await axios.get('http://localhost:3000/api/cliente');
        console.log(response.data); // Verifica que estás recibiendo datos

        // Obtén la referencia al tbody de la tabla
        const tbody = document.querySelector('#clientesTable tbody');

        // Limpia la tabla antes de agregar nuevos datos
        tbody.innerHTML = '';

        // Itera sobre cada cliente en los datos y crea una fila en la tabla
        response.data.forEach(cliente => {
            const fila = document.createElement('tr');

            const celdaNombre = document.createElement('td');
            celdaNombre.textContent = cliente.nombre;
            fila.appendChild(celdaNombre);

            const celdaApellido = document.createElement('td');
            celdaApellido.textContent = cliente.apellido;
            fila.appendChild(celdaApellido);

            const celdaDomicilio = document.createElement('td');
            celdaDomicilio.textContent = cliente.domicilio;
            fila.appendChild(celdaDomicilio);

            const celdaLocalidad = document.createElement('td');
            celdaLocalidad.textContent = cliente.localidad_nombre; // Nombre de la localidad
            fila.appendChild(celdaLocalidad);

            const celdaZona = document.createElement('td');
            celdaZona.textContent = cliente.zona_nombre; // Nombre de la zona
            fila.appendChild(celdaZona);

            const celdaTipoCliente = document.createElement('td');
            celdaTipoCliente.textContent = cliente.tipo_cliente_nombre; // Nombre del tipo de cliente
            fila.appendChild(celdaTipoCliente);

            const celdaRazonSocial = document.createElement('td');
            celdaRazonSocial.textContent = cliente.razonSocial;
            fila.appendChild(celdaRazonSocial);

            const celdaCondicionFiscal = document.createElement('td');
            celdaCondicionFiscal.textContent = cliente.condicionFiscal;
            fila.appendChild(celdaCondicionFiscal);

            const celdaCuitCuil = document.createElement('td');
            celdaCuitCuil.textContent = cliente.cuitCuil;
            fila.appendChild(celdaCuitCuil);

            const celdaCorreo = document.createElement('td');
            celdaCorreo.textContent = cliente.correoElectronico;
            fila.appendChild(celdaCorreo);

            const celdaTelefono = document.createElement('td');
            celdaTelefono.textContent = cliente.telefono;
            fila.appendChild(celdaTelefono);

            const celdaFechaNacimiento = document.createElement('td');
            celdaFechaNacimiento.textContent = cliente.fechaNacimiento;
            fila.appendChild(celdaFechaNacimiento);

            const celdaDNI = document.createElement('td');
            celdaDNI.textContent = cliente.DNI;
            fila.appendChild(celdaDNI);

            const celdaEstado = document.createElement('td');

            if (cliente.estado === 1) {
                celdaEstado.textContent = 'Activo';
            } else {
                celdaEstado.textContent = 'Inactivo';
            }

            fila.appendChild(celdaEstado);


            // Celda de acciones
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

            // Agrega la fila completa al tbody
            tbody.appendChild(fila);
            console.log(response.data); // Asegúrate de que estás recibiendo los datos correctamente

        });
    } catch (error) {
        console.error('Error al cargar los clientes:', error);
    }
}

// Llama a la función para cargar los clientes
cargarClientes();
