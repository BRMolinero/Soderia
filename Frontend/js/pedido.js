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
    document.getElementById('recurrenteCheck').addEventListener('change', function () {
        document.getElementById('recurrenteOptions').classList.toggle('d-none', !this.checked);
    });

    // Agregar nuevo producto
    document.getElementById('addProducto').addEventListener('click', function () {
        var productosContainer = document.getElementById('productosContainer');
        var productoCount = productosContainer.querySelectorAll('.producto-row').length;
        var newProductoRow = document.createElement('div');
        newProductoRow.className = 'd-flex align-items-end mb-3 producto-row';
        newProductoRow.innerHTML = `
<div class=" col-lg-4 col-md-6 col-sm-6 col-7"">
<label for="productoSelect${productoCount}" class="form-label"></label>
<select id="productoSelect${productoCount}" class="form-select producto-select" required>
<option value="" disabled selected>Seleccione Producto</option>
<!-- Opciones de Productos -->
<option value="003">Botellón de Agua 12L</option>
<option value="004">Botellón de Agua 20L</option>
<option value="007">Cilindro de Gas 45kg</option>
<option value="008">Cilindro de Gas 60kg</option>
<option value="005">Garrafa de Gas 10kg</option>
<option value="006">Garrafa de Gas 15kg</option>
<option value="002">Soda en Sifón 500cc</option>
<option value="001">Soda en Sifón 1500cc</option>

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
        productosContainer.appendChild(newProductoRow);
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

/* el resto que hay que traer está en secundarias */



