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
            <router-link class="nav-link" to="/usuarios">Usuarios</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/departamentos">Departamentos</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/intranet">Intranet</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/login">Login</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/prestaciones">Prestaciones</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/recetas">Recetas</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/aseguradoras">Aseguradoras</router-link>
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
