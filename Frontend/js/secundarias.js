/* TIPO DE CLIENTE */
async function cargarTiposCliente() {
    try {
        const response = await axios.get('http://localhost:3000/api/secundarias/tipo-cliente');
        const selectTipoCliente = document.querySelector('#tipoCliente');

        selectTipoCliente.innerHTML = '<option value="" selected disabled>Seleccione un tipo</option>';
        response.data.forEach(tipoCliente => {
            const option = document.createElement('option');
            option.value = tipoCliente.idTipoCliente;
            option.textContent = tipoCliente.nombre;
            selectTipoCliente.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar los tipos de cliente:', error);
    }
}

/* ZONA */
async function cargarZonas(idLocalidadSeleccionada) {
    try {
        const response = await axios.get('http://localhost:3000/api/secundarias/zona');
        const zonasFiltradas = response.data.filter(zona => zona.idLocalidad == idLocalidadSeleccionada);
        const selectZona = document.querySelector('#zona');
        const a = 1;
        selectZona.innerHTML = '<option value="" selected disabled>Seleccione una zona</option>';
        zonasFiltradas.forEach(zona => {
            const option = document.createElement('option');
            option.value = zona.idZona;
            option.textContent = zona.zona;
            selectZona.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar las zonas:', error);
    }
}

/* LOCALIDAD */
async function cargarLocalidades() {
    try {
        const response = await axios.get('http://localhost:3000/api/secundarias/localidad');
        const selectLocalidad = document.querySelector('#ciudad');
        const selectZona = document.querySelector('#zona');

        selectLocalidad.innerHTML = '<option value="" selected disabled>Seleccione una localidad</option>';
        response.data.forEach(localidad => {
            const option = document.createElement('option');
            option.value = localidad.idLocalidad;
            option.textContent = localidad.localidad;
            selectLocalidad.appendChild(option);
        });

        // Deshabilitar el select de zona inicialmente
        selectZona.disabled = true;

        // Habilitar y cargar las zonas cuando se selecciona una localidad
        selectLocalidad.addEventListener('change', function() {
            const idLocalidadSeleccionada = this.value;
            if (idLocalidadSeleccionada) {
                cargarZonas(idLocalidadSeleccionada);
                selectZona.disabled = false;
            } else {
                selectZona.innerHTML = '<option value="" selected disabled>Seleccione una zona</option>';
                selectZona.disabled = true;
            }
        });
    } catch (error) {
        console.error('Error al cargar las localidades:', error);
    }
}
    async function cargarCondicionFiscal() {
        try {
            const response = await axios.get('http://localhost:3000/api/secundarias/condicion-fiscal');
            console.log(response.data); // Verifica los datos aquí
            const selectCondicionFiscal = document.querySelector('#condicionFiscal');
            selectCondicionFiscal.innerHTML = '<option value="" selected disabled>Seleccione Cond. Fiscal</option>';
            response.data.forEach(condicionFiscal => {
                const option = document.createElement('option');
                option.value = condicionFiscal.idCondicionFiscal;
                option.textContent = condicionFiscal.condicionFiscal || 'Sin Nombre'; // Por si el campo nombre está vacío
                selectCondicionFiscal.appendChild(option);
            });
        } catch (error) {
            console.error('Error al cargar las condiciones fiscales:', error);
        }
    }
    

document.addEventListener('DOMContentLoaded', function () {
    cargarLocalidades();
    cargarTiposCliente();
    cargarCondicionFiscal();
});

