<template>
  <div id="app" data-app>
    <!-- Barra de navegación -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="#">Funcionalidades:</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Inicio</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/especialidades">Especialidades</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/equipo-medico">Equipo Medico</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/usuarios">Usuarios</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/departamentos">Departamentos</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/agenda-medico">Agenda Médico</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/login">Login</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/saludo">Saludo</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/prestaciones">Prestaciones</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/recetas">Recetas</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/lista_contacto">Lista contacto</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/reservarcitas">Reservar Citas</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/iniciogerencia">Gerencia (Inicio)</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/iniciomedico">Médico (Inicio)</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/encuestas">Encuestas</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/iniciopaciente">Paciente (Inicio)</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/inicioadministracion">Admision (Inicio)</router-link>
          </li>
        </ul>
      </div>
    </nav>

    <!-- Contenedor para mostrar las rutas -->
    <router-view />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import "@/assets/styles.css";


export default defineComponent({
  name: 'App',
});
</script>
