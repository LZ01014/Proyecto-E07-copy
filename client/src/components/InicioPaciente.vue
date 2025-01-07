<template>
  <div>
    <!-- Importa el header -->
    <Header/>
    <div class="estilo-pagina">
    <br>
    <br>  
    <br>
    
    <!-- Saludo y banner fraudes -->
    <div class="saludo">
      <img :src="icono" alt="Saludo Icono" class="saludo-icono" />
      <span class="saludo-texto">
        {{ saludo }},
        <br />
        <strong>{{ nombreUsuario }}</strong>
      </span>
      <div class="fraud-container">
        <strong style="font-size: 2rem;"> Protégete de los fraudes</strong>
        <br>
        <br>
        <div style="text-align: left;">
          <ul style="line-height: 2rem;">
            <li> Hospital Rambla no utiliza teléfonos de tarificación adicional (803, 806, 807 o 902, 905, 907, 908, 909). </li>
            <li> Desconfía de páginas web que no sean oficiales.</li>
            <li> Para cualquier duda o pregunta contacta a través de nuestros canales de atención al paciente.</li>
          </ul>
        </div>

      </div>
    </div>
    <br>
    <br>
    <br>

    <!-- Banner Próximas citas -->
    <div class="citas-container">
      <div class="header-citas">
        <button class="header-ctitle">Próximas citas</button>
      </div>
      <div class="citas-content">
        <div v-for="cita in proximasCitas" :key="cita._id" class="cita">
          <div class="icono"></div>
          <div class="detalles">
            <span class="fecha">{{ formatearFecha(cita.fechaHora) }} a las {{ formatearHora(cita.fechaHora) }}</span>
            <span class="especialidad">{{ cita.especialidadId.nombre }}</span>
            <span class="especialidad">{{ cita.prestacionId.nombre }}</span>
            <span class="doctor">{{ cita.medicoId.nombre }} {{ cita.medicoId.apellidos }}</span>
          </div>
        </div>
      </div>
      <br>
    </div>

    <br>
    <br>

    <!-- Botones de acceso rápido -->
    <div class="button-container">
      <a href="/citas" style="text-decoration: none;">
        <button class="caja-contenido" href="#" >
          <div class="circle">
            <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="white">
              <path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm280 240q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z"/>
            </svg>
          </div>
          <br>
            <span class="button-text">Gestionar citas</span>
        </button>
      </a>
  
      <a href="/iniciopaciente/recetaspaciente" style="text-decoration: none; color: inherit;">
        <button class="caja-contenido" href="#">
          <div class="circle">
            <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="white">
              <path d="M280-280h84l240-238-86-86-238 238v86Zm352-266 42-44q6-6 6-14t-6-14l-56-56q-6-6-14-6t-14 6l-44 42 86 86ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h168q13-36 43.5-58t68.5-22q38 0 68.5 22t43.5 58h168q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm280-590q13 0 21.5-8.5T510-820q0-13-8.5-21.5T480-850q-13 0-21.5 8.5T450-820q0 13 8.5 21.5T480-790ZM200-200v-560 560Z"/>
            </svg>
          </div>
          <br style="display: block; content: ''; margin-top: 0.2rem;">
          <span class="button-text">Recetas y tratamientos</span>
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

      <a href="/justificantes" style="text-decoration: none; color: inherit;">
        <button class="caja-contenido" href="#">
          <div class="circle">
            <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="white">
              <path d="M200-200h560v-367L567-760H200v560Zm0 80q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h400l240 240v400q0 33-23.5 56.5T760-120H200Zm80-160h400v-80H280v80Zm0-160h400v-80H280v80Zm0-160h280v-80H280v80Zm-80 400v-560 560Z"/>
            </svg>
          </div>
          <br>
          <span class="button-text">Justificantes</span>
        </button>
      </a>
      <a href="/iniciopaciente/informes" style="text-decoration: none; color: inherit;">
        <button class="caja-contenido" href="#">
          <div class="circle">
            <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="white">
              <path d="M200-200h560v-367L567-760H200v560Zm0 80q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h400l240 240v400q0 33-23.5 56.5T760-120H200Zm80-160h400v-80H280v80Zm0-160h400v-80H280v80Zm0-160h280v-80H280v80Zm-80 400v-560 560Z"/>
            </svg>
          </div>
          <br>
          <span class="button-text">Informes</span>
        </button>
      </a>
    </div>

    <br>
    <br>

    <!-- Banner encuestas -->

    <div class="valora-experiencia-container">
      <div class="estrellas">
        <span class="estrella">★</span>
        <span class="estrella">★</span>
        <span class="estrella">★</span>
        <span class="estrella">★</span>
        <span class="estrella">★</span>
      </div>
      <h2 class="titulo">Valora tu experiencia</h2>
      <button class="btn-encuestas">Ver encuestas</button>
    </div>
  </div>
</div>
  </template>
  
  <script>
  import Header from '@/components/Header.vue'; // Ajusta la ruta si es necesario

  import { useAuthStore } from '../../store/auth';
  import apiClient from '@/apiClient';

  export default {
    name: "InicioPaciente",
    components: {
      Header,
    },
    data() {
      return {
        saludo: '',
        icono: '',
        horaActual: '',
        proximasCitas: []
      };
    },
    computed: {
      nombreUsuario() {
        const authStore = useAuthStore();
        return authStore.getUser ? `${authStore.getUser.nombre} ${authStore.getUser.apellidos}` : 'Usuario';
      },
      usuarioId() {
      const authStore = useAuthStore();
      return authStore.getUser ? authStore.getUser._id : null;
      }
    },
    methods: {
      async obtenerProximasCitas() {
        try {
          const response = await apiClient.get('/api/citas', {
            params: { pacienteId: this.usuarioId }
          });
          const citas = response.data;
          const ahora = new Date();
          this.proximasCitas = citas
            .filter(cita => new Date(cita.fechaHora) > ahora)
            .sort((a, b) => new Date(a.fechaHora) - new Date(b.fechaHora))
            .slice(0, 3);
        } catch (error) {
          console.error('Error al obtener las próximas citas:', error);
        }
      },
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
      actualizarHora() {
        const ahora = new Date();
        const horaCanarias = new Date(ahora.toLocaleString("en-US", { timeZone: "Atlantic/Canary" }));
        this.horaActual = horaCanarias.toLocaleTimeString('es-ES', { hour12: false });
      },
      async verificarAutenticacion() {
        const authStore = useAuthStore();
        await authStore.checkAuth();
      },
      handleLogout() {
      const authStore = useAuthStore();
      authStore.logout();
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
      }
    },
    async mounted() {
      await this.verificarAutenticacion();
      this.actualizarSaludo();
      this.actualizarHora();
      this.obtenerProximasCitas(); // Llamar a la función para obtener las próximas citas
      setInterval(() => {
        this.actualizarHora();
      }, 1000); // Actualiza la hora cada segundo
    }
  };
</script>

<style src="@/assets/styles.css"></style>
<style scoped>


.departamento-info p {
  margin: 5px 0;
}


  
button:hover {
  background: var(--color-azul);
}

button {
  background: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
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

.fraud-container {
  background-color: #e7c2d4;
  border-radius: 2.5rem; /* Bordes redondeados */
  width: 52rem; /* Ajusta el ancho */
  height: 15rem; /* Ajusta la altura */
  position: relative;
  margin: 0 auto;
  margin-right: 0;
  text-align: center;
  justify-content: center;
  line-height: 1.2;
  padding: 2rem;
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

.estrellas {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 20px;
}

.estrella {
  font-size: 3rem;
  color: #aadcc6;
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

</style>
  