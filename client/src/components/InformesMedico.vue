<template>
  <div class="estilo-pagina">
    <Header/>
    <br>
    <div class="barra-fecha" >
      <span>{{ fechaHora }}</span>
    
      <div class="icon-container">
        {{ departamento.nombre }}
        <div class="circle" style="background-color: var(--color-azul2); width: 2rem; height: 2rem;">
        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="var(--primary-color)">
          <path d="M540-80q-108 0-184-76t-76-184v-23q-86-14-143-80.5T80-600v-240h120v-40h80v160h-80v-40h-40v160q0 66 47 113t113 47q66 0 113-47t47-113v-160h-40v40h-80v-160h80v40h120v240q0 90-57 156.5T360-363v23q0 75 52.5 127.5T540-160q75 0 127.5-52.5T720-340v-67q-35-12-57.5-43T640-520q0-50 35-85t85-35q50 0 85 35t35 85q0 39-22.5 70T800-407v67q0 108-76 184T540-80Zm220-400q17 0 28.5-11.5T800-520q0-17-11.5-28.5T760-560q-17 0-28.5 11.5T720-520q0 17 11.5 28.5T760-480Zm0-40Z"/>
        </svg></div>
        
      </div>
    </div>

    <br>  

  <div class="contenedor-principal">
    
    <!-- Columna izquierda: Formulario de creación de citas médicas -->
    <div class="columna-formulario">
      <div class="alinear-elementos">
          <div class="circle">
            <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="var(--primary-color)">
              <path d="M680-80v-120H560v-80h120v-120h80v120h120v80H760v120h-80Zm-480-80q-33 0-56.5-23.5T120-240v-480q0-33 23.5-56.5T200-800h40v-80h80v80h240v-80h80v80h40q33 0 56.5 23.5T760-720v244q-20-3-40-3t-40 3v-84H200v320h280q0 20 3 40t11 40H200Zm0-480h480v-80H200v80Zm0 0v-80 80Z"/>
            </svg>
          </div>
          <h2 style="color: var(--primary-color);">Generar nuevo informe</h2>
        </div>
        <br>

      <!-- Formulario para crear un informe -->
      <div v-if="mostrarGenerarInforme">
        <form @submit.prevent="crearInforme">
          <!-- Selección de Prestación -->
          <label>Prestación:
            <p class="small-box">{{ nuevoInforme.prestacionId.nombre }}</p>
          </label>
          <br>
          <br>

          <!-- Selección de Fecha -->
          <label>Fecha:
            <br>
            <p class="small-box">{{ formatearFecha(nuevoInforme.fecha)}}</p>
          </label>
          <br><br>

          <!-- Selección de Paciente -->
          <label>Paciente:
            <p class="small-box">{{ nuevoInforme.pacienteId.nombre }} {{ nuevoInforme.pacienteId.apellidos }}</p>
          </label>
          <br><br>

          <!-- Diagnóstico -->
          <label>Diagnóstico:
            <br>
            <textarea v-model="nuevoInforme.diagnostico" required class="text-box"></textarea>
          </label>
          <br><br>

          <!-- Observaciones -->
          <label>Observaciones:
            <br>
            <textarea v-model="nuevoInforme.observaciones" class="text-box"></textarea>
          </label>
          <br><br>

          <button type="submit" class="btn">Crear informe</button>
          <button class="btn" @click="resetFormulario">Cancelar</button>
        </form>

      </div>
      
      <div v-if="mostrarEditarInforme">
        <form @submit.prevent="guardarInforme">
          <!-- Selección de Prestación -->
          <label>Prestación:
            <p class="small-box">{{ mostrarPrestacion(nuevoInforme.prestacionId) }}</p>
          </label>
          <br>
          <br>

          <!-- Selección de Fecha -->
          <label>Fecha:
            <br>
            <p class="small-box">{{ formatearFecha(nuevoInforme.fecha)}}</p>
          </label>
          <br><br>

          <!-- Selección de Paciente -->
          <label>Paciente:
            <p class="small-box">{{ mostrarPaciente(nuevoInforme.pacienteId) }}</p>
          </label>
          <br><br>

          <!-- Diagnóstico -->
          <label>Diagnóstico:
            <br>
            <textarea v-model="nuevoInforme.diagnostico" required class="text-box"></textarea>
          </label>
          <br><br>

          <!-- Observaciones -->
          <label>Observaciones:
            <br>
            <textarea v-model="nuevoInforme.observaciones" class="text-box"></textarea>
          </label>
          <br><br>

          <button type="submit" class="btn">Guardar</button>
          <button class="btn" @click="resetFormulario">Cancelar</button>
        </form>

      </div>

    </div>

    <!-- Columna derecha: Listado de citas -->
    <div class="columna-citas">
      <div class="alinear-elementos">
       
       <div class="circle">
         <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="var(--primary-color)">
           <path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm280 240q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z"/>
         </svg>
       </div>
       <h2 style="color: var(--primary-color);">Citas pasadas</h2>
     </div>


      <!-- Mensaje de error de comunicación -->
      <v-alert v-if="errorServidor" type="error" class="alerta-error" prominent color="red lighten-3">
        <span class="alert-text">Fallo de comunicación con el servidor</span>
      </v-alert>

      <div v-if="cargando && !errorServidor" class="text-center">
        <v-progress-circular :size="70" :width="7" color="#17195e" indeterminate></v-progress-circular>
      </div>

      <div v-if="!cargando && !errorServidor && citas.length === 0" class="texto-centrado">
        <p>No tienes citas pasadas</p>
      </div>

      <!-- Tabla de citas -->
      <table v-if="!cargando && !errorServidor && citas.length > 0" class="citas-table">

        <thead>
          <tr>
            <th></th>
            <th>Prestación</th>
            <th>Fecha</th>
            <th>Paciente</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cita in citas" :key="cita._id">
            <td v-if="comprobarExisteInforme(cita)" class="citas-actions" >
              <button class="btn" @click="editarInforme(cita)">
                Editar informe
              </button>
              <button class="btn" @click="verInforme(cita)">
                Ver informe
              </button>
            </td>
            <td v-else class="citas-actions" >
              <button class="btn" @click="generarInforme(cita)">
                Generar informe
              </button>
            </td>
            <td>{{ cita.prestacionId?.nombre }}</td>
            <td>{{ formatearFecha(cita.fechaHora) }}</td>
            <td>{{cita.pacienteId.nombre + ' ' + cita.pacienteId.apellidos }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  </div>
</template>

<script>
import apiClient from '@/apiClient';
import { useAuthStore } from '../../store/auth';
import Header from './Header.vue';
import jsPDF from 'jspdf';

export default {
  name: "InformesMedico",
  components: {
    Header
  },
  data() {
    return {
      fechaHora: '',
      citas: [], // Lista de citas
      departamento: {}, // Datos del departamento del médico seleccionado
      prestaciones: [], // Prestaciones del departamento
      medico: {}, // Datos del médico seleccionado
      pacientes: [], // Lista de pacientes
      informes: [], // Informes del médico
      mostrarGenerarInforme: false,
      mostrarEditarInforme: false,
      nuevoInforme: {
        medicoId: '',
        pacienteId: '',
        especialidadId: '',
        prestacionId: '',
        citaId: '',
        fecha: '',
        diagnostico: '',
        observaciones: ''
      },
      cargando: false,
      errorServidor: false,
    };
  },
  methods: {
    
    datosUsuario() {
      const authStore = useAuthStore();
      this.medico = authStore.getUser ? authStore.getUser : 'Usuario';
      this.nuevoInforme.medicoId = this.medico._id;
      this.actualizarEspecialidadYPrestaciones();
    },
    obtenerFechaHoraCanarias() {
      const opcionesFecha = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const opcionesHora = { hour: '2-digit', minute: '2-digit', hour12: false };
  
      // Obtener la hora de Canarias (GMT+0)
      const ahora = new Date();
      const horaCanarias = new Date(ahora.toLocaleString("en-US", { timeZone: "Atlantic/Canary" }));

      // Formatear la fecha y la hora
      const fechaFormateada = horaCanarias.toLocaleDateString('es-ES', opcionesFecha);
      const horaFormateada = horaCanarias.toLocaleTimeString('es-ES', opcionesHora).replace(':', '.');

      return `${fechaFormateada}, ${horaFormateada} h`;
    },
    comprobarExisteInforme(cita) {
      // Comprobar si ya existe un informe para la cita seleccionada
      for (const informe of this.informes) {
        if (informe.citaId === cita._id) {
          return true;
        }
      }
    },
    async obtenerCitasPasadas() {
      this.cargando = true;
      try {
        const response = await apiClient.get('/api/citas', {
          params: {
            medicoId: this.medico._id,
            especialidadId: this.departamento._id
          }
        });
        
        const citas = response.data;
        const ahora = new Date();

        this.citas = citas
          .filter(cita => new Date(cita.fechaHora) < ahora && cita.pacienteId !== null)
          .sort((a, b) => new Date(a.fechaHora) - new Date(b.fechaHora))
      } catch (error) {
        console.error('Error al obtener citas:', error);
        this.errorServidor = true;
      } finally {
        this.cargando = false;
      }
    },
    async obtenerRecetas() {
      this.cargando = true;
      try {
        const response = await apiClient.get('/api/recetas', {
          params: {
            medicoId: this.medico._id
          }
        });

        this.recetas = response.data;
      } catch (error) {
        console.error('Error al obtener recetas:', error);
        this.errorServidor = true;
      } finally {
        this.cargando = false;
      }
    },
    async obtenerInformes() {
      this.cargando = true;
      try {
        const response = await apiClient.get('/api/informes', {
          params: {
            medicoId: this.medico._id
          }
        });

        this.informes = response.data;
      } catch (error) {
        console.error('Error al obtener informes:', error);
        this.errorServidor = true;
      } finally {
        this.cargando = false;
      }
    },
    obtenerPacientes() {
      apiClient.get('/api/usuarios/pacientes')
        .then(response => {
          this.pacientes = response.data;
        })
        .catch(error => {
          console.error('Error al obtener pacientes:', error);
          this.errorServidor = true;
        });
    },
    async actualizarEspecialidadYPrestaciones() {
      if (!this.medico._id) {
        this.prestaciones = [];
        return;
      }

      this.cargando = true;
      try {
        const medicoResponse = await apiClient.get(`/api/usuarios/${this.medico._id}`);
        this.medico = medicoResponse.data; // Guardar datos del médico

        if (this.medico.departamento) {
          const departamentoResponse = await apiClient.get(`/api/departamentos/${this.medico.departamento}`);
          this.departamento = departamentoResponse.data;

          // Asegúrate de que las prestaciones existan y sean válidas
          this.prestaciones = Array.isArray(this.departamento.prestaciones)
            ? this.departamento.prestaciones
            : [];
          this.medico.especialidadId = this.departamento._id;
        } else {
          this.prestaciones = [];
        }
      } catch (error) {
        console.error('Error al obtener especialidad y prestaciones:', error);
      } finally {
        this.cargando = false;
      }
    },
    mostrarPrestacion(prestacionId) {
      const prestacion = this.prestaciones.find(prestacion => prestacion._id === prestacionId);
      return prestacion ? prestacion.nombre : '';
    },
    mostrarPaciente(pacienteId) {
      const paciente = this.pacientes.find(paciente => paciente._id === pacienteId);
      return paciente ? `${paciente.nombre} ${paciente.apellidos}` : '';
    },
    
    editarInforme(cita) {
      const informe = this.informes.find(informe => informe.citaId === cita._id);
      if (informe) {
        this.nuevoInforme = {
          _id: informe._id,
          medicoId: informe.medicoId,
          pacienteId: informe.pacienteId,
          especialidadId: informe.especialidadId,
          prestacionId: informe.prestacionId,
          citaId: informe.citaId,
          fecha: new Date(informe.fecha),
          diagnostico: informe.diagnostico,
          observaciones: informe.observaciones
        };
        this.mostrarEditarInforme = true;
      }
    },
    guardarInforme() {
      // Guardar el informe editado
      apiClient.put(`/api/informes/${this.nuevoInforme._id}`, this.nuevoInforme)
        .then(() => {
          this.resetFormulario();
          this.obtenerCitasPasadas();
          this.obtenerInformes();
        })
        .catch(error => {
          console.error('Error al guardar informe:', error);
          this.errorServidor = true;
        });
    },
    generarInforme(cita) {
      this.mostrarGenerarInforme = true;
      this.nuevoInforme.especialidadId = cita.especialidadId._id;
      this.nuevoInforme.prestacionId = cita.prestacionId;
      this.nuevoInforme.fecha = new Date(cita.fechaHora);
      this.nuevoInforme.pacienteId = cita.pacienteId;
      this.nuevoInforme.citaId = cita._id;
    },
    formatearFecha(fechaHora) {
      const fecha = new Date(fechaHora);
      const dia = String(fecha.getDate()).padStart(2, '0');
      const mes = String(fecha.getMonth() + 1).padStart(2, '0');
      const anio = fecha.getFullYear();
      return `${dia}/${mes}/${anio}`;
    },
    formatearHora(fechaHora) {
      const fecha = new Date(fechaHora);
      const horas = String(fecha.getHours()).padStart(2, '0');
      const minutos = String(fecha.getMinutes()).padStart(2, '0');
      return `${horas}:${minutos} h`;
    },
    resetFormulario() {
      this.mostrarGenerarInforme = false;
      this.mostrarEditarInforme = false;
      this.nuevoInforme = {
        pacienteId: '',
        especialidadId: '',
        prestacionId: '',
        citaId: '',
        fecha: '',
        diagnostico: '',
        observaciones: ''
      };
    },
    async obtenerDatos() {
      // Obtener todas las citas, especialidades y médicos al montar el componente
      await Promise.all([this.obtenerCitasPasadas()]);
      this.obtenerInformes();
      this.obtenerPacientes();
    },
    async buscarNombreMedico(medicoId) {
      const response = await apiClient.get(`/api/usuarios/${medicoId}`);
      const Medico = response.data;
      console.log(Medico);
      return Medico.nombre + ' ' + Medico.apellidos;
    },

    async crearInforme() {
        try {
          // Verificar que todos los campos requeridos estén presentes
          if (!this.nuevoInforme.medicoId || !this.nuevoInforme.pacienteId || !this.nuevoInforme.especialidadId || !this.nuevoInforme.prestacionId || !this.nuevoInforme.citaId || !this.nuevoInforme.fecha || !this.nuevoInforme.diagnostico) {
            throw new Error('Todos los campos requeridos deben estar presentes');
          }
          const Informe = {
            medicoId: this.nuevoInforme.medicoId,
            pacienteId: this.nuevoInforme.pacienteId._id,
            especialidadId: this.nuevoInforme.especialidadId,
            prestacionId: this.nuevoInforme.prestacionId._id,
            citaId: this.nuevoInforme.citaId,
            fecha: this.nuevoInforme.fecha,
            diagnostico: this.nuevoInforme.diagnostico,
            observaciones: this.nuevoInforme.observaciones
          }

          await apiClient.post('/api/informes', Informe);
          this.resetFormulario();
          this.obtenerCitasPasadas();
          location.reload();
        } catch (error) {
          console.error('Error al crear informe:', error);
          throw error; // Relanzar el error para manejarlo en procesarCitas
        }
      },

      async verInforme(cita) {
      const informe = this.informes.find(Informe => Informe.citaId === cita._id);
      const nombreMedico = await this.buscarNombreMedico(informe.medicoId);
      const doc = new jsPDF();
      // Agregar logo
      const logo = new Image();
      logo.src = require('@/assets/logo.png');
      logo.onload = () => {
        doc.addImage(logo, 'PNG', 10, 10, 60, 15);

        // Agregar contenido del informe
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('Informe Médico', 105, 60, null, null, 'center');
        doc.setFontSize(12);
        doc.text('Médico:', 15, 80);
        doc.setFont('helvetica', 'normal');
        doc.text(` ${nombreMedico} `, 40, 80);
        doc.setFont('helvetica', 'bold');
        doc.text('Fecha:', 15, 90);
        doc.setFont('helvetica', 'normal');
        doc.text(`${this.formatearFecha(informe.fecha)}`, 40, 90);
        doc.setFont('helvetica', 'bold');
        doc.text('Paciente:', 15, 100);
        doc.setFont('helvetica', 'normal');
        doc.text(`${this.mostrarPaciente(informe.pacienteId)}`, 40, 100);
        doc.setFont('helvetica', 'bold');
        doc.text('Diagnóstico:', 15, 110);
        doc.rect(15, 115, 180, 30);
        doc.setFont('helvetica', 'normal');
        doc.text(`${informe.diagnostico}`, 17, 121);
        doc.setFont('helvetica', 'bold');
        doc.text('Observaciones:', 15, 160);
        doc.rect(15, 165, 180, 30);
        doc.setFont('helvetica', 'normal');
        doc.text(`${informe.observaciones}`, 17, 171);


        // Abrir el PDF en una nueva pestaña y luego imprimir
        const pdfData = doc.output('bloburl');
        window.open(pdfData, '_blank');
      };
    },
  },
  
  mounted() {
    this.datosUsuario();
    this.obtenerDatos();
    this.fechaHora = this.obtenerFechaHoraCanarias();
    setInterval(() => {
      this.fechaHora = this.obtenerFechaHoraCanarias();
    }, 1000); // Actualiza la hora cada segundo
  },
  computed: {
    nombreUsuario() {
      const authStore = useAuthStore();
      return authStore.getUser ? `${authStore.getUser.nombre} ${authStore.getUser.apellidos}` : 'Usuario';
    },

  },

};
</script>


<style scoped>
  .contenedor-principal {
    display: flex;
    justify-content: space-between;
  }
  .contenedor-body {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 0 auto;
}
  
  .columna-formulario {
    width: 40%;
  }
  .columna-citas {
    width: 65%;
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


  .estilo-pagina {  
    margin-left: 2rem; 
    margin-right: 2rem;
  }


  .header span {
    color: var(--primary-color);
  }

  .header img.logo {
    width: 200px;
    height: auto; 
  }

  .header h1.left-align {
    text-align: left;
    margin-left: 10px; 
  }

  .header h1.small-text {
    font-size: 20px; 
    color: var(--primary-color);
    font-weight: 300;
  }

  .vertical-line {
    width: 4px;
    height: 70px;
    background-color: #92bdf6; 
  }

  .user-head {
    position: relative;
    align-items: center;
    display: flex;
    margin-left: 2rem;
    justify-content: center;
  }

  .usuario-boton {
    color: var(--primary-color);
    text-decoration: none;
    cursor: pointer;
    font-size: 0.8em;
    margin-left: 0.4em;
  }

  .barra-fecha {
    background-color: var(--primary-color);
    color: white;
    font-size: 1.1rem;
    padding: 10px 20px;
    border: none;
    border-radius: 10px;

    display: flex;
    align-items: center;

  }

  .boton-crear {
    background-color: var(--color-verde);
    color: var(--primary-color);
    font-size: 1.1rem;
    padding: 10px 20px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
  }
  .boton-crear:hover {
    background-color: #00e682;
  }

  /* Estilo del círculo */
  .circle {
    width: 5rem; /* Tamaño del círculo */
    height: 5rem;
    border-radius: 50%; /* Hace que sea un círculo */
    background-color: var(--color-azul); /* Usa el color definido */
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 0.5rem;
    margin: 0.5rem;
    margin-right: 20px; 

  }

  .alinear-elementos {
    display: flex;
    align-items: center;
  }


  .informacion {
    font-weight: bold; /* Aumenta el grosor de la fuente de letra */
    font-size: 1.6rem; /* Ajusta el tamaño del texto de nombreUsuario */
  }
  
  select, option {
    font-weight: 500; /* Ajuste del grosor de la fuente de letra  */

  }


  .error-cuadro {
    background-color: var(--error-color);
    color: white;
    padding: 10px;
    margin-bottom: 20px;
    border-radius: 5px;
  }

  .icon-container {
    display: flex;
    align-items: center;
    gap: 10px; /* Espacio entre el círculo y el texto */
    margin-left: auto;
  }


  
  .citas-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }

  .citas-table th,
  .citas-table td {
    padding: 8px;
    text-align: left;
    border: 1px solid #ddd;
    vertical-align: top; /* Asegura que el contenido se alinee en la parte superior */
    
  }

  .citas-table th {
    background-color: #f4f4f4;
    font-weight: bold;

  }

  .citas-table td {
    background-color: white;
    
  }

  .citas-actions {
    width: auto; /* Ajusta el ancho según el contenido */
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .btn:hover {
    background-color: var(--color-azul); /* Cambia el color al pasar el ratón */
  }

  /* Estilo para los campos de entrada de texto, email y el selector */
  input[type="text"],
  input[type="date"],
  input[type="time"],
  input[type="number"],
  select {
    background-color: #C6DEFD; /* Color de fondo del campo */
    padding: 8px;
    border-radius: 5px;
    outline: none;
    font-family: 'Outfit', sans-serif; /* Asegura que la fuente sea uniforme */
  }

  /* Cambia el color del borde y añade un efecto cuando el campo está enfocado */
  input[type="text"]:focus,
  select:focus {
    border-color: var(--color-azul); /* Cambia el color del borde al hacer foco */
    box-shadow: 0 0 5px var(--color-azul); /* Añade sombra al hacer foco */
    background-color: #C6DEFD; /* Mantiene el color de fondo al hacer foco */
  }

  label {
    text-align: left; /* Alinea los labels a la izquierda para mejor legibilidad */
    font-weight: bold; /* Resalta los labels */
  } 

  .btn {
  background-color: var(--color-azul2);
  color: rgb(0, 0, 0);
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}
.text-box{

  height: 8rem;
  width: 25em; 
  background-color: #92bdf6; 
  border-radius: 0.5rem;
}
.small-box{
  height: 2rem;
  width: 25em; 
  background-color: #92bdf6; 
  border-radius: 0.5rem;
}
  .btn:hover {
    background-color: #1c1c5a;
    color: white;
  }

  .texto-centrado {
    text-align: center;
  }

  .alerta-error {
    margin-bottom: 20px;
  }

  .text-center {
    text-align: center;
}
  </style>
  