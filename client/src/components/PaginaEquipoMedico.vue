
<template>
    <div class="equipo_medico">
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
        <span class="letra-chica">Contamos con el mejor</span>
        <span class="letra-banner">Equipo médico</span>
      </section>
      
      <section class="search-bar">
        <div class="search-icon">
            <img :src="require('@/assets/icons/Search-icon.png')" alt="Search-icon" class="Search-icon">
        </div>
        <div class="buscar">
          <input type="text" v-model="search" placeholder="Buscar..."/>
        </div>
      </section>
  
  
      <section class="sections">

        <div class="big-buttons" v-for="usuario in usuariosFiltro" :key="usuario._id">
          <button class="big-button-blue" v-if="usuario.index % 2 !== 0">
            <img src="@/assets/estados/perfil_defecto.png" alt="consultas_externas" class="img-section">
            <div v-if="usuario.genero === 'Masculino'">
              <span class="buttons-text-eq-med-dep"> {{ getDepartamentoName(usuario.departamento) }}</span>
              <br>
              <span class="buttons-text-eq-med" > Dr. {{ usuario.nombre }} {{ usuario.apellidos }}</span>
            </div>
            <div v-if="usuario.genero !== 'Masculino'">
              <span class="buttons-text-eq-med-dep"> {{ getDepartamentoName(usuario.departamento) }}</span>
              <br>
              <span class="buttons-text-eq-med" > Dra. {{ usuario.nombre }} {{ usuario.apellidos }}</span>
            </div>
          </button>

          <button class="big-button-green" v-if="usuario.index % 2 === 0">
            <img src="@/assets/estados/perfil_defecto.png" alt="consultas_externas" class="img-section">
            <div v-if="usuario.genero === 'Masculino'">
              <span class="buttons-text-eq-med-dep"> {{ getDepartamentoName(usuario.departamento) }}</span>
              <br>
              <span class="buttons-text-eq-med" > Dr. {{ usuario.nombre }} {{ usuario.apellidos }}</span>
            </div>
            <div v-if="usuario.genero !== 'Masculino'">
              <span class="buttons-text-eq-med-dep"> {{ getDepartamentoName(usuario.departamento) }}</span>
              <br>
              <span class="buttons-text-eq-med" > Dra. {{ usuario.nombre }} {{ usuario.apellidos }}</span>
            </div>
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
    name: "PaginaEquipoMedico",
    data() {
      return {
        search: '',
        usuarios: [],
        departamentos: [],
        index: [],
        cargando: false,
        errorServidor: false,
        filtroTipo: "Médico"
      };
    },
    computed: {
      usuariosID() {
        if (this.filtroTipo) {
          return this.usuarios.filter(usuario => usuario.tipo === this.filtroTipo);
        }
        return this.usuarios;
      },
      
      usuariosFiltro() {
        if (this.search.trim() === '') {
          return this.usuariosID;
        }
        return this.usuariosID.filter(usuario => 
          usuario.nombre.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(this.search.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''))
        );
      },
      
    },

    methods: {
      async obtenerUsuarios() {
        this.cargando = true;
        this.errorServidor = false;
        try {
          const response = await apiClient.get('/api/usuarios');
          this.usuarios = response.data;
        } catch (error) {
          this.errorServidor = true;
        } finally {
          this.cargando = false;
        }
      },
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
      },
      getDepartamentoName(departamentoId) {
        const departamento = this.departamentos.find(dep => dep._id === departamentoId);
        return departamento ? departamento.nombre : 'Unknown';
      }
    },
      
    
    mounted() {
        this.obtenerUsuarios();
        this.obtenerDepartamentos();
        this.intervalId = setInterval(() => {
            this.obtenerUsuarios();
        }, 10000); // Cada 10 segundos
    },

    watch: {
      usuariosID(newUsuarios) {
        newUsuarios.forEach((usuario, index) => {
          usuario.index = index + 1;
        });
      }
    },
  };
  </script>
    
    
  