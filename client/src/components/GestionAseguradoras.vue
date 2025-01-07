<template>
  <div class="contenedor-principal">
    <!-- Columna izquierda: Formulario de creación de aseguradoras -->
    <div class="columna-formulario">
      <h2>Gestión de Aseguradoras</h2>

      <!-- Formulario para crear o editar una aseguradora -->
      <form @submit.prevent="editarAseguradoraId ? actualizarAseguradora() : crearAseguradora()">
        <!-- Campo de Nombre -->
        <label>Nombre:
          <input
            type="text"
            v-model="nuevaAseguradora.nombre"
            required
            pattern="^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$"
            @input="validateNombre"
            @blur="validateRequired($event, 'Obligatorio. Debe contener letras.')"
          />
        </label>

        <!-- Selección de Especialidades -->
        <label>Especialidad:
          <select v-model="especialidadTemp" @change="obtenerPrestaciones">
            <option disabled value="">Seleccione una especialidad</option>
            <option v-for="especialidad in especialidades" :key="especialidad._id" :value="especialidad._id">
              {{ especialidad.nombre }}
            </option>
          </select>
        </label>

        <!-- Selección de Prestaciones con Tarifas -->
        <div v-if="prestaciones.length > 0">
          <label>Prestaciones:
            <select v-model="prestacionTemp.id">
              <option disabled value="">Seleccione una prestación</option>
              <option v-for="prestacion in prestaciones" :key="prestacion._id" :value="prestacion._id">
                {{ prestacion.nombre }}
              </option>
            </select>
          </label>

          <!-- Campo de Tarifa, visible solo si hay una prestación seleccionada -->
          <div v-if="prestacionTemp.id">
            <label>Tarifa (€):
              <input
                type="number"
                v-model="prestacionTemp.tarifa"
                placeholder="Tarifa (€)"
                required
                min="0"
              />
            </label>
            <button @click.prevent="agregarPrestacion" class="boton-agregar">Añadir</button>
          </div>
        </div>

        <!-- Lista de Prestaciones Añadidas con Tarifas -->
        <ul>
          <li v-for="(cobertura, index) in nuevaAseguradora.cobertura" :key="index">
            {{ obtenerNombreEspecialidad(cobertura.especialidad) }}:
            {{ obtenerNombrePrestacion(cobertura.prestacion) }} -
            <strong>{{ cobertura.tarifa }} €</strong>
            <button @click.prevent="eliminarPrestacion(index)" class="boton-eliminar-operacion">Eliminar</button>
          </li>
        </ul>

        <!-- Botones de acción -->
        <v-btn class="ma-2 boton-crear" type="submit" v-if="!editarAseguradoraId">
          Crear Aseguradora
        </v-btn>
        <v-btn class="ma-2 boton-guardar" type="button" v-if="editarAseguradoraId" @click="actualizarAseguradora">
          Guardar Cambios
        </v-btn>
        <v-btn class="ma-2 boton-cancelar" type="button" v-if="editarAseguradoraId" @click="cancelarEdicion">
          Cancelar
        </v-btn>
      </form>
    </div>

    <!-- Columna derecha: Lista de aseguradoras -->
    <div class="columna-lista">
      <h3>Listado de Aseguradoras</h3>

      <!-- Indicador de error y carga -->
      <v-alert
        v-if="errorServidor"
        type="error"
        class="alerta-error"
        prominent
        color="red lighten-3"
      >
        <span class="alert-text">Fallo de comunicación con el servidor</span>
      </v-alert>

      <div v-if="cargando && !errorServidor" class="text-center">
        <v-progress-circular
          :size="70"
          :width="7"
          color="#17195e"
          indeterminate
        ></v-progress-circular>
      </div>

      <div v-if="!cargando && !errorServidor && aseguradoras.length === 0" class="texto-centrado">
        <p>La lista está vacía</p>
      </div>

      <!-- Tabla de aseguradoras -->
      <table class="department-table" v-if="aseguradoras.length !== 0">
        <thead>
          <tr>
            <th></th>
            <th>Nombre</th>
            <th>Prestaciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="aseguradora in aseguradoras" :key="aseguradora._id">
            <td class="department-actions">
              <v-btn class="boton-modificar" @click="cargarAseguradora(aseguradora)">
                <i class="bi bi-pencil-square"></i>
              </v-btn>
              <v-btn class="boton-eliminar" @click="confirmarEliminacion(aseguradora._id)">
                <i class="bi bi-trash"></i>
              </v-btn>
            </td>
            <td>{{ aseguradora.nombre }}</td>
            <td>
              <ul>
                <li v-for="(cobertura, coberturaIndex) in aseguradora.cobertura" :key="coberturaIndex">
                  {{ cobertura.prestacion.nombre }} ({{ cobertura.especialidad.nombre }}): {{ cobertura.tarifa }}
                </li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
  
  <script>
  import apiClient from '@/apiClient';
  
  export default {
    name: 'GestionAseguradoras',
    data() {
      return {
        especialidad:'',
        prestacion:'',

        aseguradoras: [],
        especialidades: [],
        prestaciones: [],
        nuevaAseguradora: {
          nombre: '',
          cobertura: [], // Contendrá especialidades, prestaciones y tarifas
        },
        especialidadTemp: '',
        prestacionTemp: { id: '', tarifa: '' },
        editarAseguradoraId: null,
        cargando: false,
        errorServidor: false,
      };
    },
    methods: {
        validateRequired(event, message) {
            event.target.setCustomValidity(''); // Resetea el mensaje personalizado
            if (!event.target.value) {
            event.target.setCustomValidity(message || 'Este campo es obligatorio');
            }
        },
      async obtenerAseguradoras() {
        this.cargando = true;
        try {
          const response = await apiClient.get('/api/aseguradoras');
          this.aseguradoras = response.data;
        } catch (error) {
          console.error('Error al obtener aseguradoras:', error);
          this.errorServidor = true;
        } finally {
          this.cargando = false;
        }
      },
      async obtenerEspecialidades() {
        try {
          const response = await apiClient.get('/api/departamentos/especialidades');
          this.especialidades = response.data;
        } catch (error) {
          console.error('Error al obtener especialidades:', error);
        }
      },
      async obtenerPrestaciones() {
        try {
 
            if (this.especialidadTemp) {
                console.log(`especialidadtemp:`, this.especialidadTemp);

                const departamentoResponse = await apiClient.get(`/api/departamentos/${this.especialidadTemp}`);
                const departamento = departamentoResponse.data;

                // Asegúrate de que las prestaciones existan y sean válidas
                this.prestaciones = Array.isArray(departamento.prestaciones)
                ? departamento.prestaciones
                : [];
                console.log(`prestaciones:`, this.prestaciones);

            } else {
              this.prestaciones = [];
            }
        
        } catch (error) {
          console.error('Error al obtener prestaciones:', error);
        }
      },
      agregarEspecialidad() {
        if (
          this.especialidadTemp &&
          !this.nuevaAseguradora.cobertura.some((c) => c.especialidad === this.especialidadTemp)
        ) {
          this.nuevaAseguradora.cobertura.push({ especialidad: this.especialidadTemp });
          this.especialidadTemp = '';
        }
      },
      eliminarEspecialidad(index) {
        this.nuevaAseguradora.cobertura.splice(index, 1);
      },
      agregarPrestacion() {
        if (
          this.prestacionTemp.id &&
          !this.nuevaAseguradora.cobertura.some((c) => c.prestacion === this.prestacionTemp.id)
        ) {
          this.nuevaAseguradora.cobertura.push({
            especialidad: this.especialidadTemp,
            prestacion: this.prestacionTemp.id,
            tarifa: this.prestacionTemp.tarifa,
          });
          this.prestacionTemp = { id: '', tarifa: '' };
          // this.especialidadTemp = '';
        }
      },
      eliminarPrestacion(index) {
        this.nuevaAseguradora.cobertura.splice(index, 1);
      },
      obtenerNombreEspecialidad(id) {
        if (id.nombre) {
          return id.nombre;
        } else {
          const especialidad = this.especialidades.find((e) => e._id === id);
          return especialidad ? especialidad.nombre : '';
        }  
      },
      obtenerNombrePrestacion(id) {
        if (id.nombre) {
          return id.nombre;
        } else {
          const prestacion = this.prestaciones.find((p) => p._id === id);
          return prestacion ? prestacion.nombre : '';
        }
      },
      async crearAseguradora() {
        try {
          await apiClient.post('/api/aseguradoras', this.nuevaAseguradora);
          this.obtenerAseguradoras();
          this.resetFormulario();
        } catch (error) {
          console.error('Error al crear aseguradora:', error);
        }
      },
      cargarAseguradora(aseguradora) {
        this.nuevaAseguradora = { ...aseguradora };
        this.editarAseguradoraId = aseguradora._id;
      },
      async actualizarAseguradora() {
        try {
          await apiClient.put(`/api/aseguradoras/${this.editarAseguradoraId}`, this.nuevaAseguradora);
          this.obtenerAseguradoras();
          this.resetFormulario();
        } catch (error) {
          console.error('Error al actualizar aseguradora:', error);
        }
      },
      async confirmarEliminacion(id) {
        const confirmacion = window.confirm('¿Está seguro de que desea eliminar esta aseguradora?');
        if (confirmacion) {
          this.eliminarAseguradora(id);
        }
      },
      async eliminarAseguradora(id) {
        try {
          await apiClient.delete(`/api/aseguradoras/${id}`);
          this.obtenerAseguradoras();
        } catch (error) {
          console.error('Error al eliminar aseguradora:', error);
        }
      },
      resetFormulario() {
        this.nuevaAseguradora = { nombre: '', cobertura: [] };
        this.editarAseguradoraId = null;
      },
    },
    mounted() {
      this.obtenerAseguradoras();
      this.obtenerEspecialidades();
      this.obtenerPrestaciones();
    },
  };
  </script>
  
  
<style scoped>
  /* Contenedor principal para organizar formulario y lista en columnas */
  .contenedor-principal {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    padding: 20px;
  }
  
  /* Columna para el formulario de creación de departamentos */
  .columna-formulario {
    flex: 1;
    max-width: 40%; /* Controla el ancho de la columna del formulario */
  }
  
  /* Columna para la lista de departamentos */
  .columna-lista {
    flex: 2;
    max-width: 60%; /* Controla el ancho de la columna de la lista */
  }
  
  form {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }
  
  label {
    margin-bottom: 10px;
    text-align: left; /* Alinea los labels a la izquierda para mejor legibilidad */
    font-weight: bold; /* Resalta los labels */
  }
  
  /* Botones estilizados */
  .boton-crear {
    background-color: var(--primary-color) !important; /* Azul corporativo */
    color: white !important;
    padding: 10px 20px;
    border-radius: 8px;
    font-weight: bold;
  }
  
  .boton-agregar {
    background-color: var(--success-color) !important; /* Verde */
    color: white !important;
    padding: 5px 10px;
    margin-left: 10px;
    border-radius: 8px;
    font-weight: bold;
  }
  
  
  .boton-eliminar-operacion {
    background-color: var(--error-color) !important; /* Verde */
    color: white !important;
    padding: 5px 10px;
    margin-left: 10px;
    border-radius: 8px;
    font-weight: bold;
  }
  
  .boton-guardar {
    background-color: var(--success-color) !important; /* Verde */
    color: white !important;
    padding: 10px 20px;
    border-radius: 8px;
    font-weight: bold;
  }
  
  .boton-cancelar {
    background-color: var(--color-gris) !important; /* Gris */
    color: black !important;
    padding: 10px 20px;
    border-radius: 8px;
  }
  
  .user-item {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    padding: 8px;
    border-radius: 8px;
    background-color: var(--background-color);
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .user-actions {
    display: flex;
    gap: 10px;
    margin-left: auto;
  }
  
  /* Estilo para la alerta de error */
  .alerta-error {
    background-color: #f44336 !important;
    color: white !important;
  }
  
  .alert-text {
    margin-left: 20px;
  }
  
  .texto-centrado {
    text-align: center;
  }
  
  .foto-preview {
  width: 120px;
  height: 120px;
  border-radius: 20%;
  margin-top: 10px;
  object-fit: cover;
  margin-bottom: 30px;
  align-self: center;
  }
  
  /* Estilo para los campos de entrada de texto, email y el selector */
  input[type="text"],
  input[type="email"],
  select {
  background-color: #C6DEFD; /* Color de fondo del campo */
  padding: 8px;
  border-radius: 5px;
  outline: none;
  font-family: 'Outfit', sans-serif; /* Asegura que la fuente sea uniforme */
  }
  
  /* Cambia el color del borde y añade un efecto cuando el campo está enfocado */
  input[type="text"]:focus,
  input[type="email"]:focus,
  select:focus {
  border-color: var(--color-azul); /* Cambia el color del borde al hacer foco */
  box-shadow: 0 0 5px var(--color-azul); /* Añade sombra al hacer foco */
  background-color: #C6DEFD; /* Mantiene el color de fondo al hacer foco */
  }
  
  /* Tabla de departamentos con diseño similar a "Prestaciones" */
  .department-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  }
  
  .department-table th,
  .department-table td {
  padding: 10px;
  text-align: left;
  border: 1px solid #ddd;
  vertical-align: top; /* Asegura que el contenido se alinee en la parte superior */
  }
  
  .department-table th {
  background-color: #f4f4f4;
  font-weight: bold;
  }
  
  .department-table td {
  background-color: white;
  }
  
  /* Contenedor de los botones de acción en la misma línea */
  .action-buttons {
  display: flex;
  gap: 10px; /* Espacio entre los botones */
  align-items: center;
  justify-content: flex-start;
  }
  
  .department-actions {
  width: auto; /* Ajusta el ancho según el contenido */
  }
  
  
  /* Botones de acción */
  .boton-modificar {
  background-color: var(--warning-color) !important;
  color: white !important;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  }
  
  .boton-eliminar {
  background-color: var(--error-color) !important;
  color: white !important;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  }
  
  
  
  
  </style>
  