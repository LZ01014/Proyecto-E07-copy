import { defineStore } from 'pinia';
import axios from 'axios';
import router from '@/router'; 

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
  }),
  actions: {
    async loginPaciente(username, password) {
      try {
        const response = await axios.post(`${process.env.VUE_APP_BACKEND_URL}/api/login`, {
          username,
          password
        }, {
          withCredentials: true 
        });
        const { usuario } = response.data;
        this.user = usuario;

        if (usuario.tipo === 'Paciente') {
          router.push('/inicioPaciente');
        } else {
          this.logout();
          const error = new Error('Acceso denegado. Solo los pacientes pueden iniciar sesión.');
          error.response = { status: 403 };
          throw error;
        }
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
        throw error;
      }
    },
    async loginIntranet(username, password) {
      try {
        const response = await axios.post(`${process.env.VUE_APP_BACKEND_URL}/api/login`, {
          username,
          password
        }, {
          withCredentials: true 
        });
        const { usuario } = response.data;
        this.user = usuario;

        if (usuario.tipo === 'Médico') {
          router.push('/inicioMedico');
        } else if (usuario.tipo === 'Administración') {
          router.push('/inicioadministracion');
        } else if (usuario.tipo === 'Gerencia') {
          router.push('/iniciogerencia');
        } else {      
          this.logout();
          const error = new Error('Acceso denegado. Solo los médicos o administradores pueden iniciar sesión.');
          error.response = { status: 403 };
          throw error;
        }
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
        throw error;
      }
    },
    async loginWithGoogle() {
      try {
        const response = await axios.get(`${process.env.VUE_APP_BACKEND_URL}/auth/google/success`, {
          withCredentials: true
        });
        const { usuario } = response.data;
        this.user = usuario;

        if (usuario.tipo === 'Paciente') {
          router.push('/inicioPaciente');
        } else {
          this.logout();
          const error = new Error('Acceso denegado. Solo los pacientes pueden iniciar sesión.');
          error.response = { status: 403 };
          throw error;
        }
      } catch (error) {
        console.error('Error al iniciar sesión con Google:', error);
        throw error;
      }
    },
    async logout() {
      const userType = this.user ? this.user.tipo : null;
      this.user = null;
      try {
        await axios.post(`${process.env.VUE_APP_BACKEND_URL}/api/logout`, {}, {
          withCredentials: true
        });

        const currentRoute = router.currentRoute.value.path;
        if (currentRoute === '/login') {
          router.push('/login');
        } else if (currentRoute === '/intranet') {
          router.push('/intranet');
        } else {
          if (userType === 'Paciente') {
            router.push('/login');
          } else if (userType === 'Médico' || userType === 'Administración') {
            router.push('/intranet');
          }
        }
      } catch (error) {
        console.error('Error al cerrar sesión:', error);
      }
    },
    async checkAuth() {
      try {
        const response = await axios.get(`${process.env.VUE_APP_BACKEND_URL}/api/check-auth`, {
          withCredentials: true
        });
        this.user = response.data.user;
      } catch (error) {
        this.user = null;
      }
    }
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
    getUser: (state) => state.user,
  }
});