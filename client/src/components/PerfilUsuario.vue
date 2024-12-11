<template>
  <div class="estilo-pagina">
    <header class="header">
      <img src="@/assets/logo.png" alt="Hospital Rambla" class="logo" />
      <div class="vertical-line"></div>
      <h1 class="left-align small-text">PORTAL DEL PACIENTE</h1>

      <div class="button-container">
        <button type="button" class="logout-button" @click="handleLogout">Cerrar sesión</button>
      </div>
    </header>
    <br>
    <br>  
    <br>

    <!-- Datos Personales -->
    <div class="datos-personales">
      <div class="header-datos">
        <button class="header-ctitle">Datos personales</button>
      </div>
      <div class="datos-content">
        <div class="detalle">
          <span class="label">Nombre:</span>
          <span class="valor">{{ usuario.nombre }}</span>
        </div>
        <div class="detalle">
          <span class="label">Apellidos:</span>
          <span class="valor">{{ usuario.apellidos }}</span>
        </div>
        <div class="detalle">
          <span class="label">Fecha de Nacimiento:</span>
          <span class="valor">{{ usuario.fechaNacimiento | formatDate }}</span>
        </div>
        <div class="detalle">
          <span class="label">DNI:</span>
          <span class="valor">{{ usuario.dni }}</span>
        </div>
        <div class="detalle">
          <span class="label">Sexo:</span>
          <span class="valor">{{ usuario.genero }}</span>
        </div>
        <div class="detalle">
          <span class="label">Dirección:</span>
          <span class="valor">{{ usuario.direccion }}</span>
        </div>
        <div class="detalle">
          <span class="label">Teléfono:</span>
          <span class="valor">{{ usuario.telefono }}</span>
        </div>
        <div class="detalle">
          <span class="label">Correo Electrónico:</span>
          <span class="valor">{{ usuario.email }}</span>
        </div>
      </div>
    </div>

    <!-- Seguro Médico -->
    <div class="seguro-medico">
      <div class="header-datos">
        <button class="header-ctitle">Seguro Médico</button>
      </div>
      <div class="datos-content">
        <div class="detalle">
          <span class="label">Compañía de Seguro:</span>
          <span class="valor">{{ usuario.companiaSeguro }}</span>
        </div>
        <div class="detalle">
          <span class="label">Número de Póliza:</span>
          <span class="valor">{{ usuario.numeroPoliza }}</span>
        </div>
      </div>
    </div>

    <!-- Antecedentes -->
    <div class="antecedentes">
      <div class="header-datos">
        <button class="header-ctitle">Antecedentes</button>
      </div>
      <div class="datos-content">
        <div class="detalle">
          <span class="label">Enfermedades Crónicas:</span>
          <span class="valor">{{ usuario.enfermedadesCronicas }}</span>
        </div>
        <div class="detalle">
          <span class="label">Enfermedades Pasadas:</span>
          <span class="valor">{{ usuario.enfermedadesPasadas }}</span>
        </div>
        <div class="detalle">
          <span class="label">Intervenciones Quirúrgicas:</span>
          <span class="valor">{{ usuario.intervencionesQuirurgicas }}</span>
        </div>
        <div class="detalle">
          <span class="label">Alergias a Medicamentos:</span>
          <span class="valor">{{ usuario.alergiasMedicamentos }}</span>
        </div>
        <div class="detalle">
          <span class="label">Alergias a Alimentos o Sustancias:</span>
          <span class="valor">{{ usuario.alergiasAlimentos }}</span>
        </div>
        <div class="detalle">
          <span class="label">Enfermedades Familiares:</span>
          <span class="valor">{{ usuario.enfermedadesFamiliares }}</span>
        </div>
      </div>
    </div>

    <br>
    <br>
  </div>
</template>

<script>
import { useAuthStore } from '../../store/auth';

export default {
  name: "PerfilUsuario",
  computed: {
    usuario() {
      const authStore = useAuthStore();
      return authStore.getUser || {};
    }
  },
  methods: {
    handleLogout() {
      const authStore = useAuthStore();
      authStore.logout();
    }
  }
};
</script>

<style src="@/assets/styles.css"></style>
<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: #e1e1e1;
  border-radius: 15px;
}

.header img.logo {
  width: 200px;
  height: auto;
}

.vertical-line {
  width: 4px;
  height: 70px;
  background-color: #92bdf6;
}

.header h1.left-align {
  text-align: left;
  margin-left: 10px;
}

.header h1.small-text {
  font-size: 24px;
}

.button-container {
  margin-left: auto;
}

.logout-button {
  background-color: #92bdf6;
  color: rgb(0, 0, 0);
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}

.logout-button:hover {
  background-color: #1c1c5a;
  color: white;
}

.datos-personales, .seguro-medico, .antecedentes {
  margin: 1.5rem auto;
  padding: 1.5rem;
  background-color: white;
  border-radius: 3.5rem;
  border: 0.5rem solid #1c1c5a;
}

.header-datos {
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

.datos-content {
  display: flex;
  flex-direction: column;
  gap: 5px; /* Reducir el espacio entre los elementos */
}

.detalle {
  display: flex;
  align-items: center; /* Alinear verticalmente los elementos */
  padding: 0.5em; /* Reducir el padding */
}

.label {
  font-weight: bold;
  margin-right: 0.5em; /* Espacio entre la etiqueta y el valor */
}

.valor {
  color: #555;
}
</style>