<template>
  <div class="contenedor-principal">
    <!-- Columna izquierda -->
    <div class="columna-formulario">
      <h2>Reservar Cita Médica</h2>

      <!-- Selector de Paciente -->
      <label>Paciente:
        <select v-model="selectedPaciente">
          <option value="">Seleccione un paciente</option>
          <option v-for="paciente in pacientes" :key="paciente._id" :value="paciente._id">
            {{ paciente.nombre }} {{ paciente.apellidos }}
          </option>
        </select>
      </label>

      <!-- Selector de Especialidad -->
      <label>Especialidad:
        <select v-model="selectedEspecialidad" @change="cargarMedicos">
          <option value="">Seleccione una especialidad</option>
          <option v-for="especialidad in especialidades" :key="especialidad._id" :value="especialidad._id">
            {{ especialidad.nombre }}
          </option>
        </select>
      </label>

      <!-- Selector de Médico -->
      <label>Médico:
        <select v-model="selectedMedico" @change="cargarCitasDisponibles">
          <option value="">Cualquiera</option>
          <option v-for="medico in medicos" :key="medico._id" :value="medico._id">
            {{ medico.nombre }} {{ medico.apellidos }}
          </option>
        </select>
      </label>
  
      <!-- Mostrar las citas disponibles -->
      <div v-if="citasDisponibles.length > 0">
        <div v-for="(cita, index) in citasDisponibles" :key="index">
          <p v-if="cita.medicoId">Fecha: {{ cita.fecha | formatDate }}. Hora: {{ cita.hora }}. Especialista: {{ cita.medicoId.nombre }} {{ cita.medicoId.apellidos }}</p>
          <p v-else>Fecha: {{ cita.fecha | formatDate }}. Hora: {{ cita.hora }}. Especialista: No asignado</p>
          <div>
            <!-- Mostrar el botón de "Reservar cita" solo si hay un paciente y una especialidad seleccionados -->
            <button v-if="selectedPaciente && selectedEspecialidad"
              @click="reservarCita(cita._id, selectedPaciente)">
              Reservar cita
            </button>
          </div>
        </div>
      </div>

      <div v-else>
        <p>No hay citas disponibles.</p>
      </div>
    </div>

    <!-- Columna derecha - Listado de citas médicas con paciente asignado -->
    <div class="columna-citas">
      <h2>Citas Médicas Consultas</h2>
      <div v-if="citasConsulta.length > 0">
        <div v-for="(cita, index) in citasConsulta" :key="index" class="cita-item">
          <p v-if="cita.medicoId">Médico: {{ cita.medicoId.nombre }} {{ cita.medicoId.apellidos }}</p>
          <p v-else>Médico: No asignado</p>
          <p>Especialidad: {{ cita.especialidadId ? cita.especialidadId.nombre : 'No asignada' }}</p>
          <p>Prestación: {{ cita.prestacionId ? cita.prestacionId.nombre : 'No asignada' }}</p>
          <p>Fecha: {{ cita.fecha | formatDate }} - Hora: {{ cita.hora }}</p>
          <p>Duración: {{ cita.duracion }} minutos</p>
          <p v-if="cita.pacienteId">Paciente: {{ cita.pacienteId.nombre }} {{ cita.pacienteId.apellidos }}</p>
          <p v-else>Paciente: No asignado</p>
          <!-- Botón para cancelar cita -->
          <button @click="cancelarCita(cita._id)">Cancelar Cita</button>
        </div>
      </div>
      <div v-else>
        <p>No hay citas de tipo consulta para pacientes asignados.</p>
      </div>
    </div>
  </div>
</template>
  
  

<script>
import apiClient from '@/apiClient';

export default {
  name: "ReservarCitas",
  data() {
    return {
      pacientes: [], // Lista de pacientes
      especialidades: [], // Lista de especialidades
      medicos: [], // Lista de médicos filtrados por especialidad
      citasDisponibles: [], // Citas filtradas por paciente, especialidad y médico
      selectedPaciente: '', // Paciente seleccionado
      selectedEspecialidad: '', // Especialidad seleccionada
      selectedMedico: '', // Médico seleccionado
      citasConsulta: [], // Citas de tipo consulta donde pacienteId no es null
    };
  },
  methods: {
    async obtenerCitasConsulta() {
        try {
            const response = await apiClient.get('/api/citas');
            this.citasConsulta = response.data.filter(cita => cita.pacienteId !== null);

            //this.citasConsulta = response.data;
            console.log('Citas obtenidas:', response.data);
        } catch (error) {
            console.error('Error al obtener citas de consulta:', error);
        }
    },
    async obtenerPacientes() {
      try {
        const response = await apiClient.get('/api/usuarios/pacientes');
        this.pacientes = response.data;
      } catch (error) {
        console.error('Error al obtener pacientes:', error);
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
    async cargarMedicos() {
      if (!this.selectedEspecialidad) {
        this.medicos = [];
        return;
      }
      console.log('Especialidad seleccionada:', this.selectedEspecialidad); // Agregar log para verificar
      try {
        const response = await apiClient.get(`/api/usuarios/medicos?departamentoId=${this.selectedEspecialidad}`);
        this.medicos = response.data;
        console.log('Médicos cargados:', response.data); // Para verificar los médicos

      } catch (error) {
        console.error('Error al obtener médicos:', error);
      }
    },
    async cargarCitasDisponibles() {
      if (!this.selectedEspecialidad) {
        this.citasDisponibles = [];
        return;
      }

      const medicoFilter = this.selectedMedico ? `&medicoId=${this.selectedMedico}` : '';
      const pacienteFilter = `&pacienteId=null`;
      console.log('Obteniendo citas con filtros:', this.selectedEspecialidad, this.selectedMedico);

      try {
        const response = await apiClient.get(`/api/citas?especialidadId=${this.selectedEspecialidad}${medicoFilter}${pacienteFilter}`);
        this.citasDisponibles = response.data;
        console.log('Citas disponibles cargadas:', response.data);
      } catch (error) {
        console.error('Error al obtener citas:', error);
      }
    },
    async reservarCita(citaId, pacienteId) {
      try {
        // Validar si tenemos todos los datos necesarios
        if (!citaId || !pacienteId) {
          console.error('No se pudo reservar la cita. Faltan datos.');
          return;
        }

        // Realizar la petición PUT para reservar la cita
        const response = await apiClient.put(`/api/citas/${citaId}`, {
          pacienteId: pacienteId // Se asigna el paciente seleccionado
        });

        // Manejar la respuesta de éxito
        if (response.status === 200) {
          alert('Cita reservada con éxito');
          // Actualizar el estado de la lista de citas disponibles y las citas de consulta
          this.cargarCitasDisponibles();
          this.obtenerCitasConsulta();
        } else {
          console.error('Error al reservar la cita', response);
          alert('Hubo un error al reservar la cita');
        }
      } catch (error) {
        console.error('Error en la petición PUT', error);
        alert('Hubo un error al reservar la cita');
      }
    },
    async cancelarCita(citaId) {
      try {
        if (!citaId) {
          console.error('No se pudo cancelar la cita. Faltan datos.');
          return;
        }

        const response = await apiClient.put(`/api/citas/${citaId}`, {
          pacienteId: null // Cancelamos la cita al establecer pacienteId a null
        });

        if (response.status === 200) {
          alert('Cita cancelada con éxito');
          // Actualizamos la lista de citas disponibles y las citas de consulta
          this.cargarCitasDisponibles();
          this.obtenerCitasConsulta();
        } else {
          console.error('Error al cancelar la cita', response);
          alert('Hubo un error al cancelar la cita');
        }
      } catch (error) {
        console.error('Error en la petición PUT', error);
        alert('Hubo un error al cancelar la cita');
      }
    },
  },
  watch: {
    selectedEspecialidad() {
      this.cargarCitasDisponibles(); // Recargar citas disponibles cuando cambie la especialidad
    },
    selectedMedico() {
      this.cargarCitasDisponibles(); // Recargar citas disponibles cuando cambie el médico
    },
    selectedPaciente() {
      this.cargarCitasDisponibles(); // Recargar citas disponibles cuando cambie el paciente
    },
  },
  mounted() {
    console.log(this.obtenerCitasConsulta); // Verificar si el método está disponible
    this.obtenerPacientes();
    this.obtenerEspecialidades();
    this.obtenerCitasConsulta(); // Verificar si esto funciona sin errores
  },
};
</script>


<style scoped>
.contenedor-principal {
  display: flex;
  justify-content: space-between;
}

.columna-formulario {
  width: 50%;
}

button {
  margin-right: 10px;
  margin-bottom: 10px;
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>