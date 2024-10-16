let botonNuevoCliente = document.getElementById("botonNuevoCliente");
botonNuevoCliente.addEventListener("click", function (event) {
    document.getElementById('clienteModalLabel').innerHTML = '<i class="bi bi-person-plus p-1"></i>Nuevo Cliente';
    cargarLocalidades('crear');
    cargarTiposCliente('crear');
    cargarCondicionFiscal('crear');
});

let botonGuardar = document.getElementById("guardarBoton");
botonGuardar.addEventListener("click", function (event) {
    event.preventDefault();

    const clienteId = document.getElementById('clienteId').value;

    if (clienteId) {
        editarCliente(clienteId);
    } else {
        nuevoCliente();
    }

});

let botonFiltrar = document.getElementById("btnFiltrar");
botonFiltrar.addEventListener("click", function (event) {
    filter = obtenerDatosFiltro();
    cargarClientesTabla(filter);
});

cargarClientesTabla();

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

/* function nuevoCliente() {
    const apiUrl = `http://localhost:3000/api/cliente`;
    const clienteData = obtenerDatosFormulario();

    if (!validacionCampos()) return;

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
} */


function nuevoCliente() {
    const apiUrl = `http://localhost:3000/api/cliente`;
    const clienteData = obtenerDatosFormulario();

    if (!validacionCampos()) return;

    // Primero, consulta si el cliente ya existe
    const consultaUrl = `${apiUrl}?nombre=${clienteData.nombre}&apellido=${clienteData.apellido}&direccion=${clienteData.direccion}&numero=${clienteData.numero}&piso=${clienteData.piso}&departamento=${clienteData.departamento}&ciudad=${clienteData.ciudad}`;

    axios.get(consultaUrl)
        .then(response => {
            // Verifica si la respuesta contiene datos
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
                axios.post(apiUrl, clienteData)
                    .then(function (response) {
                        if (response.status === 200 || response.status === 201) {
                            console.log('Cliente guardado:', response.data);
                            Swal.fire({
                                icon: 'success',
                                title: 'Cliente Guardado',
                                text: 'El cliente se ha guardado correctamente.',
                                confirmButtonText: 'Entendido'
                            }).then(() => {
                                location.reload();
                            });
                        } else {
                            throw new Error('Error al guardar el cliente: ' + response.status);
                        }
                    })
                    .catch(function (error) {
                        console.error('Error al guardar el cliente:', error.response ? error.response.data : error.message);
                        Swal.fire({
                            icon: 'error',
                            title: 'Error al guardar el cliente',
                            text: 'Intenta nuevamente.',
                            confirmButtonText: 'Entendido'
                        });
                    });
            }
        })
        .catch(error => {
            console.error('Error al verificar el cliente:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error de conexión',
                text: 'No se pudo verificar la existencia del cliente.',
                confirmButtonText: 'Entendido'
            });
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

function editarCliente(clienteId) {
    const apiUrl = `http://localhost:3000/api/cliente/${clienteId}`;
    const clienteData = obtenerDatosFormulario(); // 

    axios.put(apiUrl, clienteData)
        .then(response => {
            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Cliente actualizado',
                    text: 'El cliente ha sido actualizado con éxito.',
                    confirmButtonText: 'Entendido'
                }).then(() => {
                    location.reload(); 
                });
            }
        })
        .catch(error => {
            console.error("Error al actualizar el cliente:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error al actualizar',
                text: 'No se pudo actualizar el cliente. Intenta nuevamente.',
                confirmButtonText: 'Entendido'
            });
        });
}

function deshabilitarCliente(clienteId) {
    const apiUrl = `http://localhost:3000/api/cliente/deshabilitar/${clienteId}`;
    const clienteData = { estado: 0 };

    axios.put(apiUrl, clienteData)
        .then(response => {
            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Cliente deshabilitado',
                    text: 'El cliente ha sido deshabilitado con éxito.',
                    confirmButtonText: 'Entendido'
                }).then(() => {
                    location.reload(); // Refrescar la página después de que el usuario cierre el SweetAlert
                });
            }
        })
        .catch(error => {
            console.error("Error al deshabilitar el cliente:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error al deshabilitar',
                text: 'No se pudo deshabilitar el cliente. Intenta nuevamente.',
                confirmButtonText: 'Entendido'
            });
        });
}

/* function editarCliente(clienteId) {
    const apiUrl = `http://localhost:3000/api/cliente/${clienteId}`;
    const clienteData = obtenerDatosFormulario(); 
    axios.put(apiUrl, clienteData)
        .then(response => {
            if (response.status === 200) {
                alert("Cliente actualizado con éxito");
                location.reload(); 
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
 */

/* ver si esto se usa */
function obtenerDatosFiltro() {
    const nombre = document.getElementById('filtroNombre').value;
    const estado = parseInt(document.getElementById('filtroEstado').value, 10);

    // Retornamos un objeto con los valores de los filtros
    return {
        nombre: nombre || '',
        estado: estado || '',
    };
}

function modificarDatos(cliente) {
    console.log(cliente);
    cargarLocalidades('editar', cliente);
    cargarTiposCliente('editar', cliente);
    cargarCondicionFiscal('editar', cliente);
    precargarDatosCliente(cliente);
}

//Función para cargar datos del cliente al editar/modificar

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

/* Validaciones en carga de cliente----------------------------------------------------------- */
function validacionCampos() {
    let apellido = document.getElementById('apellido').value;
    let nombre = document.getElementById('nombre').value;
    let calle = document.getElementById('direccion').value;
    let numeroCalle = document.getElementById('numero').value;
    let piso = document.getElementById('piso').value;
    let numeroDepartamento = document.getElementById('departamento').value;
    let localidad = document.getElementById('ciudad').value;
    let zona = document.getElementById('zona').value;
    let tipoCliente = document.getElementById('tipoCliente').value;
    let razonSocial = document.getElementById('razonSocial').value;
    let cuitCuil = document.getElementById('cuit').value;
    let condicionFiscal = document.getElementById('condicionFiscal').value;
    let correoElectronico = document.getElementById('email').value;
    let telefono = document.getElementById('telefono').value;
    let fechaNacimiento = document.getElementById('fechaNacimiento').value;
    let DNI = document.getElementById('DNI').value;
    let estado = document.getElementById('estado').value;

    let error = false;
    let mensajesError = ""; // Variable para acumular los mensajes de error
    let camposObligatoriosFaltantes = []; // Array para almacenar campos obligatorios faltantes

    if (nombre === "") {
        camposObligatoriosFaltantes.push("Nombre");
        error = true;
    } else if (nombre.length > 40) {
        mensajesError += "El valor ingresado en Nombres no debe superar los 40 caracteres.<br>";
        error = true;
    } else {
        let regex = /^[A-Za-zÀ-ÿ\s]+$/;
        if (!regex.test(nombre)) {
            mensajesError += "El campo Nombres solo debe contener letras<br>";
            error = true;
        }
    }

    if (apellido === "") {
        camposObligatoriosFaltantes.push("Apellido");
        error = true;
    } else if (apellido.length > 40) {
        mensajesError += "El valor ingresado en Apellidos no debe superar los 40 caracteres.<br>";
        error = true;
    } else {
        let regex = /^[A-Za-zÀ-ÿ\s]+$/;
        if (!regex.test(apellido)) {
            mensajesError += "El campo Apellidos solo debe contener letras.<br>";
            error = true;
        }
    }

    if (calle === "") {
        camposObligatoriosFaltantes.push("Dirección");
        error = true;
    } else if (calle.length > 30) {
        mensajesError += "El valor ingresado en Dirección no debe superar los 30 caracteres.<br>";
        error = true;
    } else {
        let regex = /^[a-zA-Z0-9\s]+$/;
        if (!regex.test(calle)) {
            mensajesError += "El campo Dirección solo puede contener letras y números.<br>";
            error = true;
        }
    }

    if (numeroCalle === "") {
        camposObligatoriosFaltantes.push("Número");
        error = true;
    } else if (isNaN(numeroCalle)) {
        mensajesError += "El valor ingresado en Número debe ser un número.<br>";
        error = true;
    } else if (parseInt(numeroCalle) <= 0) {
        mensajesError += "El valor ingresado en Número debe ser mayor que 0.<br>";
        error = true;
    }

    if (piso !== "") {
        if (isNaN(piso)) {
            mensajesError += "El valor ingresado en Piso debe ser un número.<br>";
            error = true;
        } else if (parseInt(piso) < 0) {
            mensajesError += "El valor ingresado en Piso no puede ser negativo.<br>";
            error = true;
        }
    }

    if (numeroDepartamento !== "") {
        if (numeroDepartamento.length > 5) {
            mensajesError += "El valor ingresado en N° Dpto. no debe superar los 5 caracteres.<br>";
            error = true;
        } else {
            let regex = /^[a-zA-Z0-9]+$/;
            if (!regex.test(numeroDepartamento)) {
                mensajesError += "El campo N° Dpto. solo puede contener letras y/o números.<br>";
                error = true;
            }
        }
    }

    if (razonSocial !== "" && razonSocial.length > 50) {
        mensajesError += "El valor ingresado en Razón Social no debe superar los 50 caracteres.<br>";
        error = true;
    }

    if (cuitCuil !== "") {
        let regex = /^\d{2}-\d{8}-\d{1}$/; // Formato para CUIT/CUIL: XX-XXXXXXXX-X
        if (!regex.test(cuitCuil)) {
            mensajesError += "El formato del CUIT/CUIL no es válido. Debe ser XX-XXXXXXXX-X.<br>";
            error = true;
        }
    }

    if (DNI !== "" && DNI.length > 10) {
        mensajesError += "El valor ingresado en DNI no debe superar los 10 caracteres.<br>";
        error = true;
    }

    if (telefono !== "" && telefono.length > 25) {
        mensajesError += "El valor ingresado en Teléfono no debe superar los 25 caracteres.<br>";
        error = true;
    }

    if (correoElectronico !== "") {
        let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!regex.test(correoElectronico)) {
            mensajesError += "El formato del Correo Electrónico no es válido.<br>";
            error = true;
        }
    }

    if (fechaNacimiento === "") {
        camposObligatoriosFaltantes.push("Fecha de Nacimiento");
        error = true;
    }

    if (condicionFiscal === "") {
        camposObligatoriosFaltantes.push("Condición Fiscal");
        error = true;
    }

    if (localidad === "") {
        camposObligatoriosFaltantes.push("Localidad");
        error = true;
    }

    if (zona === "") {
        camposObligatoriosFaltantes.push("Zona");
        error = true;
    }

    if (tipoCliente === "") {
        camposObligatoriosFaltantes.push("Tipo de Cliente");
        error = true;
    }

    if (estado === "") {
        camposObligatoriosFaltantes.push("Estado");
        error = true;
    }

    if (camposObligatoriosFaltantes.length > 0) {
        mensajesError += "Ingrese datos en: " + camposObligatoriosFaltantes.join(", ") + ".<br>";
    }

    // Si hay errores, mostrar una sola alerta con todos los mensajes acumulados
    if (error) {
        Swal.fire({
            icon: 'error',
            title: 'Campos obligatorios faltantes',
            html: mensajesError, // Usar html para permitir saltos de línea
            confirmButtonText: 'Entendido'
        });
    }

    return !error; // Retorna false si hay errores
}

/* function validacionGuardar(event) {
    event.preventDefault();

    if (validacionCampos()) {
        let nombre = document.getElementById("nombre").value;
        let apellido = document.getElementById("apellido").value;
        let direccion = document.getElementById("direccion").value;
        let numero = document.getElementById("numero").value;
        let piso = document.getElementById("piso").value;
        let departamento = document.getElementById("departamento").value;
        let ciudad = document.getElementById("ciudad").value;

        let nuevoRegistro = {
            nombre: primeraMayuscula(nombre),
            apellido: primeraMayuscula(apellido),
            direccion: primeraMayuscula(direccion),
            numero: numero,
            piso: piso,
            departamento: departamento,
            ciudad: ciudad
        };

        if (registros.length < 3) {
            let registroExistente = registros.some(registro =>
                registro.nombre === nombre &&
                registro.apellido === apellido &&
                registro.direccion === direccion &&
                registro.numero === numero &&
                registro.piso === piso &&
                registro.departamento === departamento &&
                registro.ciudad === ciudad
            );

            if (!registroExistente) {
                nuevoRegistro.sector = asignarSectorAleatorio();
                registros.push(nuevoRegistro);

                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Formulario guardado con éxito.",
                    showConfirmButton: false,
                    timer: 1500
                });

                document.getElementById("formularioPersonal").reset();

                estadoBotonGuardar();
                estadoBotonListar();

            } else {
                alertaRegistroRepetido();
            }
        }
    }
} */

function alertaRegistroRepetido() {
    Swal.fire({
        icon: "error",
        title: "Registro repetido",
        text: "Esta persona ya fue cargada."
    });
}

function primeraMayuscula(cadena) {
    if (cadena.length === 0) {
        return cadena;
    }

    return cadena.split(" ").map(palabra =>
        palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase()
    ).join(" ");
}

function validarNombre() {
    const nombre = document.getElementById('nombre').value;
    const errorMessageElement = document.getElementById('error-nombre');
    let mensajeError = "";

    if (nombre === "") {
        mensajeError = "* Campo obligatorio";
    } else if (nombre.length > 40) {
        mensajeError = "No superar los 40 caracteres";
    } else if (!/^[A-Za-zÀ-ÿ\s]+$/.test(nombre)) {
        mensajeError = "Ingrese solo letras";
    }

    errorMessageElement.textContent = mensajeError;
}

function validarApellido() {
    const apellido = document.getElementById('apellido').value;
    const errorMessageElement = document.getElementById('error-apellido');
    let mensajeError = "";

    if (apellido === "") {
        mensajeError = "* Campo obligatorio";
    } else if (apellido.length > 40) {
        mensajeError = "No superar los 40 caracteres";
    } else if (!/^[A-Za-zÀ-ÿ\s]+$/.test(apellido)) {
        mensajeError = "Ingrese solo letras";
    }

    errorMessageElement.textContent = mensajeError;
}

function validarDireccion() {
    const direccion = document.getElementById('direccion').value;
    const errorMessageElement = document.getElementById('error-direccion');
    let mensajeError = "";

    if (direccion === "") {
        mensajeError = "* Campo obligatorio";
    } else if (direccion.length > 30) {
        mensajeError = "No superar los 30 caracteres";
    } else if (!/^[a-zA-Z0-9\s]+$/.test(direccion)) {
        mensajeError = "Ingrese solo letras";
    }

    errorMessageElement.textContent = mensajeError;
}

function validarNumero() {
    const numero = document.getElementById('numero').value;
    const errorMessageElement = document.getElementById('error-numero');
    let mensajeError = "";

    if (numero === "") {
        mensajeError = "* Campo obligatorio";
    } else if (isNaN(numero) || parseInt(numero) <= 0) {
        mensajeError = "No ingrese numeros negativos";
    }

    errorMessageElement.textContent = mensajeError;
}

function validarPiso() {
    const piso = document.getElementById('piso').value;
    const errorMessageElement = document.getElementById('error-piso');
    let mensajeError = "";

    if (piso && (isNaN(piso) || parseInt(piso) < 0)) {
        mensajeError = "No ingrese numeros negativos";
    }

    errorMessageElement.textContent = mensajeError;
}

function validarDepartamento() {
    const departamento = document.getElementById('departamento').value;
    const errorMessageElement = document.getElementById('error-departamento');
    let mensajeError = "";

    if (departamento && !/^[0-9A-Za-z]+$/.test(departamento)) {
        mensajeError = "Ingrese solo letras y números";
    }

    errorMessageElement.textContent = mensajeError;
}

function validarLocalidad() {
    const localidad = document.getElementById('ciudad').value;
    const errorMessageElement = document.getElementById('error-ciudad');
    let mensajeError = "";

    if (localidad === "") {
        mensajeError = "* Campo obligatorio";
    }

    errorMessageElement.textContent = mensajeError;
}

function validarZona() {
    const zona = document.getElementById('zona').value;
    const errorMessageElement = document.getElementById('error-zona');
    let mensajeError = "";

    if (zona === "") {
        mensajeError = "* Campo obligatorio";
    }

    errorMessageElement.textContent = mensajeError;
}

function validarTipoCliente() {
    const tipoCliente = document.getElementById('tipoCliente').value;
    const errorMessageElement = document.getElementById('error-tipoCliente');
    let mensajeError = "";

    if (tipoCliente === "") {
        mensajeError = "* Campo obligatorio";
    }

    errorMessageElement.textContent = mensajeError;
}

function validarRazonSocial() {
    const razonSocial = document.getElementById('razonSocial').value;
    const errorMessageElement = document.getElementById('error-razonSocial');
    let mensajeError = "";

    if (razonSocial && razonSocial.length > 40) {
        mensajeError = "No superar los 50 caracteres";
    }

    errorMessageElement.textContent = mensajeError;
}

function validarCuit() {
    const cuitCuil = document.getElementById('cuit').value;
    const errorMessageElement = document.getElementById('error-cuit');
    let mensajeError = "";

    if (cuitCuil && !/^\d{2}-\d{8}-\d{1}$/.test(cuitCuil)) {
        mensajeError = "Formato incorrecto";
    }

    errorMessageElement.textContent = mensajeError;
}

function validarCondicionFiscal() {
    const condicionFiscal = document.getElementById('condicionFiscal').value;
    const errorMessageElement = document.getElementById('error-condicionFiscal');
    let mensajeError = "";

    if (condicionFiscal === "") {
        mensajeError = "* Campo obligatorio";
    }

    errorMessageElement.textContent = mensajeError;
}

function validarEmail() {
    const correoElectronico = document.getElementById('email').value;
    const errorMessageElement = document.getElementById('error-email');
    let mensajeError = "";

    if (correoElectronico && !/^\S+@\S+\.\S+$/.test(correoElectronico)) {
        mensajeError = "Formato incorrecto.";
    }

    errorMessageElement.textContent = mensajeError;
}

function validarTelefono() {
    const telefono = document.getElementById('telefono').value;
    const errorMessageElement = document.getElementById('error-telefono');
    let mensajeError = "";

    if (telefono === "") {
        mensajeError = "* Campo obligatorio";
    } else if (!/^\d+$/.test(telefono)) {
        mensajeError = "Ingrese solo números";
    }

    errorMessageElement.textContent = mensajeError;
}

function validarFechaNacimiento() {
    const fechaNacimiento = document.getElementById('fechaNacimiento').value;
    const errorMessageElement = document.getElementById('error-fechaNacimiento');
    let mensajeError = "";

    if (fechaNacimiento === "") {
        mensajeError = "* Campo obligatorio";
    }

    errorMessageElement.textContent = mensajeError;
}

function validarDNI() {
    const DNI = document.getElementById('DNI').value;
    const errorMessageElement = document.getElementById('error-DNI');
    let mensajeError = "";

    // Se eliminó la verificación de campo obligatorio
    if (DNI && (isNaN(DNI) || DNI.length < 7 || DNI.length > 8)) {
        mensajeError = "No debe superar los 8 números";
    }

    errorMessageElement.textContent = mensajeError;
}

function validarEstado() {
    const estado = document.getElementById('estado').value;
    const errorMessageElement = document.getElementById('error-estado');
    let mensajeError = "";

    if (estado === "") {
        mensajeError = "* Campo obligatorio";
    }

    errorMessageElement.textContent = mensajeError;
}

document.getElementById('nombre').addEventListener('blur', validarNombre);
document.getElementById('nombre').addEventListener('input', () => {
    document.getElementById('error-nombre').textContent = "";
});

document.getElementById('apellido').addEventListener('blur', validarApellido);
document.getElementById('apellido').addEventListener('input', () => {
    document.getElementById('error-apellido').textContent = "";
});

document.getElementById('direccion').addEventListener('blur', validarDireccion);
document.getElementById('direccion').addEventListener('input', () => {
    document.getElementById('error-direccion').textContent = "";
});

document.getElementById('numero').addEventListener('blur', validarNumero);
document.getElementById('numero').addEventListener('input', () => {
    document.getElementById('error-numero').textContent = "";
});

document.getElementById('piso').addEventListener('blur', validarPiso);
document.getElementById('piso').addEventListener('input', () => {
    document.getElementById('error-piso').textContent = "";
});

document.getElementById('departamento').addEventListener('blur', validarDepartamento);
document.getElementById('departamento').addEventListener('input', () => {
    document.getElementById('error-departamento').textContent = "";
});

document.getElementById('ciudad').addEventListener('blur', validarLocalidad);
document.getElementById('ciudad').addEventListener('input', () => {
    document.getElementById('error-ciudad').textContent = "";
});

document.getElementById('zona').addEventListener('blur', validarZona);
document.getElementById('zona').addEventListener('input', () => {
    document.getElementById('error-zona').textContent = "";
});

document.getElementById('tipoCliente').addEventListener('blur', validarTipoCliente);
document.getElementById('tipoCliente').addEventListener('input', () => {
    document.getElementById('error-tipoCliente').textContent = "";
});

document.getElementById('razonSocial').addEventListener('blur', validarRazonSocial);
document.getElementById('razonSocial').addEventListener('input', () => {
    document.getElementById('error-razonSocial').textContent = "";
});

document.getElementById('cuit').addEventListener('blur', validarCuit);
document.getElementById('cuit').addEventListener('input', () => {
    document.getElementById('error-cuit').textContent = "";
});

document.getElementById('condicionFiscal').addEventListener('blur', validarCondicionFiscal);
document.getElementById('condicionFiscal').addEventListener('input', () => {
    document.getElementById('error-condicionFiscal').textContent = "";
});

document.getElementById('email').addEventListener('blur', validarEmail);
document.getElementById('email').addEventListener('input', () => {
    document.getElementById('error-email').textContent = "";
});

document.getElementById('telefono').addEventListener('blur', validarTelefono);
document.getElementById('telefono').addEventListener('input', () => {
    document.getElementById('error-telefono').textContent = "";
});

document.getElementById('fechaNacimiento').addEventListener('blur', validarFechaNacimiento);
document.getElementById('fechaNacimiento').addEventListener('input', () => {
    document.getElementById('error-fechaNacimiento').textContent = "";
});

document.getElementById('DNI').addEventListener('blur', validarDNI);
document.getElementById('DNI').addEventListener('input', () => {
    document.getElementById('error-DNI').textContent = "";
});

document.getElementById('estado').addEventListener('blur', validarEstado);
document.getElementById('estado').addEventListener('input', () => {
    document.getElementById('error-estado').textContent = "";
});