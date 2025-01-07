import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../store/auth';
import PaginaEquipoMedico from './components/PaginaEquipoMedico.vue';
import UserLogin from './components/UserLogin.vue';
import UserRegister from './components/UserRegister.vue';
import IntranetLogin from './components/IntranetLogin.vue';
import ContactForm from './components/Contacto.vue';
import GestionPrestaciones from './components/GestionPrestaciones.vue';
import AgendaMedico from './components/AgendaMedico.vue';
import GestionRecetas from './components/GestionRecetas.vue';
import ListaFormContacto from './components/ListaFormContacto.vue';
import ReservarCitas from './components/ReservarCitas.vue';
import PaginaError from './components/PaginaError.vue';
import PaginaInicio from './components/Inicio.vue';
import PaginaEspecialidades from './components/PaginaEspecialidades.vue';
import CreacionUsuarios from './components/CreacionUsuarios.vue';
import GestionDepartamentos from './components/GestionDepartamentos.vue';
import SaludoUsuario from './components/Saludo.vue';
import PruebasCodigo from './components/PruebasCodigo.vue';
import GestionEncuestas from './components/GestionEncuestas.vue';
import '@/assets/styles.css';
import PerfilUsuario from './components/PerfilUsuario.vue';
import RecetasPaciente from './components/Recetas.vue';
import RecetasMedico from './components/RecetasMedico.vue';
import GestionAseguradoras from './components/GestionAseguradoras.vue';
import InicioWrapper from './components/InicioWrapper.vue';
import JustificantesPaciente from './components/JustificantesPaciente.vue';
import InformesMedico from './components/InformesMedico.vue';
import GestionPacientesAdmin from './components/GestionPacientesAdmin.vue';
import CitasWrapper from './components/CitasWrapper.vue';
import InformesPaciente from './components/InformesPaciente.vue';

const routes = [
  { path: '/', component: PaginaInicio },
  { path: '/usuarios', component: CreacionUsuarios},
  { path: '/saludo', component: SaludoUsuario},
  { path: '/departamentos', component: GestionDepartamentos},
  { path: '/prestaciones', component: GestionPrestaciones},
  
  { path: '/recetas', component: GestionRecetas},
  
  { path: '/lista_contacto', component: ListaFormContacto},
  { path: '/reservarcitas', component: ReservarCitas},
  { path: '/encuestas', component: GestionEncuestas},
  { path: '/pruebas', component: PruebasCodigo },


  { path: '/equipo-medico', component: PaginaEquipoMedico},
  { path: '/especialidades', component: PaginaEspecialidades },
  { path: '/contacto', component: ContactForm },

  { path: '/login', component: UserLogin },
  { path: '/intranet', component: IntranetLogin },

  { path: '/register', component: UserRegister },

  { path: '/agenda', component: AgendaMedico, meta: { requiresAuth: true, allowedRoles: ['Médico'] }},

  { path: '/recetasmedico', component: RecetasMedico, meta: { requiresAuth: true, allowedRoles: ['Médico'] } },
  { path: '/recetaspaciente', component: RecetasPaciente, meta: { requiresAuth: true, allowedRoles: ['Paciente'] } },
  { path: '/pacientes', component: GestionPacientesAdmin, meta: { requiresAuth: true, allowedRoles: ['Administración'] } },

  { path: '/perfil', component: PerfilUsuario, meta: { requiresAuth: true } },


  { path: '/aseguradoras', component: GestionAseguradoras, meta: { requiresAuth: true, allowedRoles: ['Gerencia'] } },
  { path: '/inicio', component: InicioWrapper, meta: { requiresAuth: true } },

  { path: '/citas', component: CitasWrapper, meta: { requiresAuth: true, allowedRoles: ['Paciente', 'Administración'] } },
  { path: '/:pathMatch(.*)*', component: PaginaError }, // Página de error 404

  
  { path: '/prestaciones', component: GestionPrestaciones },
  { path: '/recetas', component: GestionRecetas },
  { path: '/lista_contacto', component: ListaFormContacto },
  
  { path: '/iniciomedico/informes', component: InformesMedico },
  { path: '/iniciopaciente/informes', component: InformesPaciente },
    
  { path: '/encuestas', component: GestionEncuestas },  
  { path: '/pruebas', component: PruebasCodigo },
  { path: '/iniciopaciente/perfil', component: PerfilUsuario },
  { path: '/iniciopaciente/recetaspaciente', component: RecetasPaciente },
  { path: '/justificantes', component: JustificantesPaciente },

  { path: '/:pathMatch(.*)*', component: PaginaError }, 
];


const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Guardia global para verificar autenticación y permisos
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  // Verificar autenticación
  if (!authStore.isAuthenticated) {
    await authStore.checkAuth();
  }

  // Rutas que requieren autenticación
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login'); // Redirige al login si no está autenticado
  } else if ((to.path === '/login' || to.path === '/intranet') && authStore.isAuthenticated) {  
    // Evitar que usuarios autenticados accedan al login
    next('/inicio');
  } else if (to.meta.allowedRoles && !to.meta.allowedRoles.includes(authStore.user?.tipo)) {
    next('/inicio');
  } else {
    next(); // Permite la navegación
  }
});
export default router;