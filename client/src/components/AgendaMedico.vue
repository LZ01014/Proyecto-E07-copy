<template>
  <div class="contenedor-principal">
    <!-- Columna izquierda: Formulario de creación de citas médicas -->
    <div class="columna-formulario">
      <h2>Crear Cita Médica</h2>

      <!-- Formulario para crear una cita médica -->
      <form @submit.prevent="crearCita">
        <!-- Selección de Médico -->
        <label>Médico:
          <select v-model="nuevaCita.medicoId" @change="actualizarEspecialidadYPrestaciones" required>
            <option disabled value="">Seleccione un médico</option>
            <option v-for="medico in medicos" :key="medico._id" :value="medico._id">
              {{ medico.nombre }} {{ medico.apellidos }}
            </option>
          </select>
        </label>

        <!-- Especialidad (rellenado automáticamente) -->
        <label>Especialidad:
          <input type="text" :value="departamento?.nombre || ''" readonly />
        </label>

        <!-- Selección de Prestación -->
        <label>Prestación:
          <select v-model="nuevaCita.prestacionId" required>
            <option disabled value="">Seleccione una prestación</option>
            <option v-for="prestacion in prestaciones" :key="prestacion._id || prestacion" :value="prestacion._id || prestacion">
              {{ prestacion?.nombre || prestacion }}
            </option>
          </select>
        </label>


        <!-- Selección de Fecha -->
        <label>Fecha:
          <input type="date" v-model="nuevaCita.fecha" required />
        </label>

        
        <!-- Mostrar solo si la prestación seleccionada es "Consulta" -->
        <div v-if="esConsulta">

          <!-- Selección de Hora de Inicio -->
          <label>Hora de Inicio:
            <input type="time" v-model="horaInicio" required />
          </label>

          <!-- Selección de Hora Final -->
          <label>Hora Final:
            <input type="time" v-model="horaFinal" />
          </label>

          <!-- Selección de Duración -->
          <label>Duración (minutos):
            <input type="number" v-model="nuevaCita.duracion" min="1" />
          </label>

          <!-- Número de citas calculadas -->
          <label>Número de Citas Médicas: <strong>{{ citasCalculadas.total }}</strong></label>
          <div>
            <!-- Lista numerada con los horarios -->
            <ul>
              <li v-for="(horario, index) in calculoCitas().horarios" :key="index">
                {{ horario }}
              </li>
            </ul>
          </div>


        </div>

        

        <!-- Selección de Paciente -->
        <div v-if="!esConsulta">
          <!-- Selección de Hora de Inicio -->
          <label>Hora:
            <input type="time" v-model="nuevaCita.hora" required />
          </label> 

          <!-- Selección de Duración -->
          <label>Duración (minutos):
            <input type="number" v-model="nuevaCita.duracion" min="1" />
          </label>

          <!-- Selección de Paciente -->
          <label>Paciente:
            <select v-model="nuevaCita.pacienteId" required>
              <option disabled value="">Seleccione un paciente</option>
              <option v-for="paciente in pacientes" :key="paciente._id" :value="paciente._id">
                {{ paciente?.nombre }} {{ paciente?.apellidos }}
              </option>
            </select>
          </label>

        </div>

        <v-btn class="ma-2 boton-crear" type="button" :disabled="cargando" @click="procesarCitas">
          Crear Cita
        </v-btn>


        
      </form>
    </div>

    <!-- Columna derecha: Listado de citas -->
    <div class="columna-lista">
      <h3>Listado de Citas Médicas</h3>

      <!-- Filtro para la especialidad -->
<div class="filtro-especialidad">
  <label for="filtroEspecialidad">Filtrar por especialidad:</label>
  <select v-model="filtroEspecialidad">
    <option value="">Todas las especialidades</option>
    <option v-for="especialidad in especialidades" :key="especialidad._id" :value="especialidad._id">
      {{ especialidad.nombre }}
    </option>
  </select>
</div>

<!-- Filtro para el médico -->
<div class="filtro-medico">
  <label for="filtroMedico">Filtrar por médico:</label>
  <select v-model="filtroMedico">
    <option value="">Todos los médicos</option>
    <option v-for="medico in medicos" :key="medico._id" :value="medico._id">
      {{ medico.nombre }} {{ medico.apellidos }}
    </option>
  </select>
</div>



      <!-- Mensaje de error de comunicación -->
      <v-alert v-if="errorServidor" type="error" class="alerta-error" prominent color="red lighten-3">
        <span class="alert-text">Fallo de comunicación con el servidor</span>
      </v-alert>

      <div v-if="cargando && !errorServidor" class="text-center">
        <v-progress-circular :size="70" :width="7" color="#17195e" indeterminate></v-progress-circular>
      </div>

      <div v-if="!cargando && !errorServidor && citas.length === 0" class="texto-centrado">
        <p>La lista está vacía</p>
      </div>

      <!-- Tabla de citas -->
      <table v-if="!cargando && !errorServidor && citasFiltradas.length > 0" class="citas-table">

        <thead>
          <tr>
            <th></th>
            <th>Médico</th>
            <th>Especialidad</th>
            <th>Prestación</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Duración</th>
            <th>Paciente</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cita in citasFiltradas" :key="cita._id">
            <td class="user-actions">
            <v-btn class="boton-eliminar" @click="confirmarEliminacion(cita._id)">
              <i class="bi bi-trash"></i>
            </v-btn>
          </td>
            <td>{{ cita.medicoId?.nombre }} {{ cita.medicoId?.apellidos }}</td>
            <td>{{ cita.especialidadId?.nombre }}</td>
            <td>{{ cita.prestacionId?.nombre }}</td>
            <td>{{ cita.fecha | formatDate }}</td>
            <td>{{ cita.hora }}</td>
            <td>{{ cita.duracion }}</td>
            <td>{{ cita.pacienteId ? cita.pacienteId.nombre + ' ' + cita.pacienteId.apellidos : '-' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import apiClient from '@/apiClient';

export default {
  data() {
    return {
      medicos: [], // Lista de médicos
      especialidades: [], // especialidades disponibles
      pacientes: [], // Lista de pacientes
      citas: [], // Lista de citas
      departamento: {}, // Datos del departamento del médico seleccionado
      prestaciones: [], // Prestaciones del departamento
      medico: {}, // Datos del médico seleccionado
      paciente: {}, // Datos del paciente seleccionado
      horaFinal: '',
      horaInicio: '',
      nuevaCita: {
        medicoId: '',
        especialidadId: '',
        prestacionId: '',
        fecha: '',
        hora: '',
        duracion: ''
      },
      cargando: false,
      errorServidor: false
    };
  },
  methods: {
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
    filtrarCitas() {
      // Este método ya está cubierto por el filtro en `citasFiltradas`
    },
    async obtenerCitas() {
      this.cargando = true;
      try {
        const response = await apiClient.get('/api/citas');
        this.citas = response.data;
      } catch (error) {
        console.error('Error al obtener citas:', error);
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
        console.error('Error al obtener departamentos:', error);
      }
    },
    async actualizarEspecialidadYPrestaciones() {
      if (!this.nuevaCita.medicoId) {
        this.departamento = {};
        this.prestaciones = [];
        return;
      }

      this.cargando = true;
      try {
        const medicoResponse = await apiClient.get(`/api/usuarios/${this.nuevaCita.medicoId}`);
        this.medico = medicoResponse.data; // Guardar datos del médico

        if (this.medico.departamento) {
          const departamentoResponse = await apiClient.get(`/api/departamentos/${this.medico.departamento}`);
          this.departamento = departamentoResponse.data;

          // Asegúrate de que las prestaciones existan y sean válidas
          this.prestaciones = Array.isArray(this.departamento.prestaciones)
            ? this.departamento.prestaciones
            : [];
          this.nuevaCita.especialidadId = this.departamento._id;
        } else {
          this.departamento = {};
          this.prestaciones = [];
        }
        console.log('Departamento:', this.departamento);
        console.log('Prestaciones:', this.prestaciones);


      } catch (error) {
        console.error('Error al obtener especialidad y prestaciones:', error);
      } finally {
        this.cargando = false;
      }
    },
    async actualizarPacienteSeleccionado() {
      if (!this.nuevaCita.pacienteId) {
        this.paciente = {};
        return;
      }
      try {
        const pacienteResponse = await apiClient.get(`/api/usuarios/${this.nuevaCita.pacienteId}`);
        this.paciente = pacienteResponse.data;
      } catch (error) {
        console.error('Error al obtener paciente:', error);
      }
    },
    async procesarCitas() {
      try {

        this.cargando = true;

        if (this.esConsulta) {
          // Obtener los horarios de inicio calculados previamente
          const { horarios } = this.calculoCitas();

          // Verificar que tengamos horarios disponibles
          if (horarios.length === 0) {
            alert('No hay citas disponibles en el rango de tiempo.');
            return;
          }
        
        // Garantizamos que la duración sea un número entero
        this.nuevaCita.duracion = parseInt(this.nuevaCita.duracion, 10);

        // Crear múltiples citas con los horarios calculados
        const citas = horarios.map((horaInicio) => {
          console.log(`Creando cita para ${horaInicio}, datos:`, this.nuevaCita);
          return {
            ...this.nuevaCita,  // Desestructuramos nuevaCita
            hora: horaInicio    // Asignamos hora al campo "hora"
          };
        });


        const resultados = await Promise.allSettled(citas.map((cita) => this.crearCita(cita)));
        resultados.forEach((resultado, index) => {
          if (resultado.status === "rejected") {
            console.error(`Error al crear cita ${index}:`, resultado.reason);
          }
        });
        
        //await Promise.all(citas.map((cita) => this.crearCita(cita)));
        } else {
          // Crear una sola cita
          await this.crearCita(this.nuevaCita);
        }
      } catch (error) {
        console.error('Error al procesar citas:', error);
        alert('Ocurrió un error al crear las citas');
      } finally {
        this.cargando = false;
      }
    },
    validarDatosCita(cita) {
    if (!cita.medicoId) throw new Error("El ID del médico es obligatorio.");
    if (!cita.especialidadId) throw new Error("La especialidad es obligatoria.");
    if (!cita.prestacionId) throw new Error("La prestación es obligatoria.");
    if (!cita.fecha || isNaN(Date.parse(cita.fecha))) throw new Error("La fecha es inválida.");
    if (!cita.hora) throw new Error("La hora es obligatoria.");
    if (!cita.duracion || cita.duracion <= 0) throw new Error("La duración debe ser mayor que 0.");
    
    },
    async crearCita(cita) {
      try {
        this.validarDatosCita(cita); // Verificar los datos antes de enviarlos
        console.log('Datos enviados:', cita);
        // Realizar la petición para crear la cita
        await apiClient.post('/api/citas', cita);
      } catch (error) {
        console.error('Error al crear cita:', error);
        throw error; // Relanzar el error para manejarlo en procesarCitas
      }
    },
    calculoCitas() {
    if (!this.horaInicio || !this.horaFinal || !this.nuevaCita.duracion) {
      return { total: 0, horarios: [] }; // Si falta algún campo, devolver 0 y un arreglo vacío
    }

    // Convertir las horas de inicio y fin a minutos totales desde la medianoche
    const [inicioHoras, inicioMinutos] = this.horaInicio.split(':').map(Number);
    const [finalHoras, finalMinutos] = this.horaFinal.split(':').map(Number);

    const inicioTotalMinutos = inicioHoras * 60 + inicioMinutos;
    const finalTotalMinutos = finalHoras * 60 + finalMinutos;

    // Calcular la duración total disponible
    const duracionDisponible = finalTotalMinutos - inicioTotalMinutos;

    if (duracionDisponible <= 0 || this.nuevaCita.duracion <= 0) {
      return { total: 0, horarios: [] }; // Si el rango no es válido o la duración es 0, devolver 0
    }

    // Calcular cuántas citas caben en el rango disponible
    const totalCitas = Math.floor(duracionDisponible / this.nuevaCita.duracion);

    // Calcular los horarios de inicio de cada cita
    const horarios = [];
    let inicioActual = inicioTotalMinutos;


    for (let i = 0; i < totalCitas; i++) {
      // Calcular horas y minutos del horario actual
      const horas = Math.floor(inicioActual / 60); // Obtener horas
      const minutos = inicioActual % 60; // Obtener minutos
      const horarioFormateado = `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`; // Formatear correctamente
      horarios.push(horarioFormateado);

      // Incrementar el tiempo por la duración de cada cita
      inicioActual += +this.nuevaCita.duracion;
    }

    return { total: totalCitas, horarios };
    },
    resetFormulario() {
      this.nuevaCita = {
        medicoId: '',
        especialidadId: '',
        prestacionId: '',
        fecha: '',
        hora: '',
        duracion: '',
        pacienteId: ''
      };
      this.medico = {};
      this.departamento = {};
      this.prestaciones = [];
      this.paciente = {};
      this.horaInicio = '';
      this.horaFinal = '';
    },
    confirmarEliminacion(id) {
      const confirmacion = window.confirm(`¿Está seguro de que desea eliminar la cita?`);
      if (confirmacion) {
        this.eliminarCita(id);
      }
    },
    async eliminarCita(id) {
      try {
        await apiClient.delete(`/api/citas/${id}`);
        this.obtenerCitas();
      } catch (error) {
        console.error('Error al eliminar cita:', error);
      }
    },
    async obtenerDatos() {
      // Obtener todas las citas, especialidades y médicos al montar el componente
      await Promise.all([this.obtenerCitas(), this.obtenerEspecialidades(), this.obtenerMedicos()]);
    },
    validarFechaHora() {
      const hoy = new Date();
      const fechaSeleccionada = new Date(this.nuevaCita.fecha);
      const horaSeleccionada = this.nuevaCita.hora.split(':');
      fechaSeleccionada.setHours(horaSeleccionada[0], horaSeleccionada[1]);

      if (fechaSeleccionada < hoy) {
        alert('La fecha y hora seleccionadas ya han pasado.');
        return false;
      }
      return true;
    },
    async validarCitaDuplicada() {
      const citasExistentes = await apiClient.get(`/api/citas?medicoId=${this.nuevaCita.medicoId}&fecha=${this.nuevaCita.fecha}&hora=${this.nuevaCita.hora}`);
      if (citasExistentes.data.length > 0) {
        alert('Ya existe una cita para este médico en esa fecha y hora.');
        return true;
      }
      return false;
    }

  },
  validarFormulario() {
    if (!this.nuevaCita.medicoId) {
      alert('Debe seleccionar un médico.');
      return false;
    }
    if (!this.nuevaCita.fecha) {
      alert('Debe seleccionar una fecha.');
      return false;
    }
    if (!this.nuevaCita.hora) {
      alert('Debe seleccionar una hora.');
      return false;
    }
    return true;
  },
  mounted() {
    this.obtenerDatos();
    this.intervalId = setInterval(() => {
      this.obtenerCitas();
    }, 60000); // Actualiza cada 1 minuto
    this.obtenerMedicos();
    this.obtenerPacientes();
    this.obtenerCitas();
  },
  beforeDestroy() {
    clearInterval(this.intervalId);
  },
  computed: {
    citasFiltradas() {
      let citasFiltradas = this.citas;

      if (this.filtroEspecialidad) {
        citasFiltradas = citasFiltradas.filter(cita => cita.especialidad._id === this.filtroEspecialidad);
      }

      if (this.filtroMedico) {
        citasFiltradas = citasFiltradas.filter(cita => cita.medico._id === this.filtroMedico);
      }

      return citasFiltradas;
    },
    citasCalculadas() {
    return this.calculoCitas();
    },
    esConsulta() {
    // Encuentra la prestación seleccionada
    const prestacion = this.prestaciones.find(
      (p) => p._id === this.nuevaCita.prestacionId
    );
    // Devuelve verdadero si el nombre de la prestación es "Consulta"
    return prestacion && prestacion.nombre === "Consulta";
    },
  
  },

};
</script>


<style scoped>
/* Estilos similares a los de "Gestión Departamentos" */
.contenedor-principal {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 20px;
}

.columna-formulario {
  flex: 1;
  max-width: 40%;
}

.columna-lista {
  flex: 2;
  max-width: 60%;
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.citas-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.citas-table th, .citas-table td {
  padding: 10px;
  text-align: left;
  border: 1px solid #ddd;
}

.citas-table th {
  background-color: #f4f4f4;
  font-weight: bold;
}

.boton-crear {
  background-color: var(--primary-color);
  color: white;
  padding: 10px;
  border-radius: 5px;
  font-weight: bold;
}

.alerta-error {
  background-color: #f44336;
  color: white;
  padding: 10px;
  border-radius: 5px;
}
</style>
