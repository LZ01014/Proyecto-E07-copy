<template>
    <div>
      <Header/>
      <div class="estilo-pagina">
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
                    <path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v200h-80v-40H200v400h280v80H200Zm0-560h560v-80H200v80Zm0 0v-80 80ZM560-80v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8 9 12.5 20t4.5 22q0 11-4 22.5T903-300L683-80H560Zm300-263-37-37 37 37ZM620-140h38l121-122-18-19-19-18-122 121v38Zm141-141-19-18 37 37-18-19Z"/>
                </svg>
            </div>
            <h2 style="color: var(--primary-color);">Asignar cita</h2>
          </div>
          <br>

          <div v-if="citaSeleccionada" class="citas-disponibles-item">
            
            <p class="icono-texto">
              <span class="circle-citas-disponibles">
              <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="var(--primary-color)">
                <path d="M680-320q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35Zm0-80q17 0 28.5-11.5T720-440q0-17-11.5-28.5T680-480q-17 0-28.5 11.5T640-440q0 17 11.5 28.5T680-400ZM440-40v-116q0-21 10-39.5t28-29.5q32-19 67.5-31.5T618-275l62 75 62-75q37 6 72 18.5t67 31.5q18 11 28.5 29.5T920-156v116H440Zm79-80h123l-54-66q-18 5-35 13t-34 17v36Zm199 0h122v-36q-16-10-33-17.5T772-186l-54 66Zm-76 0Zm76 0Zm-518 0q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v200q-16-20-35-38t-45-24v-138H200v560h166q-3 11-4.5 22t-1.5 22v36H200Zm80-480h280q26-20 57-30t63-10v-40H280v80Zm0 160h200q0-21 4.5-41t12.5-39H280v80Zm0 160h138q11-9 23.5-16t25.5-13v-51H280v80Zm-80 80v-560 137-17 440Zm480-240Z"/>
              </svg></span>
              {{ citaSeleccionada.medicoId.nombre }} {{ citaSeleccionada.medicoId.apellidos }}
            </p>  

            <p class="icono-texto">
              <span class="circle-citas-disponibles">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="var(--primary-color)">
                <path d="M540-80q-108 0-184-76t-76-184v-23q-86-14-143-80.5T80-600v-240h120v-40h80v160h-80v-40h-40v160q0 66 47 113t113 47q66 0 113-47t47-113v-160h-40v40h-80v-160h80v40h120v240q0 90-57 156.5T360-363v23q0 75 52.5 127.5T540-160q75 0 127.5-52.5T720-340v-67q-35-12-57.5-43T640-520q0-50 35-85t85-35q50 0 85 35t35 85q0 39-22.5 70T800-407v67q0 108-76 184T540-80Zm220-400q17 0 28.5-11.5T800-520q0-17-11.5-28.5T760-560q-17 0-28.5 11.5T720-520q0 17 11.5 28.5T760-480Zm0-40Z"/>
              </svg></span>
              {{ citaSeleccionada.especialidadId ? citaSeleccionada.especialidadId.nombre : 'No asignada' }}
            </p>

            <p class="icono-texto">
              <span class="circle-citas-disponibles">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="var(--primary-color)">
                <path d="M480-254 330-104q-23 23-56 23t-56-23L104-218q-23-23-23-56t23-56l150-150-150-150q-23-23-23-56t23-56l114-114q23-23 56-23t56 23l150 150 150-150q23-23 56-23t56 23l114 114q23 23 23 56t-23 56L706-480l150 150q23 23 23 56t-23 56L742-104q-23 23-56 23t-56-23L480-254Zm0-266q17 0 28.5-11.5T520-560q0-17-11.5-28.5T480-600q-17 0-28.5 11.5T440-560q0 17 11.5 28.5T480-520Zm-170-16 114-114-150-150-114 114 150 150Zm90 96q17 0 28.5-11.5T440-480q0-17-11.5-28.5T400-520q-17 0-28.5 11.5T360-480q0 17 11.5 28.5T400-440Zm80 80q17 0 28.5-11.5T520-400q0-17-11.5-28.5T480-440q-17 0-28.5 11.5T440-400q0 17 11.5 28.5T480-360Zm80-80q17 0 28.5-11.5T600-480q0-17-11.5-28.5T560-520q-17 0-28.5 11.5T520-480q0 17 11.5 28.5T560-440Zm-24 130 150 150 114-114-150-150-114 114ZM339-621Zm282 282Z"/>
              </svg></span>
             {{ citaSeleccionada.prestacionId ? citaSeleccionada.prestacionId.nombre : 'No asignada' }}
            </p>

            <p class="icono-texto">
              <span class="circle-citas-disponibles">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="var(--primary-color)">
                <path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm280 240q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z"/>
              </svg></span>
              {{ formatearFecha(citaSeleccionada.fechaHora) }}
            </p>

            <p class="icono-texto">
              <span class="circle-citas-disponibles">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="var(--primary-color)">
                <path d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z"/>
              </svg></span>

              {{ formatearHora(citaSeleccionada.fechaHora) }} ({{ citaSeleccionada.duracion }} minutos)
            </p>
            </div>

            <div v-if="citaSeleccionada">
              <!-- Selector de Pacientes -->
              <label>Paciente:<br>
              <select v-model="pacienteSeleccionado">
                <option value="">Seleccione un paciente</option>
                <option v-for="paciente in pacientes" :key="paciente._id" :value="paciente._id">
                    {{ paciente.nombre }} {{ paciente.apellidos }}
                </option>
              </select>
              </label>
            
                <button v-if="pacienteSeleccionado.length > 0" @click="confirmarAsignacion()" class="boton-crear" style="color: var(--primary-color); background-color: (--color-verde);">
                Asignar cita
                </button>
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
         <h2 style="color: var(--primary-color);">Listado de citas médicas</h2>
       </div>
  
  
        <!-- Mensaje de error de comunicación -->
        <v-alert v-if="errorServidor" type="error" class="alerta-error" prominent color="red lighten-3">
          <span class="alert-text">Fallo de comunicación con el servidor</span>
        </v-alert>
  
        <div v-if="cargando && !errorServidor" class="text-center">
          <v-progress-circular :size="70" :width="7" color="#17195e" indeterminate></v-progress-circular>
        </div>
  
        <div v-if="!cargando && !errorServidor && citas.length === 0" class="texto-centrado">
          <p>No hay citas disponibles</p>
        </div>

        <br>

        
        <div @click="filtrado = !filtrado">
          <button class="boton-crear" style="background-color: var(--primary-color); color:white;">
            Filtrar
            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="white">
              <path d="M440-160q-17 0-28.5-11.5T400-200v-240L168-736q-15-20-4.5-42t36.5-22h560q26 0 36.5 22t-4.5 42L560-440v240q0 17-11.5 28.5T520-160h-80Zm40-308 198-252H282l198 252Zm0 0Z"/>
            </svg>  
          </button> 
        </div>
        
        <div v-if="filtrado" class="filtros-container">
        
        <!-- Campo de búsqueda -->
        <div class="buscador" style="height: 60px; margin-right: 1px; padding-right: 1px;">
          <label for="searchQuery">Buscar por Médico o Paciente</label>
          <input type="text" v-model="searchQuery" id="searchQuery" placeholder="Nombre o apellidos" style="height: 40px; margin: 1px 0; padding: 5px; color: black;" />
        </div>

        <!-- Selector de Especialidades -->
        <div class="buscador" style="max-width: 20%; height: 60px; margin-right: 1px; padding-right: 1px;">
          <label for="especialidad">Especialidad</label>
          <select v-model="especialidadSeleccionada" id="especialidad" @change="obtenerPrestaciones" style="height: 100%;">
            <option value="" style="font-weight: bold;">Todas</option>
            <option v-for="especialidad in especialidades" :key="especialidad._id" :value="especialidad">
              {{ especialidad.nombre }}
            </option>
          </select>
        </div>

        <!-- Selector de Prestaciones -->
        <div v-if="especialidadSeleccionada" class="buscador" style="max-width: 20%; height: 60px; margin-right: 5px; padding-right: 1px;">
          <label for="prestacion">Prestación</label>
          <select v-model="prestacionSeleccionada" id="prestacion" style="height: 100%;">
            <option value="" style="font-weight: bold;">Todas</option>
            <option v-for="prestacion in prestaciones" :key="prestacion._id || prestacion" :value="prestacion._id || prestacion">
              {{ prestacion?.nombre || prestacion }}
            </option>
          </select>
        </div>

        <!-- Selector de Tipo de Cita -->
        <div :class="{'buscador': true, 'ajustado': especialidadSeleccionada}" style="max-width: 13%; height: 60px;">
          <label for="tipoCita">Citas a mostrar</label>
          <select v-model="tipoCitaSeleccionada" id="tipoCita" style="height: 100%;">
            <option value="" style="font-weight: bold;">Todas</option>
            <option value="disponibles" style="font-weight: bold;">Disponibles</option>
            <option value="asignadas" style="font-weight: bold;">Ya asignadas</option>
          </select>
        </div>

        
        <div style="width: 100%; display: flex; justify-content: space-between; flex-wrap: wrap;">
          <!-- Selector de Fecha de Inicio -->
          <div class="buscador" style="max-width: 48%; margin-top: 10px;">
            <label for="fechaInicio">Desde</label>
            <input type="date" v-model="fechaInicioSeleccionada" id="fechaInicio" />
          </div>

          <!-- Selector de Fecha Final -->
          <div class="buscador" style="max-width: 48%; margin-top: 10px;">
            <label for="fechaFinal">Hasta</label>
            <input type="date" v-model="fechaFinalSeleccionada" id="fechaFinal" />
          </div>
        </div>

        <!-- Botón para Restaurar valores -->
        <div style="width: 100%; display: flex; justify-content: flex-start; margin-top: 10px; padding-left: 10px;">
          <button @click="restaurarValores" class="boton-crear" style="background-color: var(--color-rojo);">
            Restaurar valores
          </button>
        </div>

        </div>
      
  
        <!-- Tabla de citas -->
        <table v-if="!cargando && !errorServidor && citas.length > 0" class="citas-table">
  
          <thead>
            <tr>
              <th>Acción</th>
              <th>Especialidad</th>
              <th>Prestación</th>
              <th>Médico</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Duración</th>
              <th>Paciente</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="cita in filtrarCitas" :key="cita._id">
                <td class="citas-actions">
                <button 
                  v-if="cita.pacienteId" 
                  class="boton-crear" 
                  @click="confirmarDesasignacion(cita._id)" 
                  style="background-color: var(--color-rojo); color: var(--primary-color); width: 100%;">
                  Desasignar
                </button>
                <button 
                  v-else 
                  class="boton-crear" 
                  @click="botonAsignarCita(cita)" 
                  style="background-color: var(--color-verde); color: var(--primary-color); width: 100%;">
                  Asignar
                </button>
                </td>

              <td>{{ cita.especialidadId?.nombre }}</td>
              <td>{{ cita.prestacionId?.nombre }}</td>
              <td>{{ cita.medicoId?.nombre }}</td>
              <td>{{ formatearFecha(cita.fechaHora) }}</td>
              <td>{{ formatearHora(cita.fechaHora) }}</td>
              <td>{{ cita.duracion }}</td>
                <td>
                    {{ cita.pacienteId ? cita.pacienteId.nombre + ' ' + cita.pacienteId.apellidos : '-' }}
                </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    </div>
  </div>
  </template>
  
<script>
import apiClient from '@/apiClient';
import { useAuthStore } from '../../store/auth';
import Header from './Header.vue';

export default {
    name: "CitasAdministracion",
    components: {
        Header
    },
    data() {
        return {
            fechaHora: '',
            pacientes: [], // Lista de pacientes
            citas: [], // Lista de citas
            especialidades: '', // Lista de especialidades
            especialidadSeleccionada: '', // Datos del departamento del médico seleccionado
            prestaciones: '', // Prestaciones de la especialidad seleccionada
            prestacionSeleccionada: '',
            pacienteSeleccionado: '', // Datos del paciente seleccionado
            fechaFinalSeleccionada: '',
            fechaInicioSeleccionada: '',
            citaSeleccionada: '',
            cargando: false,
            errorServidor: false,
            usuario: '', // Datos del usuario autenticado
            departamento: '', // Datos del departamento del usuario autenticado
            citasFiltradas: '',
            filtrado: false,
            tipoCitaSeleccionada: '',
            searchQuery: '', // Campo de búsqueda

        };
    },
    computed: {
      filtrarCitas() {
        const busqueda = this.searchQuery?.toLowerCase() || ''; // Asegurar que sea una cadena en minúsculas
        return this.citas.filter(cita => {
          const pacienteNombre = cita.pacienteId?.nombre?.toLowerCase() || '';
          const pacienteApellidos = cita.pacienteId?.apellidos?.toLowerCase() || '';
          const pacienteUsername = cita.pacienteId?.username?.toLowerCase() || '';

          const medicoNombre = cita.medicoId?.nombre?.toLowerCase() || '';
          const medicoApellidos = cita.medicoId?.apellidos?.toLowerCase() || '';
          const medicoUsername = cita.medicoId?.username?.toLowerCase() || '';

          const especialidad = cita.especialidadId?._id || '';
          const prestacion = cita.prestacionId?._id || '';

          const fechaCita = new Date(cita.fechaHora);
          const fechaInicio = this.fechaInicioSeleccionada ? new Date(this.fechaInicioSeleccionada) : null;
          const fechaFinal = this.fechaFinalSeleccionada ? new Date(this.fechaFinalSeleccionada) : null;

          // Verifica si alguno de los campos incluye la búsqueda
          const coincideBusqueda = (
            pacienteNombre.includes(busqueda) ||
            pacienteApellidos.includes(busqueda) ||
            pacienteUsername.includes(busqueda) ||
            medicoNombre.includes(busqueda) ||
            medicoApellidos.includes(busqueda) ||
            medicoUsername.includes(busqueda)
          );

          const coincideEspecialidad = !this.especialidadSeleccionada?._id || especialidad === this.especialidadSeleccionada?._id;
          const coincidePrestacion = !this.prestacionSeleccionada || prestacion === this.prestacionSeleccionada;
          const coincideTipoCita = !this.tipoCitaSeleccionada || 
            (this.tipoCitaSeleccionada === 'disponibles' && !cita.pacienteId) ||
            (this.tipoCitaSeleccionada === 'asignadas' && cita.pacienteId);
          const coincideFechaInicio = !fechaInicio || fechaCita >= fechaInicio;
          const coincideFechaFinal = !fechaFinal || fechaCita <= fechaFinal;

          return coincideBusqueda && coincideEspecialidad && coincidePrestacion && coincideTipoCita && coincideFechaInicio && coincideFechaFinal;
        });
      }
    },
    methods: {
        async datosUsuario() {
            const authStore = useAuthStore();
            this.usuario = authStore.getUser ? authStore.getUser : 'Usuario';
            const departamento = this.usuario.departamento;
            const departamentoResponse = await apiClient.get(`/api/departamentos/${departamento}`);
            this.departamento = departamentoResponse.data;
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

        async obtenerPacientes() {
            try {
                const response = await apiClient.get('/api/usuarios/pacientes');
                this.pacientes = response.data;
            } catch (error) {
                console.error('Error al obtener pacientes:', error);
                this.errorServidor = true;
            }
        },

        async obtenerCitas() {
            this.cargando = true;
            try {
                const response = await apiClient.get('/api/citas'); 

                const citas = response.data;
                const ahora = new Date();

                this.citas = citas
                    .filter(cita => new Date(cita.fechaHora) > ahora)
                    .sort((a, b) => new Date(a.fechaHora) - new Date(b.fechaHora));
                    
            } catch (error) {
                console.error('Error al obtener citas:', error);
                this.errorServidor = true;
            } finally {
                this.cargando = false;
            }
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
        

        confirmarDesasignacion(id) {
            const confirmacion = window.confirm(`¿Está seguro de que desea desasignar la cita?`);
            if (confirmacion) {
                this.desasignarCita(id);
            }
        },
        confirmarAsignacion() {
            const confirmacion = window.confirm(`¿Está seguro de que desea asignar la cita?`);
            if (confirmacion) {
                this.asignarCita(this.citaSeleccionada._id);
            }
        },

        async desasignarCita(citaId) {
            try {
                // Validar si tenemos todos los datos necesarios
                if (!citaId) {
                    console.error('No se pudo desasignar la cita. Faltan datos.');
                    return;
                }

                // Realizar la petición PUT para reservar la cita
                const response = await apiClient.put(`/api/citas/${citaId}`, {
                    pacienteId: null // Se asigna el paciente seleccionado
                });

                // Manejar la respuesta de éxito
                if (response.status === 200) {
                    alert('Cita desasignada con éxito');
                    // Actualizar el estado de la lista de citas disponibles y las citas de consulta
                    this.obtenerCitas();
                } else {
                    console.error('Error al reservar la cita', response);
                    alert('Hubo un error al reservar la cita');
                }
            } catch (error) {
                console.error('Error en la petición PUT', error);
                alert('Hubo un error al reservar la cita');
            }
        },

        async asignarCita(citaId) {
            try {
                // Validar si tenemos todos los datos necesarios
                if (!citaId) {
                    console.error('No se pudo asignar la cita. Faltan datos.');
                    return;
                }

                // Realizar la petición PUT para reservar la cita
                const response = await apiClient.put(`/api/citas/${citaId}`, {
                    pacienteId: this.pacienteSeleccionado // Se asigna el paciente seleccionado
                });

                // Manejar la respuesta de éxito
                if (response.status === 200) {
                    alert('Cita asignada con éxito');
                    // Actualizar el estado de la lista de citas disponibles y las citas de consulta
                    this.obtenerCitas();
                    this.restaurarValores();
                } else {
                    console.error('Error al reservar la cita', response);
                    alert('Hubo un error al reservar la cita');
                }
            } catch (error) {
                console.error('Error en la petición PUT', error);
                alert('Hubo un error al reservar la cita');
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
            const response = await apiClient.get('/api/prestaciones');
            const prestaciones = response.data;
            if (this.especialidadSeleccionada && this.especialidadSeleccionada.prestaciones) {
              this.prestaciones = prestaciones.filter(prestacion => 
                this.especialidadSeleccionada.prestaciones.includes(prestacion._id)
              );
            } else {
              this.prestaciones = [];
            }
          } catch (error) {
            console.error('Error al obtener prestaciones:', error);
            this.errorServidor = true;
          }
        },
        restaurarValores() {
          this.especialidadSeleccionada = '';
          this.prestacionSeleccionada = '';
          this.fechaInicioSeleccionada = '';
          this.fechaFinalSeleccionada = '';
          this.tipoCitaSeleccionada = '';
          this.searchQuery = '';
          this.citaSeleccionada = '';
          this.pacienteSeleccionado = '';
          this.filtrado = false;
        },
        botonAsignarCita(citaId) {
          this.citaSeleccionada = citaId;
        },


        
    },
    mounted() {
        this.obtenerCitas();  
        this.datosUsuario();
        this.obtenerEspecialidades();
        this.obtenerPacientes();

        this.intervalId = setInterval(() => {
            this.obtenerCitas();
        }, 60000); // Actualiza cada 1 minuto

        this.fechaHora = this.obtenerFechaHoraCanarias();
        setInterval(() => {
            this.fechaHora = this.obtenerFechaHoraCanarias();
        }, 1000); // Actualiza la hora cada segundo
    },
    beforeDestroy() {
        clearInterval(this.intervalId);
    }
};
</script>
  
  
  <style scoped>
    .contenedor-principal {
      display: flex;
      justify-content: space-between;
    }
    
    .columna-formulario {
      width: 30%;
    }
    .columna-citas {
      width: 65%;
    }
    
    button {
      background-color: var(--color-verde);
      color: var(--primary-color);
      font-size: 1.1rem;
      padding: 10px 20px;
      border: none;
      border-radius: 10px;
      cursor: pointer;
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
      margin-top: 6px;
  
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
      justify-content: flex-start;
    }
  
  
    .boton-eliminar {
      background-color: #dc3545; /* Fondo rojo para el botón */
      color: white; /* Texto blanco */
      border: none;
      padding: 5px 10px;
      border-radius: 3px;
      cursor: pointer;
    }
  
    .boton-eliminar:hover {
      background-color: #c82333; /* Cambia el color al pasar el ratón */
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
      width: 100%;
      font-weight: 400;
    }
  
    /* Cambia el color del borde y añade un efecto cuando el campo está enfocado */
    input[type="text"]:focus,
    select:focus {
      border-color: var(--color-azul); /* Cambia el color del borde al hacer foco */
      box-shadow: 0 0 5px var(--color-azul); /* Añade sombra al hacer foco */
      background-color: #C6DEFD; /* Mantiene el color de fondo al hacer foco */
    }
  
    label {
      margin-bottom: 10px;
      text-align: left; /* Alinea los labels a la izquierda para mejor legibilidad */
      font-weight: bold; /* Resalta los labels */
      width: 100%;
  
    } 

    .buscador {
      margin-top: 20px;
      margin-bottom: 5px;
      padding: 10px;
      width: 100%;
      max-width: 24%;
      border-radius: 5px;
      color: var(--primary-color);
    }

    .filtros-container {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 20px;
      padding: 10px;
      background-color: #f9f9f9;
      border-radius: 5px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      
    }

    .citas-disponibles-item {
      padding: 10px;
      margin-bottom: 10px;
      border-radius: 5px;
      color: var(--primary-color); /* Texto blanco para mejor contraste */
      background-color: #f4f9ff;
      border: 1px solid #d2e4fd;
    }

    .citas-disponibles-item p {
      margin: 5px 0; /* Espaciado entre párrafos */
    }

    .icono-texto {
      display: flex;
      align-items: center;
    }

    /* Estilo del círculo */
  .circle-citas-disponibles {
    width: 2rem; /* Tamaño del círculo */
    height: 2rem;
    border-radius: 50%; /* Hace que sea un círculo */
    background-color: var(--color-azul2); /* Usa el color definido */
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 0.5rem;
    margin: 0.1rem;
    margin-right: 10px; 

  }
  
  
    </style>
    