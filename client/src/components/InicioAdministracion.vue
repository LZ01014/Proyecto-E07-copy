<template>
  <div>
    <Header/>
    <br>  
    <br>
    <div class="estilo-pagina">
    
    
    <!-- Saludo y banner fraudes -->
    <div class="saludo">
      <img :src="icono" alt="Saludo Icono" class="saludo-icono" />
      <span class="saludo-texto">
        {{ saludo }},
        <br />
        <strong>{{ nombreUsuario }}</strong>
      </span>
      <div class="icon-container">

        <div class="circle" style="background-color: var(--color-azul2);">
        
          <svg width="60" height="60" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style="color: var(--primary-color);">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M21.407 15.0924C23.9122 15.5612 25.8082 17.7592 25.8082 20.4C25.8082 21.5193 25.4675 22.5591 24.8843 23.4214L38.7179 34.1598C39.0277 33.999 39.3796 33.9082 39.7528 33.9082C40.9954 33.9082 42.0028 34.9156 42.0028 36.1582C42.0028 37.4008 40.9954 38.4082 39.7528 38.4082C38.5102 38.4082 37.5028 37.4008 37.5028 36.1582C37.5028 36.0272 37.514 35.8988 37.5355 35.7739L23.4652 24.8516C22.5957 25.4498 21.5423 25.8 20.407 25.8C17.424 25.8 15.0059 23.3823 15.0059 20.4C15.0059 17.7593 16.9018 15.5613 19.407 15.0924L19.407 6H21.407L21.407 15.0924ZM22.2058 20.4C22.2058 21.3941 21.3999 22.2 20.4058 22.2C19.4117 22.2 18.6058 21.3941 18.6058 20.4C18.6058 19.4059 19.4117 18.6 20.4058 18.6C21.3999 18.6 22.2058 19.4059 22.2058 20.4Z" fill="currentColor"/>
          <path d="M27.6302 20.3838C27.6302 17.4693 25.8982 14.9593 23.407 13.8265L23.407 6.10596C27.6959 6.48295 29.9242 7.83422 31.9185 9.68342C32.0193 9.77691 32.1181 9.86765 32.2147 9.95633L32.2157 9.95727C33.0654 10.7376 33.7414 11.3583 34.0904 12.288C35.3931 15.7583 37.2059 20.5837 38.3244 23.5604C38.8157 24.8682 37.8481 26.2613 36.4511 26.2613H34.8187V28.5989L27.2439 22.7165C27.4943 21.9849 27.6302 21.2002 27.6302 20.3838Z" fill="currentColor"/>
          <path d="M17.407 13.8463L17.407 6.24136C8.41785 7.59417 6.00386 14.3005 6.00391 17.9747C6.00398 23.7418 9.68703 28.2157 11.4133 30.008V41.9996H28.5258V35.4877H32.8187C33.1213 35.4877 33.4083 35.4205 33.6654 35.3001L23.0804 27.08C22.2597 27.4051 21.3651 27.5838 20.4287 27.5838C16.4514 27.5838 13.2271 24.3602 13.2271 20.3838C13.2271 17.4862 14.9392 14.9884 17.407 13.8463Z" fill="currentColor"/>
          </svg>

        </div>
        <span class="icon-text">Admisión</span>
      </div>
    </div>
    

    <br>
    <br>
    <br>

    <!-- Feed de datos -->
    <div class="stats-container">
      <div class="stat-card" style="background-color: var(--color-azul); color: var(--primary-color);">
        <div class="text-content">
        <p>Citas disponibles</p>
        <h2>{{ numeroCitasDisponibles }}</h2></div>
        <svg xmlns="http://www.w3.org/2000/svg" height="60px" viewBox="0 -960 960 960" width="60px" fill="var(--primary-color)">
          <path d="M438-226 296-368l58-58 84 84 168-168 58 58-226 226ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z"/>
        </svg>
      </div> 

      <div class="stat-card" style="background-color:var(--primary-color); color: white">
        <div class="text-content">
          <p>Médicos que trabajan hoy</p>
          <h2>{{ numeroMedicos }}</h2></div>
          <svg xmlns="http://www.w3.org/2000/svg" height="60px" viewBox="0 -960 960 960" width="60px" fill="white">
                  <path d="M680-320q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35Zm0-80q17 0 28.5-11.5T720-440q0-17-11.5-28.5T680-480q-17 0-28.5 11.5T640-440q0 17 11.5 28.5T680-400ZM440-40v-116q0-21 10-39.5t28-29.5q32-19 67.5-31.5T618-275l62 75 62-75q37 6 72 18.5t67 31.5q18 11 28.5 29.5T920-156v116H440Zm79-80h123l-54-66q-18 5-35 13t-34 17v36Zm199 0h122v-36q-16-10-33-17.5T772-186l-54 66Zm-76 0Zm76 0Zm-518 0q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v200q-16-20-35-38t-45-24v-138H200v560h166q-3 11-4.5 22t-1.5 22v36H200Zm80-480h280q26-20 57-30t63-10v-40H280v80Zm0 160h200q0-21 4.5-41t12.5-39H280v80Zm0 160h138q11-9 23.5-16t25.5-13v-51H280v80Zm-80 80v-560 137-17 440Zm480-240Z"/>
                </svg>
      </div>

      <!-- Placeholder para las autorizaciones-->
      <div class="stat-card" style="background-color:var(--color-verde); color: var(--primary-color)">
        <div class="text-content">
          <p>Citas programadas para hoy</p>
          <h2>{{ numeroCitas }}</h2></div>
          <svg xmlns="http://www.w3.org/2000/svg" height="60px" viewBox="0 -960 960 960" width="60px" fill="var(--primary-color)">
          <path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm280 240q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z"/>
        </svg>
      </div>
      
      
    </div>
    <br>
    <br>

    <!-- Botones de acceso rápido -->
    <div class="button-container">
      <a href="/pacientes" style="text-decoration: none;">
        <button class="caja-contenido" href="#" >
          <div class="circle">
            <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="white">
              <path d="M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120H760ZM360-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113ZM120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0 320Zm0-400Z"/>
            </svg>
          </div>
          <br>
          <span class="button-text">Pacientes</span>
        </button>
      </a>
  
      <a href="#" style="text-decoration: none; color: inherit;">
        <button class="caja-contenido" href="#">
          <div class="circle">
            <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="white">
              <path d="M336-120q-91 0-153.5-62.5T120-336q0-38 13-74t37-65l142-171-97-194h530l-97 194 142 171q24 29 37 65t13 74q0 91-63 153.5T624-120H336Zm144-200q-33 0-56.5-23.5T400-400q0-33 23.5-56.5T480-480q33 0 56.5 23.5T560-400q0 33-23.5 56.5T480-320Zm-95-360h190l40-80H345l40 80Zm-49 480h288q57 0 96.5-39.5T760-336q0-24-8.5-46.5T728-423L581-600H380L232-424q-15 18-23.5 41t-8.5 47q0 57 39.5 96.5T336-200Z"/>
            </svg>

          </div>
          <br>
          <span class="button-text">Facturación</span>
        </button>
      </a>

      <a href="#" style="text-decoration: none; color: inherit;">
        <button class="caja-contenido" href="#">
          <div class="circle">
            <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="white">
              <path d="M160-120q-33 0-56.5-23.5T80-200v-560q0-33 23.5-56.5T160-840h640q33 0 56.5 23.5T880-760v560q0 33-23.5 56.5T800-120H160Zm0-80h640v-560H160v560Zm40-80h200v-80H200v80Zm382-80 198-198-57-57-141 142-57-57-56 57 113 113Zm-382-80h200v-80H200v80Zm0-160h200v-80H200v80Zm-40 400v-560 560Z"/>
            </svg>
          </div>
          <br>
          <span class="button-text">Autorizaciones</span>
        </button>
      </a>

      <a href="#" style="text-decoration: none; color: inherit;">
        <button class="caja-contenido" href="#">
          <div class="circle">
            <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="white">
              <path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm280 240q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z"/>
            </svg>
          </div>
          <br>
          <span class="button-text">Citas</span>
        </button>
      </a>
    </div>

    <br>
    <br>

    <!-- Banner encuestas -->

    <div class="valora-experiencia-container">
      <div class="grafico">
        <svg class="donut" viewBox="0 0 36 36">
          <circle class="donut-ring" cx="18" cy="18" r="15.915"></circle>
          <circle class="donut-segment green" cx="18" cy="18" r="15.915" stroke-dasharray="50 50"></circle>
          <circle class="donut-segment yellow" cx="18" cy="18" r="15.915" stroke-dasharray="25 75" stroke-dashoffset="-50"></circle>
          <circle class="donut-segment red" cx="18" cy="18" r="15.915" stroke-dasharray="10 90" stroke-dashoffset="-75"></circle>
        </svg>
        <div class="grafico-texto">
          <span class="puntuacion">4.4/5</span>
          <br>
          <span class="descripcion">Satisfacción General con el Departamento de Admisión</span>
        </div>
      </div>
      <h2 class="titulo">Encuestas de satisfacción</h2>
      <button class="btn-encuestas">Ver resultados</button>
    </div>
  
  </div>
  </div>

 </template>  
<script>

import apiClient from '@/apiClient';
import { useAuthStore } from '../../store/auth';
import Header from './Header.vue';

export default {
  name: "InicioAdministracion",
  components: {
    Header
  },
  data() {
    return {
      saludo: '',
      icono: '',
      horaActual: '',
      numeroCitasDisponibles: '-',
      numeroMedicos: '-',
      numeroCitas: '-',
    };
  },
  computed: {
    nombreUsuario() {
      const authStore = useAuthStore();
      return authStore.getUser ? authStore.getUser.nombre : 'Usuario';
    }
  },
  methods: {
    actualizarSaludo() {
      const ahora = new Date();
      const horaCanarias = new Date(ahora.toLocaleString("en-US", { timeZone: "Atlantic/Canary" }));
      const hora = horaCanarias.getHours();

      if (hora >= 6 && hora < 12) {
        this.saludo = "Buenos días";
        this.icono = require('@/assets/icons/buenos_dias.png');
      } else if (hora < 20) {
        this.saludo = "Buenas tardes";
        this.icono = require('@/assets/icons/buenas_tardes.png');
      } else {
        this.saludo = "Buenas noches";
        this.icono = require('@/assets/icons/buenas_noches.png');
      }
    },
    async obtenerDatosUsuarios() {
      try {
        const response = await apiClient.get('/api/usuarios'); // Ajusta la URL según tu API
        const usuarios = response.data;
        console.log('Usuarios:', usuarios);
        console.log('Número de usuarios:', usuarios.length);
        this.numeroUsuarios = usuarios.length;
        this.numeroPacientes = usuarios.filter(usuario => usuario.tipo === 'Paciente').length;
        this.numeroMedicos = usuarios.filter(usuario => usuario.tipo === 'Médico').length;
      } catch (error) {
        console.error('Error al obtener los datos de usuarios:', error);
      }
    },
    async obtenerCitas() {
      try {
        const response = await apiClient.get('/api/citas');
        const citas = response.data;
        // Obtener la fecha actual
        const ahora = new Date();
        const inicioHoy = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate());
        const finHoy = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate() + 1);

        const citasSinPaciente = citas.filter(cita => cita.pacienteId === null);

        // Filtrar citas que ocurren hoy
        const citasHoy = citas.filter(cita => {
          const fechaCita = new Date(cita.fechaHora);
          return fechaCita >= inicioHoy && fechaCita < finHoy;
        });


        // Filtrar citas que tienen un paciente asignado
        const citasConPaciente = citasHoy.filter(cita => cita.pacienteId !== null);
        


        this.numeroCitas = citasConPaciente.length;
        this.numeroCitasDisponibles = citasSinPaciente.length;


        // Contar el número de médicos diferentes
        const medicosUnicos = new Set(citasConPaciente.map(cita => cita.medicoId));

        this.numeroMedicos = medicosUnicos.size;

      } catch (error) {
        console.error('Error al obtener citas:', error);
      }
    },
  },
  mounted() {
    this.actualizarSaludo();
    this.obtenerDatosUsuarios();
    this.obtenerCitas();
    setInterval(() => {
      this.obtenerDatosUsuarios();
    }, 60000); // Actualiza cada 1 minuto
  }
};
  </script>
  <style src="@/assets/styles.css"></style>
  <style scoped>

  
  .departamento-info p {
    margin: 5px 0;
  }
  
  button {
    background: #007bff;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
  }
  
  button:hover {
    background: var(--color-azul);
  }



.estilo-pagina {  
  margin-left: 2rem; 
  margin-right: 2rem;
}


.icono-blanco {
  color: #ffffff; 
}

.saludo {
  display: flex;
  align-items: center;
}

.saludo-icono {
  width: 150px;
  height: 150px;
  margin-right: 10px;
}

.saludo-texto {
  font-size: 45px; /* Ajusta el tamaño de la fuente */
  color: var(--primary-color);
  line-height: 1.2; /* Controla la separación entre líneas  */
}




/* Estilo del círculo */
.circle {
  width: 6rem; /* Tamaño del círculo */
  height: 6rem;
  border-radius: 50%; /* Hace que sea un círculo */
  background-color: var(--primary-color); /* Usa el color definido */
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.5rem;
  margin: 0.5rem;
}




.button-container {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin: 0 auto;
}

.caja-contenido {
  background-color: var(--color-azul2);
  border-radius: 2rem; /* Bordes redondeados */
  width: 15rem; /* Ajusta el ancho */
  height: 15rem; /* Ajusta la altura */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.button-text {
  font-size: 1.4rem;
  color: #162d57; /* Azul oscuro */
  margin: 0 auto;
}

.button p {
  font-size: 18px;
  font-weight: bold;
  color: #162d57; /* Azul oscuro */
  margin: 0;
}

.small-text {
  font-size: 14px;
  margin: 0;
  color: var(--color-azul2);
}

.user-head {
  position: relative;
  align-items: center;
  display: flex;
  margin-left: 2rem;
  justify-content: center;
}

.icon-container {
  display: flex;
  align-items: center;
  gap: 15px; /* Espacio entre el círculo y el texto */
  margin-left: auto;
}

.icon-text {
  font-size: 44px;
  font-weight: 700; /* Aplica el estilo bold */
  color: var(--primary-color); /* Usa la variable CSS */
}

.citas-container {
  margin: 1.5rem auto;
  padding: 1.5rem;
  background-color: white;
  border-radius: 3.5rem;
  border: 0.5rem solid #1c1c5a;
}

.header-citas {
  text-align: left;
  margin-bottom: 20px;
}

.header-ctitle {
  background-color: #1c1c5a;
  color: white;
  font-size: 1.5rem;
  border: none;
  padding: 10px 20px;
  border-radius: 4rem;
  cursor: default;
}

.citas-content {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.cita {
  flex: 1;
  background-color: #f4f9ff;
  border: 1px solid #d2e4fd;
  padding: 15px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.icono {
  width: 40px;
  height: 40px;
  background-color: var(--color-azul2);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.icono::before {
  content: '+';
  color: var(--primary-color);
  font-size: 1.5rem;
  font-weight: bold;
}

.detalles {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.fecha {
  font-weight: bold;
  font-size: 1rem;
}

.especialidad {
  color: var(--primary-color);
  font-size: 1.1rem;
  font-weight: bold;
}
.doctor {
  color: #6b6b6b;
  font-size: 0.9rem;
}

/* Botón Ver Más */
.ver-mas-container {
  text-align: center;
  margin-top: 20px;
}

.ver-mas {
  background-color: #cbe3fd;
  color: #1c1c5a;
  font-size: 1.5rem;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}

.ver-mas:hover {
  background-color: #b0d4fc;
}

.valora-experiencia-container {
  margin: 40px auto;
  padding: 10px;
  background-color: #ffffff;
  border: 0.5rem solid #aadcc6;
  border-radius: 2rem;
  text-align: center;
  position: relative;
}

/* Gráfico */
.grafico {
  position: relative;
  width: 20rem;
  height: 20rem;
  margin: 0 auto;
}

.donut {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.donut-ring {
  fill: none;
  stroke: #f4f4f4;
  stroke-width: 2.8;
}

.donut-segment {
  fill: none;
  stroke-width: 2.8;
}

.green {
  stroke: #aadcc6;
}

.yellow {
  stroke: #fcd77f;
}

.red {
  stroke: #f49797;
}

.grafico-texto {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.puntuacion {
  font-size: 2rem;
  font-weight: bold;
  color: #1c1c5a;
}

.descripcion {
  font-size: 1rem;
  color: #7a7a7a;
  margin-top: 5px;
}

.titulo {
  font-size: 3rem;
  font-weight: bold;
  color: #1c1c5a;
  margin: 0;
}

.btn-encuestas {
  margin: 20px;
  width: 15rem;
  background-color: #1c1c5a;
  color: white;
  font-size: 1.5rem;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}

.btn-encuestas:hover {
  background-color: #14143a;
}

.stats-container {
  display: flex;
  gap: 15px;
  justify-content: space-between; /* Espacio uniforme entre las tarjetas */
  width: 100%; /* Asegúrate de ocupar el ancho completo del contenedor */
}


.stat-card {
  display: flex;
  flex-direction: row; /* Alinear contenido en fila */
  align-items: center;
  justify-content: space-between;
  text-align: left;
  padding: 20px;
  flex: 1; /* Permitir que cada tarjeta crezca para ocupar el espacio disponible */
  min-width: 0; /* Prevenir problemas de desbordamiento */
  border-radius: 8px;
}

.stat-card h2 {
  margin: 0;
  font-weight: 800; /* Aplica el estilo extrabold */
}

.stat-card p,
.stat-card .text-content {
  flex: 1; /* Ocupa el espacio restante */
  font-weight: 300; /* Aplica el estilo light */
}

.stat-card .icon {
  margin-left: 10px; /* Separar el ícono del texto */
  width: 80px;
  height: 80px;
}

</style>
  