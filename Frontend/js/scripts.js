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



/* Mostrar una alerta al presionar "Eliminar" */

/* document.addEventListener('DOMContentLoaded', function () { */
    // Selecciona todos los botones de eliminar
/*     const deleteButtons = document.querySelectorAll('.btn-outline-danger');

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
                        'success' */
                   /*  ); */
                    // Aquí puedes agregar el código para eliminar el elemento de la tabla o base de datos
/*                 }
            });
        });
    });
});
 */

/* Modal para editar la tabla */

/* document.addEventListener('DOMContentLoaded', function () {
   
    const editButtons = document.querySelectorAll('.btn-outline-primary');

    editButtons.forEach(button => {
        button.addEventListener('click', function () {
      
            const row = this.closest('tr');
            const itemName = row.querySelector('.item-name').textContent;
            const itemDescription = row.querySelector('.item-description').textContent;

          
            document.getElementById('itemName').value = itemName;
            document.getElementById('itemDescription').value = itemDescription;

           
            const editModal = new bootstrap.Modal(document.getElementById('editModal'));
            editModal.show();
        });
    });
});
 */
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








