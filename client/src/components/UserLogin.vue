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
        <h2 class="form-title">Acceso usuarios</h2>
        <form @submit.prevent="handleLogin">
          <label for="username">Usuario:</label>
          <input type="text" id="username" v-model="username" required />
          
          <label for="password">Contraseña:</label>
          <input type="password" id="password" v-model="password" required />
          
          <a href="/contacto" class="forgot-password">¿Has olvidado tu contraseña?</a>
          
          <button type="submit" class="login-button">Entrar</button>
        </form>
        
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        
        <p class="register-link">
          ¿No eres usuario? <a href="/register">Regístrate</a>
        </p>

        <!-- Enlace para iniciar sesión con Google -->
        <a href="http://localhost:3000/auth/google" class="google-login-button">Iniciar sesión con Google</a>
      </section>
    </main>
  </div>
</template>

<script>
import { useAuthStore } from '../../store/auth';

export default {
  name: 'UserLogin',
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '' 
    };
  },
  methods: {
    async handleLogin() {
      this.errorMessage = ''; 
      const authStore = useAuthStore();
      try {
        await authStore.loginPaciente(this.username, this.password);
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
        if (error.response) {
          if (error.response.status === 401) {
            this.errorMessage = 'Credenciales incorrectas. Por favor, verifica tu nombre de usuario y contraseña.';
          } else if (error.response.status === 400) {
            this.errorMessage = 'Solicitud incorrecta. Por favor, verifica los datos ingresados.';
          } else if (error.response.status === 403) {
            this.errorMessage = 'Acceso denegado. Solo los pacientes pueden iniciar sesión.';
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
  },
  async mounted() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('google')) {
      const authStore = useAuthStore();
      try {
        await authStore.loginWithGoogle();
      } catch (error) {
        console.error('Error al iniciar sesión con Google:', error);
        this.errorMessage = 'Error al iniciar sesión con Google. Por favor, intenta nuevamente.';
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
.login-form input {
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.5rem;
  border-radius: 5px;
  background-color: #c6defd; 
  border-radius: 15px; 
}
.forgot-password {
  margin-top: 1rem;
  font-size: 0.7rem;
  color: #17195e;
  text-decoration: none; 
}
.login-button {
  margin-top: 1rem;
  width: 100%;
  padding: 0.75rem;
  background-color: #17195e;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  border-radius: 30px; 
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

.error-message {
  color: red;
  margin-top: 1rem;
}

.google-login-button {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.75rem;
  background-color: #db4437;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  font-weight: bold;
}
</style>