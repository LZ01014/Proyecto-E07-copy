<template>
    <div>
      <div v-if="loading">Cargando...</div>
      <div v-else>
        <InicioPaciente v-if="userType === 'Paciente'" />
        <InicioMedico v-if="userType === 'Médico'" />
        <InicioAdministracion v-if="userType === 'Administración'" />
        <InicioGerencia v-if="userType === 'Gerencia'" />
        <div v-if="userType === 'Desconocido'">
          Tipo de usuario no reconocido
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { useAuthStore } from '../../store/auth';
  import InicioPaciente from './InicioPaciente.vue';
  import InicioMedico from './InicioMedico.vue';
  import InicioAdministracion from './InicioAdministracion.vue';
  import InicioGerencia from './InicioGerencia.vue';
  
  export default {
    data() {
      return {
        userType: null, // Tipo de usuario
        loading: true,  // Indicador de carga mientras se determina el tipo
      };
    },
    components: {
      InicioPaciente,
      InicioMedico,
      InicioAdministracion,
      InicioGerencia,
    },
    async created() {
      const authStore = useAuthStore();
  
      if (authStore.isAuthenticated) {
        console.log('Usuario autenticado:', authStore.getUser);
        const tipo = authStore.getUser ? authStore.getUser.tipo : null;
        if (['Paciente', 'Médico', 'Administración', 'Gerencia'].includes(tipo)) {
          this.userType = tipo;
        } else {
          this.userType = 'Desconocido';
          setTimeout(() => {
            this.$router.push('/login');
          }, 30000); // Redirige a /login después de 30 segundos
        }
        this.loading = false; // Se indica que terminó de cargar
      } else {
        console.log('Usuario no autenticado');
        // Redirige a la página anterior o al login como respaldo
        if (window.history.length > 1) {
          this.$router.go(-1);
        } else {
          this.$router.push('/login');
        }
      }
    }
  };
  </script>
  
  <style scoped>
  </style>