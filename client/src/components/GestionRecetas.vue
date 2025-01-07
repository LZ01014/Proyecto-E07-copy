<template>
  <div class="contenedor-principal">
    <!-- Columna izquierda: Formulario de creación de recetas -->
    <div class="columna-formulario">
      <h2>Gestión de Recetas</h2>

      <!-- Formulario para crear o editar una receta -->
      <form @submit.prevent="editarRecetaId ? actualizarReceta() : crearReceta()">
        <img v-if="fotoPreview" :src="fotoPreview" alt="Previsualización de Foto de Perfil" class="foto-preview"/>

        <label> Médico:
          <select v-model="nuevaReceta.medicoId" required>
            <option disabled value="">Seleccione un médico</option>
            <option v-for="medico in medicos" :key="medico._id" :value="medico._id"> {{ medico.nombre }} {{ medico.apellidos }}</option>
          </select>
        </label>

        <label> Paciente:
          <select v-model="nuevaReceta.pacienteId" required>
            <option disabled value="">Seleccione un paciente</option>
            <option v-for="paciente in pacientes" :key="paciente._id" :value="paciente._id"> {{ paciente.nombre }} {{ paciente.apellidos }}</option>
          </select>
        </label>
        <!-- Selección de Fecha -->
        <label>Fecha:
          <input type="date" v-model="nuevaReceta.fecha" required />
        </label>
        <!-- Selección de Hora -->
        <label>Hora:
          <input type="time" v-model="nuevaReceta.hora" required />
        </label>
        <!-- Campo de Indicaciones -->
        <label>Medicamentos:
          <textarea v-model="nuevaReceta.medicamentos" class="textarea-azul"></textarea>
        </label>
        <!-- Campo de Observaciones -->
        <label>Observaciones:
          <textarea v-model="nuevaReceta.observaciones" class="textarea-azul"></textarea>
        </label>
        <!-- Botones de acción para crear o actualizar la receta -->
        <v-btn class="ma-2 boton-crear" type="submit" v-if="!editarRecetaId">
          Crear Receta
        </v-btn>
        <v-btn class="ma-2 boton-guardar" type="button" v-if="editarRecetaId" @click="actualizarReceta">
          Guardar Cambios
        </v-btn>
        <v-btn class="ma-2 boton-cancelar" type="button" v-if="editarRecetaId" @click="cancelarEdicion">
          Cancelar
        </v-btn>
      </form>
    </div>

    <!-- Columna derecha: Lista de recetas -->
    <div class="columna-lista">
      <h3>Listado de Recetas</h3>

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

      <div v-if="!cargando && !errorServidor && recetas.length === 0" class="texto-centrado">
        <p>La lista está vacía</p>
      </div>

      <!-- Tabla de recetas -->
      <table class="department-table" v-if="recetas.length !== 0">
        <thead>
          <tr>
            <th></th>
            <th>Médico</th>
            <th>Paciente</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Medicamentos</th>
            <th>Observaciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="receta in recetas" :key="receta._id">
            <td class="department-actions">
              <div class="action-buttons">
                <v-btn class="boton-modificar" @click="cargarReceta(receta)">
                  <i class="bi bi-pencil-square"></i>
                </v-btn>
                <v-btn class="boton-eliminar" @click="confirmarEliminacion(receta._id, receta.numero)">
                  <i class="bi bi-trash"></i>
                </v-btn>
              </div>
            </td>
            <td>{{ receta.medicoId?.nombre }} {{ receta.medicoId?.apellidos }}</td>
            <td>{{ receta.pacienteId?.nombre }} {{ receta.pacienteId?.apellidos }}</td>
            <td>{{ receta.fecha }}</td>
            <td>{{ receta.hora }}</td>
            <td>{{ receta.medicamentos }}</td>
            <td>{{ receta.observaciones }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import apiClient from '@/apiClient';

export default {
  name: 'GestionRecetas',
  data() {
    return {
      recetas: [],
      nuevaReceta: {
        medicoId: '',
        pacienteId: '',
        fecha: '',
        hora: '',
        medicamentos: '',
        observaciones: ''
      },
      medicos: [], // Lista de médicos
      pacientes: [], // Lista de pacientes
      fotoPreview: require('@/assets/estados/especialidad_defecto.png'),
      editarRecetaId: null,
      cargando: false,
      errorServidor: false
    };
  },
  methods: {
    async obtenerRecetas() {
      this.cargando = true;
      try {
        const response = await apiClient.get('/api/recetas');
        this.recetas = response.data;
      } catch (error) {
        this.errorServidor = true;
      } finally {
        this.cargando = false;
      }
    },
    async obtenerMedicos() {
      try {
        const response = await apiClient.get('/api/usuarios/medicos');
        this.medicos = response.data;
      } catch (error) {
        console.error('Error al obtener médicos:', error);
        this.errorServidor = true;
      }
    },
    async obtenerPacientes() {
      try {
        const response = await apiClient.get('/api/usuarios/pacientes');
        this.pacientes = response.data;
      } catch (error) {
        console.error('Error al obtener pacientes:', error);
        this.errorServidor = true;
      }
    },
    async crearReceta() {
      try {
        await apiClient.post('/api/recetas', this.nuevaReceta);
        this.obtenerRecetas();
        this.resetFormulario();
      } catch (error) {
        console.error('Error al crear receta:', error);
      }
    },
    cargarReceta(receta) {
      this.nuevaReceta = { ...receta };
      this.editarRecetaId = receta._id;
    },
    async actualizarReceta() {
      try {
        await apiClient.put(`/api/recetas/${this.editarRecetaId}`, this.nuevaReceta);
        this.obtenerRecetas();
        this.resetFormulario();
      } catch (error) {
        console.error('Error al actualizar receta:', error);
      }
    },
    cancelarEdicion() {
      this.resetFormulario();
    },
    confirmarEliminacion(id, numero) {
      const confirmacion = window.confirm(`¿Está seguro de que desea eliminar la receta ${numero}?`);
      if (confirmacion) {
        this.eliminarReceta(id);
      }
    },
    async eliminarReceta(id) {
      try {
        await apiClient.delete(`/api/recetas/${id}`);
        this.obtenerRecetas();
      } catch (error) {
        console.error('Error al eliminar receta:', error);
      }
    },
    resetFormulario() {
      this.nuevaReceta = { medicoId: '', pacienteId: '', fecha: '', hora: '', medicamentos: '', observaciones: '' };
      this.editarRecetaId = null;
    }
  },
  mounted() {
    this.obtenerMedicos();
    this.obtenerPacientes();
    this.obtenerRecetas();
  }
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
  
  /* Columna para el formulario de creación de medicos */
  .columna-formulario {
    flex: 1;
    max-width: 40%; /* Controla el ancho de la columna del formulario */
  }
  
  /* Columna para la lista de medicos */
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
  
  .boton-modificar {
    background-color: var(--warning-color) !important; /* Naranja */
    color: white !important;
    width: 40px; /* Hace el botón cuadrado */
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .boton-eliminar {
    background-color: var(--error-color) !important; /* Rojo */
    color: white !important;
    width: 40px; /* Hace el botón cuadrado */
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
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
  width: 100%;             /* Ocupa el ancho completo del contenedor */
  height: 40px;           /* Ajusta la altura según tus necesidades */
  background-color: #C6DEFD; /* Color de fondo azul */
  padding: 10px;           /* Espacio interior */
  border-radius: 5px;      /* Bordes redondeados */
  font-family: 'Outfit', sans-serif; /* Asegura uniformidad de la fuente */
  resize: vertical;        /* Permite cambiar la altura, pero no el ancho */
  outline: none;           /* Remueve el borde de enfoque */
}

/* Cambia el color del borde y añade un efecto cuando el campo está enfocado */
input[type="text"]:focus,
input[type="email"]:focus,
select:focus {
  border-color: var(--color-azul); /* Cambia el color del borde al hacer foco */
  box-shadow: 0 0 5px var(--color-azul); /* Añade sombra al hacer foco */
  background-color: #C6DEFD; /* Mantiene el color de fondo al hacer foco */
}

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
  vertical-align: top; /* Asegura que todo el contenido se alinee en la parte superior */
}

.department-table th {
  background-color: #f4f4f4;
  font-weight: bold;
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


.textarea-azul {
  width: 100%;             /* Ocupa el ancho completo del contenedor */
  height: 100px;           /* Ajusta la altura según tus necesidades */
  background-color: #C6DEFD; /* Color de fondo azul */
  padding: 10px;           /* Espacio interior */
  border-radius: 5px;      /* Bordes redondeados */
  font-family: 'Outfit', sans-serif; /* Asegura uniformidad de la fuente */
  resize: vertical;        /* Permite cambiar la altura, pero no el ancho */
  outline: none;           /* Remueve el borde de enfoque */
}

/* Cambia el color del borde y añade un efecto cuando el campo está enfocado */
.textarea-azul:focus {
  border-color: var(--color-azul); /* Cambia el color del borde al hacer foco */
  box-shadow: 0 0 5px var(--color-azul); /* Añade sombra al hacer foco */
  background-color: #C6DEFD; /* Mantiene el color de fondo al hacer foco */
}




</style>