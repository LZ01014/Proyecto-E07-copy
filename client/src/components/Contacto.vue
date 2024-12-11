<template>
  <div id="contacto" class="page-container">
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
                <a class="nav-link" href="/">Inicio</a>
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
                <a class="nav-link" aria-current="page" href="#">Contacto</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>

    <!-- Contact Section -->
    <section class="contact-section">
      <div class="contact-info">
        <h1>Contáctanos</h1>
        <p>Puedes comunicarte con nosotros a través del formulario o de los siguientes medios:</p>
        <ul class="contact-details">
          <li><strong>Dirección:</strong> Av. Principal 123, Ciudad, País</li>
          <li><strong>Teléfono:</strong> +123 456 7890</li>
          <li><strong>Email:</strong> contacto@hospitalrambla.com</li>
        </ul>
      </div>

      <!-- Contact Form -->
      <div class="contact-form">
        <form @submit.prevent="enviarFormulario" >
          <div class="mb-3">
            <label for="nombre" class="form-label">Nombre</label>
            <input class="form-control" id="nombre" v-model="nuevoForm.nombre" required>
          </div>
          <div class="mb-3">
            <label for="correo" class="form-label">Correo Electrónico</label>
            <input class="form-control" v-model="nuevoForm.correo" required>
          </div>
          <div class="mb-3">
            <label for="asunto" class="form-label">Asunto</label>
            <input class="form-control" v-model="nuevoForm.asunto" required>
          </div>
          <div class="mb-3">
            <label for="mensaje" class="form-label">Mensaje</label>
            <textarea class="form-control" rows="4" v-model="nuevoForm.mensaje" required></textarea>
          </div>
          <button type="submit" class="btn btn-primary boton-enviar">Enviar Mensaje</button>
        </form>
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
        <router-link to="/" @click.native="scrollToTop">
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
import apiClient from '@/apiClient';

export default {
  name: "ContactForm",
  data() {
    return {
      nuevoForm: {
        nombre: '',
        correo: '',
        asunto: '',
        mensaje: ''
      },
    };
  },
  methods: {
    async enviarFormulario() {
      try {
        await apiClient.post('/api/contact_forms', this.nuevoForm);
        this.resetFormulario();
      } catch (error) {
        console.error('Error al crear formulario de contacto:', error);
      }
    },
    resetFormulario() {
      this.nuevoForm = { nombre: '', correo: '', asunto: '', mensaje: ''};
    }
  }
};
</script>

<style scoped>
/* Asegura que el contenedor principal ocupe toda la altura de la página */
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Asegura que el contenido principal ocupe todo el espacio disponible */
.contact-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; 
  padding: 2rem; 
  background-color: #f9f9f9;
}

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
  background-color: #ffffff;
  border-radius: 50px;
  padding: 4px 4px;
  margin-left: 1rem;
}

.search-bar img.Search-icon {
  width: 15px;
  height: 15px;
  filter: white; 
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
  background-color: #92bdf6; 
  border-radius: 50%; 
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

/* Contact Section */
.contact-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; 
  padding: 2rem; 
  background-color: #f9f9f9;
}

.contact-info {
  text-align: center;
  max-width: 600px;
}

.contact-info h1 {
  font-size: 2rem; 
  color: #17195e;
}

.contact-info p {
  font-size: 1rem; 
  color: #000000;
  margin-bottom: 1rem;
}

.contact-details {
  list-style-type: none;
  padding: 0;
}

.contact-details li {
  font-size: 1rem;
  color: #000000;
  margin-bottom: 0.5rem;
}

/* Formulario de contacto */
.contact-form {
  background-color: white;
  padding: 1rem; 
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
  margin-top: 1rem; 
}

.boton-enviar {
  background-color: #17195e;
  color: white;
  font-weight: bold;
  width: 100%;
}

/* Footer */
.footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between; 
  align-items: center;
  padding: 1.1rem;
  background-color: #17195e;
  margin-top: auto; 
}

.footer-left {
  display: flex; 
  gap: 5rem;
  padding-left: 1rem;
}

.footer-item {
  text-align: left; 
  color: white;
  text-decoration: none;
}

.footer-mid {
  text-align: center; 
}

.footer-right {
  text-align: left; 
  color: white; 
  padding-right: 1rem;
  padding-top: 0.5rem;
  display: flex;
  align-items: center; 
}t

.footer .logo {
  width: 170px; 
  height: auto; 
}

/* Focus-visible para mostrar contorno solo al usar tabulación */
:focus {
  outline: none;
}

:focus-visible {
  outline: 2px solid #92bdf6; 
}
</style>
