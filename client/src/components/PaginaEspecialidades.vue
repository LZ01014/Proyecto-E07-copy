
<template>
  <div class="especialidades">
    <header class="header">
        <nav class="navbar navbar-expand-lg">
          <div class="container-fluid" >
            <!-- Logotipo -->
            <a class="navbar-brand" href="/">
              <img :src="require('@/assets/logo.png')" alt="Logo" class="logo">
            </a>
            
            <!-- Botón para colapsar menú en pantallas pequeñas -->
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            
            <!-- Menú de navegación -->
            <div class="collapse navbar-collapse" id="navbarNavDropdown" style="font-size: x-large;">
              
              <ul class="navbar-nav">
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="/" style="color: #17195e;">Inicio</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/especialidades" style="color: #17195e;">Especialidades</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/equipo-medico" style="color: #17195e;">Equipo Médico</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#" style="color: #17195e;">Eventos</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#" style="color: #17195e;">Contacto</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
  
      <section class="banner-principal">
        <span class="letra-banner">Especialidades</span>
      </section>
      
      <section class="search-bar">
        <div class="search-icon">
            <img :src="require('@/assets/icons/Search-icon.png')" alt="Search-icon" class="Search-icon">
        </div>
        <div class="buscar">
          <input type="text" v-model="search" placeholder="Buscar..."/>
        </div>
      </section>
  
  
      <section class="sections" >

        <div class="big-buttons" v-for="departamento in departamentosFiltro" :key="departamento._id">
          <button class="big-button-blue" v-if="departamento.index % 2 !== 0">
            <img src="@/assets/estados/departamento_defecto.png" alt="consultas_externas" class="img-section">
            <span class="buttons-text-esp" >{{ departamento.nombre }}</span>
          </button>

          <button class="big-button-green" v-if="departamento.index % 2 === 0">
            <img src="@/assets/estados/departamento_defecto.png" alt="urgencias" class="img-section">
            <span class="buttons-text-esp">{{ departamento.nombre }}</span>
          </button>
        </div>

      </section>

    <!-- Footer (Pie de página) -->
    <footer class="footer">
        <p>Portal del paciente | Intranet | Contacto</p>
        <p>Hospital Rambla - Comprometidos en ofrecer atención sanitaria de primer nivel, con dedicación y calidad humana.</p>
    </footer>


  </div>
</template>

<style src="@/assets/styles.css"></style>

<script>
import apiClient from '@/apiClient';
export default {
  name: 'PaginaEspecialidades',
  data() {
    return {
      search: '',
      departamentos: [],
      filtroTipo: "Especialidad médica",
      index: [],
      cargando: false,
      errorServidor: false
    };
  },
  computed: {
    departamentosID() {
      if (this.filtroTipo) {
        return this.departamentos.filter(departamento => departamento.tipo === this.filtroTipo);
      }
      return this.departamentos;
    },
    departamentosFiltro() {
      if (this.search.trim() === '') {
        return this.departamentosID;
      }
      return this.departamentosID.filter(departamento => 
        departamento.nombre.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(this.search.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''))
      );
    }
  },

  methods: {
    async obtenerDepartamentos() {
      this.cargando = true;
      this.errorServidor = false;
      try {
        const response = await apiClient.get('/api/departamentos');
        this.departamentos = response.data;
      } catch (error) {
        this.errorServidor = true;
      } finally {
        this.cargando = false;
      }
    }
  },
  watch: {
    departamentosID(newDepartamentos) {
      newDepartamentos.forEach((departamento, index) => {
        departamento.index = index + 1;
      });
    }
  },
  
  mounted() {
      this.obtenerDepartamentos();
      this.intervalId = setInterval(() => {
          this.obtenerDepartamentos();
      }, 10000); // Cada 10 segundos
  },
};
</script>
  