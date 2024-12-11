<template>
  <div id="inicio">
    <!-- Header (Navegación y Logo) -->
    <header class="header" role="banner">
      <nav class="navbar navbar-expand-lg" aria-label="Main Navigation">
        <div class="container-fluid">
          <!-- Logotipo -->
          <a class="navbar-brand" href="#">
            <img :src="require('@/assets/logo.png')" alt="Hospital Rambla Logo" class="logo">
          </a>

          <div class="vertical-line" aria-hidden="true"></div>
          
          <!-- Barra de búsqueda -->
          <div class="search">
            <div class="search-bar">
              <button class="icon-container" aria-label="Buscar">
                <img :src="require('@/assets/icons/Search-icon.png')" alt="Buscar" class="Search-icon">
              </button>
              <input type="text" v-model="search" placeholder="Buscar..." class="search-input" aria-label="Buscar"/>
            </div>
          </div>

          <!-- Botón para colapsar menú en pantallas pequeñas -->
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          
          <!-- Menú de navegación -->
          <div class="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link" aria-current="page" href="#">Inicio</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/client/src/components/PaginaEnDesarrollo.vue">Especialidades</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/client/src/components/PaginaEnDesarrollo.vue">Equipo Médico</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/client/src/components/PaginaEnDesarrollo.vue">Eventos</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/contacto">Contacto</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  
    <!-- Hero Section (Sección principal) -->
    <section class="hero" role="region" aria-labelledby="hero-heading">
      <div class="hero-content">
        <h1 id="hero-heading" tabindex="0">Especialistas <br>en cuidarte</h1>
        <p class="uppercase-text" tabindex="0">Cuidando tu salud con tecnología <br>de vanguardia y atención personalizada</p>
      </div>
      <img :src="require('@/assets/general/Fundacion.png')" alt="Fundación" class="hero-image" tabindex="0">
      <div class="boton-contenedor">
        <button class="btn btn-primary boton-principal" type="button" @click="redirectToLogin">Portal del paciente</button>
        <button class="btn btn-circular" type="button" @click="redirectToLogin" aria-label="Portal del paciente"> 
          <img :src="require('@/assets/icons/icono_flecha.png')" alt="Flecha" class="arrow-icon">
        </button>
      </div>
    </section>
  
    <!-- Services Section (Unidad de medicina interna y Urgencias) -->
    <section class="services" role="region" aria-labelledby="services-heading">
      <h2 id="services-heading" class="visually-hidden">Servicios</h2>
      <div class="service-card service-card1">
        <div class="service-content">
          <h3 tabindex="0">Unidad de <br>medicina interna</h3>
          <p tabindex="0">Atención médico integral y especializado para la prevención, diagnóstico y tratamiento de enfermedades complejas en adultos, con un enfoque en el cuidado personalizado y el seguimiento continuo de la salud del paciente.</p>
        </div>
        <img :src="require('@/assets/general/medicina_interna_consulta.png')" alt="Imagen de medicina interna" class="service-image" tabindex="0">
      </div>
      <div class="service-card service-card2">
        <div class="service-content">
          <h3 tabindex="0">Servicio de Urgencias <br>médicas 24/7</h3>
          <p tabindex="0">Atención inmediata y profesional disponible las 24 horas del día, todos los días del año, para responder a emergencias médicas con rapidez y cuidado especializado.</p>
        </div>
        <img :src="require('@/assets/general/urgencias2.png')" alt="Imagen de urgencias médicas" class="service-image" tabindex="0">
      </div>
    </section>
  
    <!-- Insurers Section (Aseguradoras) -->
    <section class="insurers" role="region" aria-labelledby="insurers-heading">
      <h2 id="insurers-heading" tabindex="0">Trabajamos con las mejores aseguradoras</h2>
      <div class="image-container">
        <img :src="require('@/assets/aseguradoras/logo-adeslas.png')" alt="Adeslas" class="same-width-img" tabindex="0">
        <img :src="require('@/assets/aseguradoras/logo-sanitas.png')" alt="Sanitas" class="same-width-img" tabindex="0">
        <img :src="require('@/assets/aseguradoras/logo-dkv.svg')" alt="DKV" class="same-width-img" tabindex="0">
        <img :src="require('@/assets/aseguradoras/logo-asisa.png')" alt="Asisa" class="same-width-img" tabindex="0">
        <img :src="require('@/assets/aseguradoras/logo-mapfre.svg')" alt="Mapfre" class="same-width-img" tabindex="0">
        <img :src="require('@/assets/aseguradoras/logo-caser.webp')" alt="Caser" class="same-width-img" tabindex="0">
      </div>
    </section>
  
    <!-- Personal Health Section (Área personal de salud) -->
    <section class="personal-health" role="region" aria-labelledby="personal-health-heading">
      <h2 id="personal-health-heading" tabindex="0">Área personal de salud</h2>
      <p tabindex="0">Accede a cualquier hora del día para cuidar tu salud. En el Portal del Paciente tienes tu espacio personal privado y seguro en el que puedes solicitar y gestionar tus citas o consultar tus informes clínicos.</p>
      <div class="d-grid gap-2 d-md-block">
        <router-link to="/register" class="btn btn-primary" color="white" type="button"> Regístrate ahora</router-link>
      </div>
    </section>
  
    <!-- Footer (Pie de página) -->
    <footer class="footer" role="contentinfo">
      <div class="footer-left">
        <router-link to="/login" class="footer-item">Portal del paciente</router-link>
        <router-link to="/intranet" class="footer-item">Intranet</router-link>
        <router-link to="/contacto" class="footer-item">Contacto</router-link>
      </div>
      <div class="footer-mid">
        <router-link to="/" @click.native="scrollToTop" tabindex="0">
          <img :src="require('@/assets/icons/logo-inv.png')" alt="Logo" class="logo">
        </router-link>
      </div>
      <div class="footer-right">
        <p tabindex="0">Somos un centro hospitalario comprometido en ofrecerte atención <br>sanitaria de primer nivel, con dedicación y calidad humana.</p>
      </div>
    </footer>
  </div>
</template>
  
<script>
import { useAuthStore } from '../../store/auth';

export default {
  name: 'PaginaInicio',
  data() {
    return {
      search: ''
    };
  },
  methods: {
    redirectToLogin() {
      const authStore = useAuthStore(); 
      if (authStore.isAuthenticated) {
        this.$router.push('/iniciopaciente'); 
      } else {
        this.$router.push('/login'); 
      }
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  },
};
</script>

<style scoped>

/* Estilos para el header */
.header {
  width: calc(100% - 4rem); 
  background-color: #e1e1e1;
  padding: 0.5rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  border-radius: 15px; 
  margin-left: 2rem; 
  margin-right: 2rem; 
}

.header img.logo {
  width: 120px;
  height: auto; 
}

.vertical-line {
  width: 2px;
  height: 25px;
  background-color: #cfcfcf; 
}

/* Barra de búsqueda */

.search {
  background-color: #e1e1e1;
}

.search-bar {
  display: flex;
  align-items: center;
  background-color: #ffffff; /* Mismo color que el header */
  border-radius: 50px;
  padding: 4px 4px;
  margin-left: 1rem;
}

.search-bar img.Search-icon {
  width: 15px;
  height: 15px;
  filter: white; /* Hace que la imagen sea blanca */
}

.search-bar input {
  border: none;
  outline: none;
  width: 200px;
  margin-left: 10px;
  background-color: #ffffff; 
}

.icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  background-color: #92bdf6; /* Color azul */
  border-radius: 50%; /* Hace que el contenedor sea un círculo */
  font-weight: bold;
}

.icon-container img.Search-icon {
  width: 15px;
  height: 15px;
}

/* Estilos para el navbar y container-fluid */
.navbar, .container-fluid {
  background-color: #e1e1e1; 
  display: flex;
  align-items: center;
}

.navbar-nav {
  margin-left: 58rem; 
}

.nav-item {
  margin-left: 15px; 
}

.nav-link {
  color: #17195e;
  text-decoration: none; 
}

.nav-link:hover {
  color: #92bdf6;
}

/* Hero Section */
.hero {
  background-color: #17195e;
  padding: 6rem 4rem; 
  text-align: center;
  margin-top: 1rem;
  border-radius: 15px; 
  margin-left: 2rem; 
  margin-right: 2rem; 
  position: relative; 
  min-height: 600px; 
}

.hero-content {
  position: relative; 
  text-align: left;
  margin-left: 3rem;
}

.hero-content h1 {
  font-size: 9rem;
  font-weight: bold;
  color: #92bdf6;
}

.uppercase-text {
  text-transform: uppercase;
}

.hero-content p {
  font-size: 1.25rem;
  margin-top: 1rem;
  margin-bottom: 2rem;
}

.hero-image {
  width: 50%; 
  max-width: 500px; 
  position: absolute; 
  bottom: 0;
  left: 60%; 
  z-index: 0;
}

.boton-contenedor {
  display: flex;
  align-items: center;
  position: absolute; 
  bottom: 50px; 
  right: 150px; 
  z-index: 1;
}

.boton-principal {
  background-color: #ffffff;
  color: #17195e;
  border: none;
  font-weight: bold;
  border-radius: 50px; 
  padding: 15px 40px; 
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s, color 0.3s; 
}

.btn-circular {
  background-color: #ffffff;
  color: #17195e;
  border: none;
  border-radius: 50%; 
  width: 53px;
  height: 53px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px; 
  transition: background-color 0.3s, color 0.3s; 
  filter: #17195e;
}

.arrow-icon {
  width: 20px;
  height: 20px;
  filter: invert(24%) sepia(100%) saturate(7473%) hue-rotate(202deg) brightness(50%) contrast(101%); 
}

.boton-contenedor:hover .boton-principal,
.boton-contenedor:hover .btn-circular {
  background-color: #92bdf6;
  color: #17195e;
}

/* Services Section */
.services {
  display: flex;
  justify-content: space-around;
  margin: 1rem 1rem;
  gap: 1rem;
}

.service-card {
  background-color: #f9f9f9;
  border-radius: 15px;
  padding: 2rem;
  width: 100%;
  margin-top: 1rem;
  position: relative; 
  min-height: 600px; 
  overflow: hidden; 
  display: flex;
  align-items: flex-start; /* Alinea el contenido al inicio del contenedor */
}

.service-card1 {
  background-color: #a3dac2;
  margin-left: -1rem; 
  margin-right: 0.5rem; 
}

.service-card2 {
  background-color: #e7c2d4;
  margin-left: 0.5rem; 
  margin-right: -1rem; 
}

.service-content {
  z-index: 1; 
  flex: 1; /* Permite que el contenido ocupe el espacio disponible */
  padding-right: 20px; /* Añade un padding derecho para separar el texto de la imagen */
  margin-bottom: auto; /* Empuja el contenido hacia la parte superior */
}

.service-image {
  flex-shrink: 0; /* Evita que la imagen se reduzca */
  width: 50%; /* Ajusta el ancho de la imagen según sea necesario */
  height: 100%; /* Mantiene la proporción de la imagen */
  object-fit: cover; /* Asegura que la imagen cubra el contenedor */
  border-top-right-radius: 15px; /* Ajusta el border-radius para que coincida con el del contenedor */
  border-bottom-right-radius: 15px; /* Ajusta el border-radius para que coincida con el del contenedor */
}

.text-aseguradoras h2 {
  text-align: center;
  margin-top: 1rem;
  color: #17195e;
  font-weight: bold; 
}

.image-container {
  background-color: #e1e1e1;
  margin-left: 1rem; 
  margin-right: 2rem;
  margin-top: 2rem;
  border-radius: 15px; 
  display: flex;             
  justify-content: center;  
  align-items: center;       
  gap: 160px;                 
  padding: 20px;                   
  width: calc(100% - 2rem);                
}

.same-width-img {
  width: 170px;             
  height: auto;              
}

.footer {
  display: flex;
  flex-wrap: wrap; /* Permite que los elementos se ajusten en varias filas */
  justify-content: space-between; /* Alinea los elementos a los extremos */
  align-items: center; /* Alinea los elementos verticalmente */
  padding: 1.1rem;
  background-color: #17195e; /* Color de fondo del pie de página */
}

.footer-left {
  display: flex; /* Alinea el texto a la izquierda */
  gap: 5rem;
  padding-left: 1rem;
}

.footer-item {
  text-align: left; /* Alinea el texto a la izquierda */
  color: white; /* Color del texto */
  text-decoration: none;
}

.footer-mid {
  text-align: center; /* Alinea el logo al centro */
}

.footer-right {
  text-align: left; /* Alinea el texto a la derecha */
  color: white; /* Color del texto */
  padding-right: 1rem;
  padding-top: 0.5rem;
  display: flex;
  align-items: center; /* Alinea el texto verticalmente al centro */
}

.footer .logo {
  width: 170px; /* Ajusta el tamaño del logo según sea necesario */
  height: auto; /* Mantiene la proporción del logo */
}

/* Focus-visible para mostrar contorno solo al usar tabulación */

:focus {
  outline: 2px solid #92bdf6; /* Color del contorno al enfocar con tabulación */
}
</style>