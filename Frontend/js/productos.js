async function cargarProductosTabla(filter = null) {
    try {
        if (filter) {
            response = await axios.get('http://localhost:3000/api/producto', {
                params: filter // Pasamos los filtros como parámetros de la URL
            });
            console.log(response.data); // Verifica que estás recibiendo datos
        } else {
            response = await axios.get('http://localhost:3000/api/producto');
            console.log(response.data); // Verifica que estás recibiendo datos
        }

        const tbody = document.querySelector('#productosTable tbody');

        // Limpiar el contenido del tbody antes de agregar nuevos datos
        tbody.innerHTML = '';

        // Iterar sobre cada producto y agregar a la tabla
        response.data.forEach(producto => agregarFilaProducto(tbody, producto));
    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
}

function 
agregarFilaProducto(tbody, producto) {
    const fila = document.createElement('tr');

    // Crear y agregar las celdas directamente
    celda = document.createElement('td');
    celda.textContent = producto.codigoInterno;
    fila.appendChild(celda);

    let celda = document.createElement('td');
    celda.textContent = producto.nombre;
    fila.appendChild(celda);

    celda = document.createElement('td');
    celda.textContent = producto.tipo;
    fila.appendChild(celda);

    celda = document.createElement('td');
    celda.textContent = producto.proveedor;
    fila.appendChild(celda);

    celda = document.createElement('td');
    celda.textContent = producto.presentacion;
    fila.appendChild(celda);

    celda = document.createElement('td');
    celda.textContent = producto.stockMinimo;
    fila.appendChild(celda);

    celda = document.createElement('td');
    celda.textContent = producto.stock;
    fila.appendChild(celda);

    celda = document.createElement('td');
    celda.textContent = producto.precioMayorista;
    fila.appendChild(celda);

    celda = document.createElement('td');
    celda.textContent = producto.precioMinorista;
    fila.appendChild(celda);

    celda = document.createElement('td');
    celda.textContent = producto.correoElectronico;
    fila.appendChild(celda);

    celda = document.createElement('td');
    celda.textContent = producto.estado === 1 ? 'Activo' : 'Inactivo';
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
    botonModificar.setAttribute('data-bs-target', '#productoModal'); // Target del modal

    // Añadir el icono de Bootstrap dentro del botón Modificar
    const iconoModificar = document.createElement("i");
    iconoModificar.classList.add('bi', 'bi-pencil-square'); // Añadir clases de Bootstrap Icons
    botonModificar.appendChild(iconoModificar);

    // Añadir el evento de clic para modificar
    botonModificar.addEventListener("click", function () {
        // Aquí iría la función que maneja la modificación de los datos
        document.getElementById('productoModalLabel').innerHTML = '<i class="bi bi-person-plus p-1"></i> Editar Producto';
        document.getElementById('productoModal').setAttribute('data-action', 'editar');
        document.getElementById('productoId').value = producto.idProducto;
        modificarDatos(producto);
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
        // eliminarProducto(producto.idProducto);
        deshabilitarProducto(producto.idProducto);
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


function nuevoProducto() {
    const apiUrl = `http://localhost:3000/api/producto`;
    const productoData = obtenerDatosFormulario();

    // if (!validarDatos(productoData)) return; // Valida los datos antes de enviarlos

    axios.post(apiUrl, productoData)
        .then(function (response) {
            if (response.status === 200 || response.status === 201) {
                console.log('Producto guardado:', response.data);
                alert("Producto Guardado");
                location.reload();
            } else {
                throw new Error('Error al guardar el producto: ' + response.status);
            }
        })
        .catch(function (error) {
            console.error('Error al guardar el producto:', error.response ? error.response.data : error.message);
            alert('Error al guardar el producto. Intenta nuevamente.');
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
        idTipoProducto: parseInt(document.getElementById('tipoProducto').value, 10),
        estado: parseInt(document.getElementById('estado').value, 10)
    };
}

// ver si la uso
function validarDatos(productoData) {
    const camposObligatorios = ['nombre', 'apellido', 'telefono', 'correoElectronico', 'calle', 'numeroCalle', 'fechaNacimiento', 'idZona', 'idTipoProducto'];
    for (const campo of camposObligatorios) {
        if (!productoData[campo]) {
            alert(`Falta completar el campo: ${campo}`);
            return false;
        }
    }
    return true;
}

botonGuardar.addEventListener("click", function (event) {
    event.preventDefault();

    const productoId = document.getElementById('productoId').value;

    if (productoId) {
        editarProducto(productoId);
    } else {
        nuevoProducto();
    }

});

function editarProducto(productoId) {
    const apiUrl = `http://localhost:3000/api/producto/${productoId}`;
    const productoData = obtenerDatosFormulario(); // Recoge los datos del formulario

    axios.put(apiUrl, productoData)
        .then(response => {
            if (response.status === 200) {
                alert("Producto actualizado con éxito");
                location.reload(); // Refrescar la página
            }
        })
        .catch(error => {
            console.error("Error al actualizar el producto:", error);
            alert("Error al actualizar el producto.");
        });
}

function deshabilitarProducto(productoId) {
    const apiUrl = `http://localhost:3000/api/producto/deshabilitar/${productoId}`;
    const productoData = { estado: 0 };

    axios.put(apiUrl, productoData)
        .then(response => {
            if (response.status === 200) {
                alert("Producto deshabilitado con éxito");
                location.reload(); // Refrescar la página
            }
        })
        .catch(error => {
            console.error("Error al deshabilitar el producto:", error);
            alert("Error al deshabilitar el producto.");
        });
}

let botonNuevoProducto = document.getElementById("botonNuevoProducto");
botonNuevoProducto.addEventListener("click", function (event) {
    document.getElementById('productoModalLabel').innerHTML = '<i class="bi bi-person-plus p-1"></i>Nuevo Producto';
    cargarLocalidades('crear');
    cargarTiposProducto('crear');
    cargarCondicionFiscal('crear');
});

let botonFiltrar = document.getElementById("btnFiltrar");
botonFiltrar.addEventListener("click", function (event) {
    filter = obtenerDatosFiltro();
    cargarProductosTabla(filter);
});

function obtenerDatosFiltro() {
    const nombre = document.getElementById('filtroNombre').value;
    const estado = parseInt(document.getElementById('filtroEstado').value, 10);

    // Retornamos un objeto con los valores de los filtros
    return {
        nombre: nombre || '',
        estado: estado || '',
    };
}


function modificarDatos(producto) {
    console.log(producto);
    cargarLocalidades('editar', producto);
    cargarTiposProducto('editar', producto);
    cargarCondicionFiscal('editar', producto);
    precargarDatosProducto(producto);
}

//Función para cargar datos del producto al editar

function precargarDatosProducto(producto) {
    document.getElementById('apellido').value = producto.apellido;
    document.getElementById('nombre').value = producto.nombre;
    document.getElementById('direccion').value = producto.calle;
    document.getElementById('numero').value = producto.numeroCalle;
    document.getElementById('piso').value = producto.piso;
    document.getElementById('departamento').value = producto.numeroDepartamento;
    document.getElementById('email').value = producto.correoElectronico;
    document.getElementById('cuit').value = producto.cuitCuil,
    document.getElementById('razonSocial').value = producto.razonSocial,
    document.getElementById('estado').value = producto.estado,
    document.getElementById('telefono').value = producto.telefono,
    fechaNacimiento = formatearFecha(producto.fechaNacimiento);
    document.getElementById('fechaNacimiento').value = fechaNacimiento,
    document.getElementById('DNI').value = producto.DNI;
}

function formatearFecha(fecha) {
    const partes = fecha.split('-');
    const dia = partes[0];
    const mes = partes[1];
    const anio = partes[2];

    // Retornar en el formato "aaaa-mm-dd"
    return `${anio}-${mes}-${dia}`;
}

cargarProductosTabla();