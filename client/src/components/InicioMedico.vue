<template>
  <div>
  
    <Header/>
    <div class="estilo-pagina">
    <br>
    <br>  
    <br>
    

    <div class="saludo">
      <img :src="icono" alt="Saludo Icono" class="saludo-icono" />
      <span class="saludo-texto">
        {{ saludo }},
        <br />
        <strong>{{ this.usuario.nombre }}</strong>
      </span>
      
      <div class="icon-container">

      <div class="circle" style="background-color: var(--color-azul2);">

        <svg xmlns="http://www.w3.org/2000/svg" height="50px" viewBox="0 -960 960 960" width="50px" fill="var(--primary-color)">
          <path d="M540-80q-108 0-184-76t-76-184v-23q-86-14-143-80.5T80-600v-240h120v-40h80v160h-80v-40h-40v160q0 66 47 113t113 47q66 0 113-47t47-113v-160h-40v40h-80v-160h80v40h120v240q0 90-57 156.5T360-363v23q0 75 52.5 127.5T540-160q75 0 127.5-52.5T720-340v-67q-35-12-57.5-43T640-520q0-50 35-85t85-35q50 0 85 35t35 85q0 39-22.5 70T800-407v67q0 108-76 184T540-80Zm220-400q17 0 28.5-11.5T800-520q0-17-11.5-28.5T760-560q-17 0-28.5 11.5T720-520q0 17 11.5 28.5T760-480Zm0-40Z"/>
        </svg>
      </div>
      <span class="icon-text" style="line-height: 1.1; font-weight: 100;">Departamento: <br> <strong style="font-weight: 700;"><span> {{ this.departamento }} </span> </strong></span>
    </div>
    </div>
    <br>
    <br>

  <div class="citas-container">
    <div class="header-ctitle" style="font-weight: 500;">Agenda</div>
    <div class="contenido">
    <img 
      src="https://thumbs.dreamstime.com/b/concepto-de-calendario-iu-gui-para-aplicaciones-m%C3%B3viles-y-web-estilo-widget-blanco-moderno-ilustraci%C3%B3n-vectorial-211271368.jpg" 
      alt="Calendario" 
      style="max-width: 20%; max-height: 20%; object-fit: contain; align-self: center;"
    />
    </div>
  </div>
  <br>
  <br>

  <!-- Botones de acceso rápido -->
  <div class="button-container">
      <a href="/agenda" style="text-decoration: none;">
        <button class="caja-contenido" href="#" >
          <div class="circle">

            <svg
              width="60"
              height="60"
              viewBox="0 -960 960 960"
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
            >
            <path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm280 240q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z"/>
            </svg>
          </div>
          <br>
          <span class="button-text">Agenda</span>
        </button>
      </a>
  
      <a href="/recetasmedico" style="text-decoration: none; color: inherit;">
        <button class="caja-contenido" href="#">
          <div class="circle">
            <svg
              width="60"
              height="60"
              viewBox="0 -960 960 960"
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
            >
            <path d="M280-280h84l240-238-86-86-238 238v86Zm352-266 42-44q6-6 6-14t-6-14l-56-56q-6-6-14-6t-14 6l-44 42 86 86ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h168q13-36 43.5-58t68.5-22q38 0 68.5 22t43.5 58h168q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm280-590q13 0 21.5-8.5T510-820q0-13-8.5-21.5T480-850q-13 0-21.5 8.5T450-820q0 13 8.5 21.5T480-790ZM200-200v-560 560Z"/>

            </svg>
          </div>
          <br>
          <span class="button-text">Recetas</span>
        </button>
      </a>

      <a href="#" style="text-decoration: none; color: inherit;">
        <button class="caja-contenido" href="#">
          <div class="circle">
            <svg
              width="60"
              height="60"
              viewBox="0 -960 960 960"
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
            >
            <path d="M160-120q-33 0-56.5-23.5T80-200v-560q0-33 23.5-56.5T160-840h640q33 0 56.5 23.5T880-760v560q0 33-23.5 56.5T800-120H160Zm0-80h640v-560H160v560Zm40-80h200v-80H200v80Zm382-80 198-198-57-57-141 142-57-57-56 57 113 113Zm-382-80h200v-80H200v80Zm0-160h200v-80H200v80Zm-40 400v-560 560Z"/>

            </svg>
          </div>
          <br>
          <span class="button-text">Autorizaciones</span>
        </button>
      </a>

      <a href="/iniciomedico/informes" style="text-decoration: none; color: inherit;">
        <button class="caja-contenido" href="#">
          <div class="circle">
            <svg
              width="60"
              height="60"
              viewBox="0 -960 960 960"
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
            >
            <path d="M320-240h320v-80H320v80Zm0-160h320v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z"/>

            </svg>
          </div>
          <br>
          <span class="button-text">Informes</span>
        </button>
      </a>
    </div>

  <br>
  <br>

  <div class="valora-experiencia-container">
      <div class="grafico">
        <svg class="donut" viewBox="0 0 36 36">
          <circle class="donut-ring" cx="18" cy="18" r="15.915"></circle>
          <circle class="donut-segment green" cx="18" cy="18" r="15.915" stroke-dasharray="50 50"></circle>
          <circle class="donut-segment yellow" cx="18" cy="18" r="15.915" stroke-dasharray="25 75" stroke-dashoffset="-50"></circle>
          <circle class="donut-segment red" cx="18" cy="18" r="15.915" stroke-dasharray="10 90" stroke-dashoffset="-75"></circle>
        </svg>
        <div class="grafico-texto" style="line-height: 1.1;">
          <span class="puntuacion"> <strong>3.7</strong>/5</span>
          <br>
          <span class="descripcion">Satisfacción general</span>
        </div>
      </div>
      <div style="line-height: 1.1; text-align: left;">
        <h2 class="titulo">Encuestas <br> de <strong>satisfacción</strong></h2>
        <button class="btn-encuestas">Ver resultados</button>
      </div>
      
    </div>
    
    </div>
  </div>
</template>
  
  <script>
  import { useAuthStore } from '../../store/auth';
  import '../assets/styles.css';
  import apiClient from '@/apiClient';
  import Header from './Header.vue';

  export default {
    name: 'InicioMedico',
    components: {
      Header,
    },
    data() {
      return {
        saludo: '',
        icono: '',
        departamento: '',
        usuario: '',
        horaActual: '',
      };
    },
    methods: {
      async datosUsuario() {
        const authStore = useAuthStore();
        await authStore.checkAuth();
        this.usuario = authStore.getUser ? authStore.getUser : 'Usuario';
      },
      async obtenerDepartamento() {
        if (this.usuario && this.usuario.departamento) {
          try {
            const response = await apiClient.get(`/api/departamentos/${this.usuario.departamento}`);
            if (response.status === 200) {
              this.departamento = response.data.nombre;
            } else {
              console.error('Error al obtener el departamento:', response);
            }
          } catch (error) {
            console.error('.Error al obtener el departamento:', error);
          }
        } else {
          console.error('No se ha encontrado el departamento del usuario');
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
      }
    },
    async mounted() {
    await this.datosUsuario();
    await this.obtenerDepartamento();
    this.actualizarSaludo();
    this.actualizarHora();
    setInterval(() => {
      this.actualizarHora();
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
  .mt-5 {
    margin-top: 2rem;
  }

  /* Saludo al usuario (buenos días, tardes, noches...) */
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

/* Reloj */
.reloj {
  font-size: 24px;
  font-weight: bold;
  margin-left: auto;
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

.icon-text {
  font-size: 44px;
  font-weight: 700; /* Aplica el estilo bold */
  color: var(--primary-color); /* Usa la variable CSS */
}

.citas-container {
  position: relative; /* Para que el elemento hijo .etiqueta pueda posicionarse relativo a este */
  border: 0.5rem solid var(--primary-color); /* Color del borde */
  border-radius: 3.5rem; /* Bordes redondeados */
  width: 100%; /* Ajusta el ancho según sea necesario */
  margin: 20px auto; /* Centra el contenedor */
}


.header-citas {
  text-align: left;
  margin-bottom: 20px;
}

.header-ctitle {
  position: absolute; /* Permite que se coloque sobre el borde */
  top: -26px; /* Ajusta para que sobresalga del borde superior */
  left: 50px; /* Ajusta la distancia al borde izquierdo */
  background-color: var(--primary-color); /* Fondo azul */
  color: #fff; /* Color del texto */
  padding: 5px 50px; /* Espaciado interno */
  border-radius: 30px; /* Bordes redondeados */
  font-size: 24px; /* Tamaño del texto */
  font-weight: bold; /* Negrita */
}


.contenido {
  display: flex; /* Activa Flexbox */
  justify-content: center; /* Centra horizontalmente */
  align-items: center; /* Centra verticalmente */
  height: 100%; /* Asegúrate de que ocupe todo el espacio disponible */
}


/* Estilo del gráfico */
.valora-experiencia-container {
  margin: 40px auto;
  padding: 50px;
  background-color: #ffffff;
  border: 0.5rem solid #aadcc6;
  border-radius: 2rem;
  display: flex; /* Activa Flexbox */
  justify-content: center; /* Centra horizontalmente */
  align-items: center; /* Centra verticalmente */
  text-align: center;
  gap: 40px; /* Aumenta la distancia entre la gráfica y el texto */

}



/* Gráfico */
.grafico {
  position: relative;
  width: 20rem;
  height: 20rem;
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
  font-size: 4rem;
  font-weight: light;
  color: var(--primary-color);
}

.descripcion {
  font-size: 1rem;
  color: #7a7a7a;
  margin-top: 5px;
}

.titulo {
  margin: 20px 0 10px 0; /* Reduce margen inferior del título */
  font-size: 3.2rem;
  font-weight: normal;
  color: var(--primary-color);
}

.btn-encuestas {
  margin: 10px 0; /* Reduce margen superior del botón */
  width: 13rem;
  background-color: #1c1c5a;
  color: white;
  font-size: 1.0rem;
  padding: 10px 20px;
  border: none;
  border-radius: 30px;
  cursor: pointer;
}

.btn-encuestas:hover {
  color: var(--primary-color);
  background-color: var(--color-azul2);
}


/* Botones de acceso rápido */
.icon-container {
  display: flex;
  align-items: center;
  gap: 10px; /* Espacio entre el círculo y el texto */
  margin-left: auto;
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

/* Estilo del texto */
.icon-text {
  font-size: 44px;
  font-weight: 700; /* Aplica el estilo bold */
  color: var(--primary-color); /* Usa la variable CSS */
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

.button p {
  font-size: 18px;
  font-weight: bold;
  color: #162d57; /* Azul oscuro */
  margin: 0;
}


.button-text {
  font-size: 1.4rem;
  color: #162d57; /* Azul oscuro */
  margin: 0 auto;
}


button:hover {
  background: var(--color-azul);
}


</style>
  