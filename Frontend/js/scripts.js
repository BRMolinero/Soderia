/*!
    * Start Bootstrap - SB Admin v7.0.7 (https://startbootstrap.com/template/sb-admin)
    * Copyright 2013-2023 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-sb-admin/blob/master/LICENSE)
    */
// 
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        // Uncomment Below to persist sidebar toggle between refreshes
        // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        //     document.body.classList.toggle('sb-sidenav-toggled');
        // }
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

});

/* Filtros clientes */
document.addEventListener('DOMContentLoaded', function () {
    const filterApellido = document.getElementById('filterApellido');
    const filterRazonSocial = document.getElementById('filterRazonSocial');
    const table = document.getElementById('clientesTable');
    const tableBody = table.querySelector('tbody');

    function filterTable() {
        const apellidoFilter = filterApellido.value.toLowerCase();
        const razonSocialFilter = filterRazonSocial.value.toLowerCase();

        for (const row of tableBody.rows) {
            const apellidoCell = row.cells[1].textContent.toLowerCase();
            const razonSocialCell = row.cells[9].textContent.toLowerCase();

            const matchesApellido = apellidoCell.includes(apellidoFilter);
            const matchesRazonSocial = razonSocialCell.includes(razonSocialFilter);

            row.style.display = (matchesApellido && matchesRazonSocial) ? '' : 'none';
        }
    }

    filterApellido.addEventListener('input', filterTable);
    filterRazonSocial.addEventListener('input', filterTable);
});
document.addEventListener('DOMContentLoaded', function () {
    const rowsPerPageSelect = document.getElementById('rowsPerPage');
    const table = document.getElementById('clientesTable');
    const rows = table.getElementsByTagName('tr');



    // Función para mostrar la cantidad de filas seleccionada
    function updateTableRows() {
        const rowsPerPage = parseInt(rowsPerPageSelect.value, 10);
        let currentRow = 1;

        for (let i = 1; i < rows.length; i++) {
            if (currentRow <= rowsPerPage) {
                rows[i].style.display = '';
            } else {
                rows[i].style.display = 'none';
            }
            currentRow++;
        }
    }

    // Escucha el cambio en el selector de filas
    rowsPerPageSelect.addEventListener('change', updateTableRows);

    // Llama a la función para mostrar las filas al cargar la página
    updateTableRows();
});


/* Mostrar una alerta al presionar "Eliminar" */

document.addEventListener('DOMContentLoaded', function () {
    // Selecciona todos los botones de eliminar
    const deleteButtons = document.querySelectorAll('.btn-outline-danger');

    deleteButtons.forEach(button => {
        button.addEventListener('click', function () {
            Swal.fire({
                title: '¿Estás seguro?',
                text: 'No podrás deshacer esta acción',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, eliminarlo',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                        'Eliminado',
                        'El elemento ha sido eliminado.',
                        'success'
                    );
                    // Aquí puedes agregar el código para eliminar el elemento de la tabla o base de datos
                }
            });
        });
    });
});


/* Modal para editar la tabla */

document.addEventListener('DOMContentLoaded', function () {
    // Selecciona todos los botones de editar
    const editButtons = document.querySelectorAll('.btn-outline-primary');

    editButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Obtén los datos de la fila correspondiente
            const row = this.closest('tr');
            const itemName = row.querySelector('.item-name').textContent;
            const itemDescription = row.querySelector('.item-description').textContent;

            // Rellena los campos del modal con los datos obtenidos
            document.getElementById('itemName').value = itemName;
            document.getElementById('itemDescription').value = itemDescription;

            // Muestra el modal
            const editModal = new bootstrap.Modal(document.getElementById('editModal'));
            editModal.show();
        });
    });
});

/* Alerta para el modal Editar de clientes */
/* 
document.addEventListener('DOMContentLoaded', function () {
    console.log('El script se está ejecutando');
    var guardarBotonEditar = document.getElementById('guardarBotonEditar');
    guardarBotonEditar.addEventListener('click', function () {
        alert('Datos guardados exitosamente!');
    });
});
 */

document.addEventListener('DOMContentLoaded', function () {
    var guardarBotonEditar = document.getElementById('guardarBotonEditar');
    if (guardarBotonEditar) {
        guardarBotonEditar.addEventListener('click', function () {
            Swal.fire({
                title: '¿Estás seguro?',
                text: "¿Deseas guardar los cambios?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, guardar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    // Aquí puedes agregar el código para guardar los datos, si es necesario
                    Swal.fire(
                        '¡Guardado!',
                        'Los cambios han sido guardados.',
                        'success'
                    ).then(() => {
                        // Cierra el modal
                        var modal = bootstrap.Modal.getInstance(document.getElementById('editarClienteModal'));
                        if (modal) {
                            modal.hide();
                        }
                    });
                }
            });
        });
    } else {
        console.error('Elemento con ID "guardarBotonEditar" no encontrado');
    }
});

/* Paginacion Tabla clientes */
document.addEventListener('DOMContentLoaded', function () {
    const rowsPerPage = 20;
    const table = document.querySelector('#clientesTable tbody');
    const pagination = document.querySelector('#pagination');

    const rows = Array.from(table.querySelectorAll('tr'));
    const numPages = Math.ceil(rows.length / rowsPerPage);

    function displayPage(page) {
        rows.forEach((row, index) => {
            row.style.display = (Math.floor(index / rowsPerPage) === page) ? '' : 'none';
        });
        updatePagination(page);
    }

    function updatePagination(currentPage) {
        pagination.innerHTML = '';
        for (let i = 0; i < numPages; i++) {
            const li = document.createElement('li');
            li.className = 'page-item' + (i === currentPage ? ' active' : '');
            const a = document.createElement('a');
            a.className = 'page-link';
            a.href = '#';
            a.textContent = i + 1;
            a.addEventListener('click', (e) => {
                e.preventDefault();
                displayPage(i);
            });
            li.appendChild(a);
            pagination.appendChild(li);
        }
    }

    // Inicializar la paginación en la primera página
    displayPage(0);
});


/* Login */

const togglePassword = document.querySelector('#togglePassword');
const password = document.querySelector('#password');

togglePassword.addEventListener('click', function () {
    // Toggle the type attribute
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);

    // Toggle the icon
    this.classList.toggle('bi-eye');
    this.classList.toggle('bi-eye-slash');
});


/* Peidos modal */
/* está en html ver porque no anda al eta acá */





