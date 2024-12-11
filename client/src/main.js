import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import "@/assets/styles.css";

// Importar Vuetify
import { createVuetify } from 'vuetify';
import 'vuetify/styles'; // Importar estilos de Vuetify
import * as components from 'vuetify/components'; // Importar componentes de Vuetify
import * as directives from 'vuetify/directives'; // Importar directivas de Vuetify

// Importar Bootstrap y sus estilos
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css';

// Importar BootstrapVueNext
import BootstrapVueNext from 'bootstrap-vue-next';


// Crear instancia de Vuetify
const vuetify = createVuetify({
  components, // Registrar componentes de Vuetify
  directives,
});



// Crear la aplicación Vue
const app = createApp(App);

// Usar BootstrapVueNext
app.use(BootstrapVueNext);



// Configuración de Pinia
const pinia = createPinia();
app.use(pinia);

// Registrar el filtro global
app.config.globalProperties.$filters = {
  formatDate(value) {
    if (!value) return '';
    const date = new Date(value);
    const day = String(date.getDate()).padStart(2, '0'); // Día con 2 dígitos
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Mes con 2 dígitos
    const year = date.getFullYear(); // Año
    return `${day}/${month}/${year}`;
  }
};

// Usar Vuetify
app.use(vuetify);

// Usar Router y montar la app
app.use(router).mount('#app');
