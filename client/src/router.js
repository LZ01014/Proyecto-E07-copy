import { createRouter, createWebHistory } from 'vue-router';
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
import InicioGerencia from './components/InicioGerencia.vue';
import PaginaError from './components/PaginaError.vue';
import PaginaInicio from './components/Inicio.vue';
import PaginaEspecialidades from './components/PaginaEspecialidades.vue';
import CreacionUsuarios from './components/CreacionUsuarios.vue';
import GestionDepartamentos from './components/GestionDepartamentos.vue';
import SaludoUsuario from './components/Saludo.vue';
import InicioMedico from './components/InicioMedico.vue';
import PruebasCodigo from './components/PruebasCodigo.vue';
import GestionEncuestas from './components/GestionEncuestas.vue';
import InicioPaciente from './components/InicioPaciente.vue';
import InicioAdmision from './components/InicioAdministracion.vue';
import "@/assets/styles.css";
import PerfilUsuario from './components/PerfilUsuario.vue';

const routes = [
  { path: '/', component: PaginaInicio },
  { path: '/usuarios', component: CreacionUsuarios },
  { path: '/saludo', component: SaludoUsuario },
  { path: '/departamentos', component: GestionDepartamentos },
  { path: '/equipo-medico', component: PaginaEquipoMedico },
  { path: '/login', component: UserLogin },
  { path: '/especialidades', component: PaginaEspecialidades },
  { path: '/register', component: UserRegister },
  { path: '/intranet', component: IntranetLogin },
  { path: '/contacto', component: ContactForm },
  { path: '/prestaciones', component: GestionPrestaciones },
  { path: '/agenda-medico', component: AgendaMedico },
  { path: '/recetas', component: GestionRecetas },
  { path: '/lista_contacto', component: ListaFormContacto },
  { path: '/reservarcitas', component: ReservarCitas },
  { path: '/iniciogerencia', component: InicioGerencia },
  { path: '/iniciomedico', component: InicioMedico },
  { path: '/encuestas', component: GestionEncuestas },  
  { path: '/pruebas', component: PruebasCodigo },
  { path: '/iniciopaciente', component: InicioPaciente },
  { path: '/iniciopaciente/perfil', component: PerfilUsuario },
  { path: '/inicioadministracion', component: InicioAdmision },
  { path: '/:pathMatch(.*)*', component: PaginaError }, // Updated catch-all route
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.matched.some(record => record.meta.requiresAuth) && !token) {
    next('/login');
  } else {
    next();
  }
});

export default router;