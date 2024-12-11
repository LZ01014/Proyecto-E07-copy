<template>
  <div class="login-page">
    <header class="header">
      <img src="@/assets/logo.png" alt="Hospital Rambla" class="logo" />
      <div class="vertical-line"></div>
      <h1 class="left-align small-text">PORTAL<br>DEL PACIENTE</h1>
    </header>
    
    <main class="content">
      <section class="welcome-section">
        <div class="welcome-container">
          <h2>Bienvenido/a al <br>Portal del Paciente</h2>
          <p class="welcome-text">Para poder acceder al portal y a los servicios online<br> es necesario que se identifique mediante su nombre<br> de usuario y contraseña</p>
        </div>
        <ul>
          <li>Solicitud y consulta de cita online.</li>
          <li>Solicitud de justificantes de asistencia online.</li>
          <li>Consulta de resultados de pruebas diagnósticas.</li>
        </ul>
      </section>
      
      <section class="login-form">
        <h2 class="form-title">Registro usuarios</h2>
        <form @submit.prevent="handleRegister">
          <label for="nombre">Nombre:</label>
          <input type="text" id="nombre" v-model="nuevoUsuario.nombre" required />
          
          <label for="apellidos">Apellidos:</label>
          <input type="text" id="apellidos" v-model="nuevoUsuario.apellidos" required />
          
          <label for="username">Usuario:</label>
          <input type="text" id="username" v-model="nuevoUsuario.username" />
          
          <label for="password">Contraseña:</label>
          <input type="password" id="password" v-model="nuevoUsuario.password" required />
          
          <label for="fechaNacimiento">Fecha de Nacimiento:</label>
          <input type="date" id="fechaNacimiento" v-model="nuevoUsuario.fechaNacimiento" />
          
          <label for="genero">Género:
            <select id="genero" v-model="nuevoUsuario.genero" required>
              <option value="" disabled selected>Seleccione género</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
            </select>
          </label>

          <br>
          
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="nuevoUsuario.email" />

          <button type="submit" class="login-button">Registrar</button>
        </form>
        
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </section>
    </main>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UserRegister',
  data() {
    return {
      nuevoUsuario: {
        nombre: '',
        apellidos: '',
        username: '',
        password: '',
        tipo: 'Paciente', 
        fechaNacimiento: '',
        genero: '',
        email: ''
      },
      errorMessage: '',
      menu: false,
    };
  },
  methods: {
    selectGenero(genero) {
      this.nuevoUsuario.genero = genero;
      this.menu = false;
    },
    async handleRegister() {
      this.errorMessage = ''; 
      try {
        await axios.post(`${process.env.VUE_APP_BACKEND_URL}/api/register`, this.nuevoUsuario);
        this.$router.push('/login');
      } catch (error) {
        console.error('Error al registrar usuario:', error);
        if (error.response) {
          if (error.response.status === 400) {
            this.errorMessage = 'Solicitud incorrecta. Por favor, verifica los datos ingresados.';
          } else {
            this.errorMessage = 'Error del servidor. Por favor, intenta nuevamente más tarde.';
          }
        } else if (error.request) {
          this.errorMessage = 'No se pudo conectar con el servidor. Por favor, verifica tu conexión a internet.';
        } else {
          this.errorMessage = 'Error al configurar la solicitud. Por favor, intenta nuevamente.';
        }
      }
    }
  }
};
</script>

<style scoped>
.login-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Outfit', sans-serif;
}
.header {
  width: calc(100% - 4rem); 
  background-color: #e1e1e1;
  padding: 1rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border-radius: 15px; 
  margin-left: 2rem; 
  margin-right: 2rem; 
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
.content {
  display: flex;
  justify-content: space-around;
  width: 100%;
  max-width: 1200px;
  padding: 2rem;
}
.welcome-section {
  width: 50%;
}
.welcome-container {
  max-width: 100%;
}
.welcome-container h2 {
  font-size: 45px;
  color: #17195e;
  font-weight: bold;
}
.welcome-text {
  margin-top: 1rem;
  color: #17195e;
}
.welcome-section ul {
  margin-top: 1rem;
  color: #17195e;
}
.login-form {
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center; 
}
.login-form .form-title {
  text-align: center; 
  font-size: 25px;
  font-weight: bold;
  width: 100%;
  color: #17195e;
}
.login-form label {
  margin-top: 1rem;
  align-self: flex-start; 
}
.login-form input, .login-form select {
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.5rem;
  border-radius: 15px;
  background-color: #c6defd; 
  box-sizing: border-box; /* Asegura que el padding y el borde se incluyan en el ancho total */
}
.login-form select {
  -webkit-appearance: none; /* Eliminar la apariencia predeterminada de los navegadores */
  -moz-appearance: none; /* Eliminar la apariencia predeterminada de los navegadores */
  appearance: none; /* Eliminar la apariencia predeterminada de los navegadores */
}
.forgot-password {
  margin-top: 1rem;
  font-size: 0.7rem;
  color: #17195e;
  text-decoration: none; 
}
.login-button {
  margin-top: 2rem;
  width: 100%;
  padding: 0.75rem;
  background-color: #17195e;
  color: #fff;
  border: none;
  border-radius: 30px; 
  cursor: pointer;
}
.register-link {
  margin-top: 0.7rem;
  font-size: 0.9rem;
}
.register-link a {
  color: #000000;
  text-decoration: none;
  font-weight: bold;
}
/* Estilo para el mensaje de error */
.error-message {
  color: red;
  margin-top: 1rem;
}
</style>