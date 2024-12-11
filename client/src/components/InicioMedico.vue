<template>
  <div class="estilo-pagina">
    <header class="header">
      <img src="@/assets/logo.png" alt="Hospital Rambla" class="logo" />
      <div class="vertical-line"></div>
      <h1 class="left-align small-text">INTRANET</h1>

      <div class="reloj">
      <span>{{ horaActual }}</span>
    </div>
    </header>
    <br>
    <br>  
    <br>
    

    <div class="saludo">
      <img :src="icono" alt="Saludo Icono" class="saludo-icono" />
      <span class="saludo-texto">
        {{ saludo }},
        <br />
        <strong>{{ nombreUsuario }}</strong>
      </span>
      
      <div class="icon-container">

      <div class="circle" style="background-color: var(--color-azul2);">

      <svg
        width="70"
        height="70"
        fill="currentColor"
        viewBox="0 0 48 48"
        xmlns="http://www.w3.org/2000/svg"
        class="icon"
        style="color: var(--primary-color)"
      >
      <path d="M16.542 11.991C22.3921 11.9958 21.8536 19.9527 21.8511 23.1357C21.8478 27.198 22.8451 35.3972 19.7112 38.5181C16.5177 41.6984 10.1346 43.2846 6.94587 40.6296C3.75713 37.9745 9.09663 11.9849 16.542 11.991Z" fill="currentColor"/>
      <path d="M31.4826 12.0033C25.6326 11.9985 26.158 19.9563 26.1554 23.1392C26.152 27.2016 25.1413 35.3991 28.27 38.5252C31.4583 41.7107 37.8388 43.3074 41.0319 40.6576C44.2249 38.0077 38.928 12.0094 31.4826 12.0033Z" fill="currentColor"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M23.0175 5.99927C23.0175 5.99927 23.0175 5.99915 24.0175 5.99997C25.0175 6.00079 25.0175 6.00091 25.0175 6.00091L25.0056 20.4938C25.0039 22.5951 24.0675 23.7995 23.0074 24.4169C22.51 24.7066 22.0215 24.847 21.6634 24.9163C21.4824 24.9514 21.3289 24.9694 21.2159 24.9787C21.1592 24.9834 21.1123 24.9859 21.0765 24.9873C21.0587 24.988 21.0436 24.9884 21.0314 24.9886L21.0154 24.9888L21.0091 24.9888L21.0052 24.9888C21.0052 24.9888 21.004 24.9888 21.0048 23.9888C21.0056 22.9888 21.0045 22.9888 21.0045 22.9888H21.0035L21.0016 22.9889L20.9986 22.9889L20.9954 22.9889C20.9954 22.9889 20.9976 22.9889 21.0004 22.9887C21.0086 22.9884 21.0261 22.9876 21.0514 22.9855C21.1024 22.9813 21.1831 22.9722 21.2832 22.9528C21.4872 22.9133 21.7484 22.8357 22.0009 22.6886C22.4404 22.4327 23.0044 21.8892 23.0056 20.4922L23.0175 5.99927Z" fill="currentColor"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M25.0175 6.00091C25.0175 6.00091 25.0175 6.00079 24.0175 5.99997C23.0175 5.99915 23.0175 5.99927 23.0175 5.99927L23.0056 20.4922C23.0039 22.5935 23.9382 23.7994 24.9974 24.4185C25.4943 24.709 25.9825 24.8502 26.3405 24.9201C26.5215 24.9555 26.675 24.9738 26.7879 24.9833C26.8446 24.988 26.8916 24.9906 26.9273 24.9921C26.9452 24.9928 26.9603 24.9932 26.9724 24.9934L26.9884 24.9937L26.9947 24.9937L26.9974 24.9937L26.9986 24.9937C26.9986 24.9937 26.9998 24.9937 27.0006 23.9937C27.0014 22.9937 27.0026 22.9937 27.0026 22.9937L27.0036 22.9937L27.0055 22.9937L27.0085 22.9938L27.0117 22.9938C27.0117 22.9938 27.0107 22.9938 27.0066 22.9936C26.9984 22.9933 26.981 22.9924 26.9557 22.9903C26.9047 22.986 26.824 22.9768 26.724 22.9572C26.52 22.9174 26.2589 22.8393 26.0067 22.6919C25.5676 22.4352 25.0044 21.8908 25.0056 20.4938L25.0175 6.00091Z" fill="currentColor"/>
      </svg>
      </div>
      <span class="icon-text" style="line-height: 1.1; font-weight: 100;">Departamento: <br> <strong style="font-weight: 700;">Neumología </strong></span>
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
      <a href="#" style="text-decoration: none;">
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
</template>
  
  <script>
  import '../assets/styles.css';

  export default {
    name: 'InicioMedico',
    data() {
      return {
        saludo: '',
        icono: '',
        horaActual: '',
        nombreUsuario: localStorage.getItem('usuario') || 'Usuario', // Leer el nombre del usuario desde localStorage
      };
    },
    methods: {
      actualizarSaludo() {
        const ahora = new Date();
        const horaCanarias = new Date(ahora.toLocaleString("en-US", { timeZone: "Atlantic/Canary" }));
        const hora = horaCanarias.getHours();

        if (hora >= 6 && hora < 12) {
          this.saludo = "Buenos días";
          this.icono = require('@/assets/icons/buenos_dias.png');
        } else if (hora >= 13 && hora < 20) {
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
    },
    mounted() {
    this.actualizarSaludo();
    this.actualizarHora();
    setInterval(() => {
      this.actualizarHora();
    }, 1000); // Actualiza la hora cada segundo
  }
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

/* Información sobre tipo de usuario */
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
  