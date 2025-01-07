<template>
    <div>
      <Header/>
      <div class="estilo-pagina">
      <br>
      <div class="barra-fecha" >
        <span>{{ fechaHora }}</span>
      
        <div class="icon-container">
          {{ departamento.nombre }}
          <div class="circle" style="background-color: var(--color-azul2); width: 2rem; height: 2rem;">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="var(--primary-color)">
                <path d="M480-340q33 0 56.5-23.5T560-420q0-33-23.5-56.5T480-500q-33 0-56.5 23.5T400-420q0 33 23.5 56.5T480-340ZM160-120q-33 0-56.5-23.5T80-200v-440q0-33 23.5-56.5T160-720h160v-80q0-33 23.5-56.5T400-880h160q33 0 56.5 23.5T640-800v80h160q33 0 56.5 23.5T880-640v440q0 33-23.5 56.5T800-120H160Zm0-80h640v-440H160v440Zm240-520h160v-80H400v80ZM160-200v-440 440Z"/>
            </svg></div>
          
        </div>
      </div>
  
      <br>  
  
    <div class="contenedor-principal">
      
  
      <!-- Columna izquierda: Formulario de creación de citas médicas -->
      <div class="columna-formulario">
        <div class="alinear-elementos">
            <div class="circle">
              <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="var(--primary-color)">
                <path d="M720-400v-120H600v-80h120v-120h80v120h120v80H800v120h-80Zm-360-80q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm80-80h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0-80Zm0 400Z"/>
              </svg>
            </div>
            <h2 style="color: var(--primary-color);">Crear nuevo paciente</h2>
          </div>
          
        <div style="display: flex; justify-content: center;">
          <div style="display: flex; justify-content: center; align-items: center; background-color: var(--color-azul2); border-radius: 10px; padding: 10px; width: 120px; height: 120px;">
            <img v-if="fotoPreview" :src="fotoPreview" alt="Previsualización de Foto de Perfil" class="foto-preview"/>
            <svg v-else xmlns="http://www.w3.org/2000/svg" height="70px" viewBox="0 -960 960 960" width="70px" fill="var(--primary-color)">
              <path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z"/>
            </svg>
          </div>
        </div>
        <br>

        <!-- Formulario para crear un paciente -->
      <form @submit.prevent="crearPaciente">
        

        <label>Nombre:<br>
          <input
            type="text"
            v-model="nuevoPaciente.nombre"
            required
            pattern="^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$"
            @input="validateNombre"
            @blur="validateRequired($event, 'El nombre solo puede contener letras.')"
            @invalid="setCustomMessage($event, 'El nombre solo puede contener letras.')"
          />
        </label> <br>
        <label>Apellidos:<br>
          <input
            type="text"
            v-model="nuevoPaciente.apellidos"
            required
            pattern="^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$"
            @input="validateApellidos"
            @blur="validateRequired($event, 'Los apellidos solo pueden contener letras.')"
            @invalid="setCustomMessage($event, 'Los apellidos solo pueden contener letras.')"
          />
        </label><br>

        <label>Contraseña:<br>
          <input
            type="password"
            v-model="nuevoPaciente.password"
            required
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$"
            @input="handlePasswordChange"
            @blur="validateRequired($event, 'Debe tener al menos 6 caracteres, incluyendo 1 mayúscula, 1 minúscula y 1 número.')"
            @invalid="setCustomMessage($event, 'Debe tener al menos 6 caracteres, incluyendo 1 mayúscula, 1 minúscula y 1 número.')"
          />
        </label><br>

        <!-- Campos opcionales -->
        <label>DNI:<br>
          <input
            type="text"
            v-model="nuevoPaciente.dni"
            pattern="^\d{8}[A-Za-z]$"
            @input="validateDni"
            @blur="validateDni"
            @invalid="setCustomMessage($event, 'El DNI debe tener 8 números seguidos de una letra.')"
          />
        </label><br>
        <label>Fecha de Nacimiento:<br>
          <input type="date" v-model="nuevoPaciente.fechaNacimiento" />
        </label><br>
        <label>Género:<br>
          <select v-model="nuevoPaciente.genero" required>
            <option value="" disabled selected>Seleccione género</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
          </select>
        </label><br>
        <label>Dirección:<br>
          <input type="text" v-model="nuevoPaciente.direccion" />
        </label><br>
        <label>Teléfono:<br>
          <input
            type="text"
            v-model="nuevoPaciente.telefono"
            pattern="^\d{9}$"
            @input="validateTelefono"
            @blur="validateRequired($event, 'El teléfono debe contener exactamente 9 dígitos.')"
            @invalid="setCustomMessage($event, 'El teléfono debe contener exactamente 9 dígitos.')"
          />
        </label><br>
        <label>Correo Electrónico:<br>
          <input type="email" v-model="nuevoPaciente.email"/>
        </label>
        <br><br>

        <button class="boton-crear" type="submit" v-if="!editarUsuarioId">
          Crear paciente
        </button>
        <button class="boton-crear" type="button" v-if="editarUsuarioId" @click="actualizarPaciente">
          Guardar Cambios
        </button>
        <button class="boton-crear" style="background-color: var(--color-rojo);" type="button" v-if="editarUsuarioId" @click="cancelarEdicion">
          Cancelar
        </button>
      </form>
      <br>
      <br>
      <br>
      <br>
      </div>
  
      <!-- Columna derecha: Listado de citas -->
      <div class="columna-citas">
        <div class="alinear-elementos">
         
         <div class="circle">
            <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="var(--primary-color)">
                <path d="M440-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm0-80q33 0 56.5-23.5T520-640q0-33-23.5-56.5T440-720q-33 0-56.5 23.5T360-640q0 33 23.5 56.5T440-560ZM884-20 756-148q-21 12-45 20t-51 8q-75 0-127.5-52.5T480-300q0-75 52.5-127.5T660-480q75 0 127.5 52.5T840-300q0 27-8 51t-20 45L940-76l-56 56ZM660-200q42 0 71-29t29-71q0-42-29-71t-71-29q-42 0-71 29t-29 71q0 42 29 71t71 29Zm-540 40v-111q0-34 17-63t47-44q51-26 115-44t142-18q-12 18-20.5 38.5T407-359q-60 5-107 20.5T221-306q-10 5-15.5 14.5T200-271v31h207q5 22 13.5 42t20.5 38H120Zm320-480Zm-33 400Z"/>
            </svg>
         </div>
         <h2 style="color: var(--primary-color);">Listado de pacientes</h2>
       </div>
       
        <!-- Campo de búsqueda -->
        <input type="text" v-model="searchQuery" id="searchQuery" placeholder="Buscar" class="buscador" style="::placeholder { color: var(--primary-color); }" />
  
  
        <!-- Mensaje de error de comunicación -->
        <v-alert v-if="errorServidor" type="error" class="alerta-error" prominent color="red lighten-3">
          <span class="alert-text">Fallo de comunicación con el servidor</span>
        </v-alert>
  
        <div v-if="cargando && !errorServidor" class="text-center">
          <v-progress-circular :size="70" :width="7" color="#17195e" indeterminate></v-progress-circular>
        </div>
  
        <div v-if="!cargando && !errorServidor && pacientes.length === 0" class="texto-centrado">
          <p>No existen pacientes</p>
        </div>
  
        <!-- Tabla de citas -->
        <table v-if="!cargando && !errorServidor && pacientes.length > 0" class="citas-table">
  
          <thead>
            <tr>
              <th></th>
              <th>Nombre</th>
              <th>Username</th>
              <th>DNI</th>
              <th>Fecha de nacimiento</th>
              <th>Género</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="paciente in filtrarPacientes" :key="paciente._id">
              <td class="citas-actions">

                <!-- Modificar Paciente -->
                <button class="boton-crear" style="background-color: #e7c9b2; padding: 5px 25px;" @click="cargarPaciente(paciente)">
                  <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="var(--primary-color)">
                    <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
                  </svg>


                </button>

                <!-- Eliminar Paciente -->
                <button class="boton-crear" style="background-color: var(--color-rojo); padding: 5px 25px;" @click="confirmarEliminacion(paciente._id, paciente.nombre)">
                  <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="var(--primary-color)">
                    <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                  </svg>
                  
                </button>
              </td>
              <td>{{ paciente.nombre }} {{ paciente.apellidos }}</td>
              <td>{{ paciente.username }}</td>
              <td>{{ paciente.dni }}</td>
              <td>{{ formatearFecha(paciente.fechaNacimiento) }}</td>
              <td>{{ paciente.genero }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    </div>
</div>
  </template>
  
  <script>
  import apiClient from '@/apiClient';
  import { useAuthStore } from '../../store/auth';
  import Header from './Header.vue';
  
  export default {
    name: "GestionPacientesAdmin",
    components: {
      Header,
    },
    data() {
      return {
        fechaHora: '',
        pacientes: [], // Lista de pacientes
        departamento: {}, // Datos del departamento del usuario
        searchQuery: '', // Campo de búsqueda
        paciente: {}, // Datos del paciente seleccionado
        nuevoPaciente: {
            nombre: '',
            apellidos: '',
            username: '',
            password: '',
            tipo: '',
            dni: '',
            fechaNacimiento: '',
            genero: '',
            direccion: '',
            telefono: '',
            email: '',
            foto: ''
        },
        cargando: false,
        errorServidor: false,
        fotoPreview: '',
        passwordChanged: false, // Nueva propiedad para rastrear cambios en la contraseña
      };
    },
    computed: {


      filtrarPacientes() {
      const busqueda = this.searchQuery?.toLowerCase() || ''; // Asegurar que sea una cadena en minúsculas
      return this.pacientes.filter(paciente => {
        const nombre = paciente?.nombre?.toLowerCase() || ''; // Asegurar que 'nombre' sea string
        const apellidos = paciente?.apellidos?.toLowerCase() || ''; // Asegurar que 'apellidos' sea string
        const dni = paciente?.dni?.toLowerCase() || ''; // Asegurar que 'dni' sea string
        const username = paciente?.username?.toLowerCase() || ''; // Asegurar que 'dni' sea string

        // Verifica si alguno de los campos incluye la búsqueda
        return (
          nombre.includes(busqueda) ||
          apellidos.includes(busqueda) ||
          dni.includes(busqueda) ||
          username.includes(busqueda)
        );
      });
    }



      
    },
    methods: {

      async datosUsuario() {
        const authStore = useAuthStore();
        const usuario = authStore.getUser ? authStore.getUser : 'Usuario';
        const departamento = usuario.departamento;
        const departamentoResponse = await apiClient.get(`/api/departamentos/${departamento}`);
        this.departamento = departamentoResponse.data;
      },
      obtenerFechaHoraCanarias() {
        const opcionesFecha = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const opcionesHora = { hour: '2-digit', minute: '2-digit', hour12: false };
    
        // Obtener la hora de Canarias (GMT+0)
        const ahora = new Date();
        const horaCanarias = new Date(ahora.toLocaleString("en-US", { timeZone: "Atlantic/Canary" }));
  
        // Formatear la fecha y la hora
        const fechaFormateada = horaCanarias.toLocaleDateString('es-ES', opcionesFecha);
        const horaFormateada = horaCanarias.toLocaleTimeString('es-ES', opcionesHora).replace(':', '.');
  
        return `${fechaFormateada}, ${horaFormateada} h`;
      },

      async obtenerPacientes() {
        try {
          const response = await apiClient.get('/api/usuarios/pacientes');
          this.pacientes = response.data;
          this.cargando = false;
        } catch (error) {
          console.error('Error al obtener pacientes:', error);
          this.errorServidor = true;
          this.cargando = false;
        }
      },

      async crearPaciente() {
        try {
          const response = await apiClient.post('/api/pacientes', this.nuevoPaciente);
          this.pacientes.push(response.data);
          this.obtenerPacientes();
          this.resetFormulario();
        } catch (error) {
          console.error('Error al crear paciente:', error);
        }
      },


    resetFormulario() {
        this.nuevoPaciente = {
            nombre: '',
            apellidos: '',
            username: '',
            password: '',
            tipo: '',
            departamento: '',
            dni: '',
            fechaNacimiento: '',
            genero: '',
            direccion: '',
            telefono: '',
            email: ''
        };
        this.fotoPreview = '';
        this.editarUsuarioId = null; // Salir del modo de edición
        this.passwordChanged = false; // Restablecer el indicador de cambio de contraseña
    },
    cargarPaciente(paciente) {
      this.nuevoPaciente = { ...paciente };
      this.editarUsuarioId = paciente._id;
    },
    confirmarEliminacion(id, nombre) {
      const confirmacion = window.confirm(`¿Está seguro de que desea eliminar el paciente ${nombre}?`);
      if (confirmacion) {
        this.eliminarUsuario(id);
      }
    },
    async eliminarPaciente(id) {
      try {
        await apiClient.delete(`/api/usuarios/${id}`);
        this.obtenerPacientes();
      } catch (error) {
        console.error('Error al eliminar paciente:', error);
      }
    },
    formatearFecha(fechaHora) {
      if (!fechaHora) return '';
      const fecha = new Date(fechaHora);
      const dia = String(fecha.getDate()).padStart(2, '0');
      const mes = String(fecha.getMonth() + 1).padStart(2, '0');
      const anio = fecha.getFullYear();
      return `${dia}/${mes}/${anio}`;
    },
    async actualizarPaciente() {
      // Crear una copia del objeto nuevoPaciente
      const usuarioActualizado = { ...this.nuevoPaciente };
      console.log("Actualizando paciente:", usuarioActualizado);

      // Solo incluir la contraseña si ha sido modificada
      if (!this.passwordChanged || !usuarioActualizado.password.trim()) {
        delete usuarioActualizado.password;
      }

      try {
        await apiClient.put(`/api/usuarios/${this.editarUsuarioId}`, usuarioActualizado, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        await this.obtenerPacientes(); // Recargar la lista de usuarios
        this.resetFormulario(); // Resetear el formulario después de la edición
      } catch (error) {
        console.error('Error al actualizar paciente:', error);
      }
    },
    cancelarEdicion() {
      this.resetFormulario();
    },
    handlePasswordChange(event) {
      this.passwordChanged = true;
      this.nuevoPaciente.password = event.target.value;
    },
    setCustomMessage(event, message) {
      if (!event.target.value) {
        event.target.setCustomValidity('Este campo es obligatorio');
      } else {
        event.target.setCustomValidity(message);
      }
    },
    validateRequired(event, message) {
      event.target.setCustomValidity(''); // Resetea el mensaje personalizado
      if (!event.target.value) {
        event.target.setCustomValidity('Este campo es obligatorio');
      } else if (!event.target.checkValidity()) {
        event.target.setCustomValidity(message);
      }
    },
    validateNombre(event) {
      event.target.setCustomValidity('');
      if (!event.target.value) {
        event.target.setCustomValidity('Este campo es obligatorio');
      } else if (!event.target.checkValidity()) {
        event.target.setCustomValidity('El nombre solo puede contener letras.');
      }
    },
    validateApellidos(event) {
      event.target.setCustomValidity('');
      if (!event.target.value) {
        event.target.setCustomValidity('Este campo es obligatorio');
      } else if (!event.target.checkValidity()) {
        event.target.setCustomValidity('Los apellidos solo pueden contener letras.');
      }
    },
    validatePassword(event) {
      event.target.setCustomValidity('');
      if (!event.target.value) {
        event.target.setCustomValidity('Este campo es obligatorio');
      } else if (!event.target.checkValidity()) {
        event.target.setCustomValidity('Debe tener al menos 6 caracteres, incluyendo 1 mayúscula, 1 minúscula y 1 número.');
      }
    },
    validateDni(event) {
      event.target.setCustomValidity('');
      if (!event.target.value) {
        event.target.setCustomValidity('Este campo es obligatorio');
      } else if (!event.target.checkValidity()) {
        event.target.setCustomValidity('El DNI debe tener 8 números seguidos de una letra.');
      }
    },
    validateTelefono(event) {
      event.target.setCustomValidity('');
      if (!event.target.checkValidity()) {
        event.target.setCustomValidity('El teléfono debe contener exactamente 9 dígitos.');
      }
    },
    },  

    async mounted() {
      await this.datosUsuario(); 
      await this.obtenerPacientes();
      this.intervalId = setInterval(() => {
        this.obtenerPacientes();
      }, 60000);
  

  
      this.fechaHora = this.obtenerFechaHoraCanarias();
      setInterval(() => {
        this.fechaHora = this.obtenerFechaHoraCanarias();
  
      }, 1000); // Actualiza la hora cada segundo  
    },
    beforeDestroy() {
      clearInterval(this.intervalId);
    },
  };


  </script>
  
  
<style scoped>
    .contenedor-principal {
      display: flex;
      justify-content: space-between;
    }
    
    .columna-formulario {
      width: 30%;
    }
    .columna-citas {
      width: 65%;
    }
    
    button {
      margin-right: 10px;
      margin-bottom: 10px;
      padding: 8px 16px;
      background-color: #4CAF50;
      color: white;
      border: none;
      cursor: pointer;
    }
    
  
  
    .estilo-pagina {  
      margin-left: 2rem; 
      margin-right: 2rem;
    }
  
  
    .header span {
      color: var(--primary-color);
    }
  
    .header img.logo {
      width: 200px;
      height: auto; 
    }
  
    .header h1.left-align {
      text-align: left;
      margin-left: 10px; 
    }
  
    .header h1.small-text {
      font-size: 20px; 
      color: var(--primary-color);
      font-weight: 300;
    }
  
    .vertical-line {
      width: 4px;
      height: 70px;
      background-color: #92bdf6; 
    }
  
    .user-head {
      position: relative;
      align-items: center;
      display: flex;
      margin-left: 2rem;
      justify-content: center;
    }
  
    .usuario-boton {
      color: var(--primary-color);
      text-decoration: none;
      cursor: pointer;
      font-size: 0.8em;
      margin-left: 0.4em;
    }
  
    .barra-fecha {
      background-color: var(--primary-color);
      color: white;
      font-size: 1.1rem;
      padding: 10px 20px;
      border: none;
      border-radius: 10px;
  
      display: flex;
      align-items: center;
  
    }
  
    .boton-crear {
      background-color: var(--color-verde);
      color: var(--primary-color);
      font-size: 1.1rem;
      padding: 10px 20px;
      border: none;
      border-radius: 10px;
      cursor: pointer;
    }
    
  
    /* Estilo del círculo */
    .circle {
      width: 5rem; /* Tamaño del círculo */
      height: 5rem;
      border-radius: 50%; /* Hace que sea un círculo */
      background-color: var(--color-azul); /* Usa el color definido */
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 0.5rem;
      margin: 0.5rem;
      margin-right: 20px; 
  
    }
  
    .alinear-elementos {
      display: flex;
      align-items: center;
    }
  
  
    .informacion {
      font-weight: bold; /* Aumenta el grosor de la fuente de letra */
      font-size: 1.6rem; /* Ajusta el tamaño del texto de nombreUsuario */
    }
    
    select, option {
      font-weight: 500; /* Ajuste del grosor de la fuente de letra  */
  
    }
  
  
    .error-cuadro {
      background-color: var(--error-color);
      color: white;
      padding: 10px;
      margin-bottom: 20px;
      border-radius: 5px;
    }
  
    .icon-container {
      display: flex;
      align-items: center;
      gap: 10px; /* Espacio entre el círculo y el texto */
      margin-left: auto;
    }
  
  
    
    .citas-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }
  
    .citas-table th,
    .citas-table td {
      padding: 8px;
      text-align: left;
      border: 1px solid #ddd;
      vertical-align: top; /* Asegura que el contenido se alinee en la parte superior */
      
    }
  
    .citas-table th {
      background-color: #f4f4f4;
      font-weight: bold;
  
    }
  
    .citas-table td {
      background-color: white;
      
    }
  
    .citas-actions {
      width: auto; /* Ajusta el ancho según el contenido */
  
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
  
  
    .boton-eliminar {
      background-color: var(--color-rojo); /* Fondo rojo para el botón */
      color: var(--primary-color); /* Texto blanco */
      border: none;
      padding: 5px 10px;
      border-radius: 3px;
      cursor: pointer;
    }
  
    .boton-eliminar:hover {
      background-color: #c82333; /* Cambia el color al pasar el ratón */
    }
  
    /* Estilo para los campos de entrada de texto, email y el selector */
    input[type="text"],
    input[type="date"],
    input[type="time"],
    input[type="number"],
    input[type="password"],
    input[type="email"],
    select {
      background-color: #C6DEFD; /* Color de fondo del campo */
      padding: 8px;
      border-radius: 5px;
      outline: none;
      width: 100%;
      font-weight: 400;

    }
  
    /* Cambia el color del borde y añade un efecto cuando el campo está enfocado */
    input[type="text"]:focus,
    select:focus {
      border-color: var(--color-azul); /* Cambia el color del borde al hacer foco */
      box-shadow: 0 0 5px var(--color-azul); /* Añade sombra al hacer foco */
      background-color: #C6DEFD; /* Mantiene el color de fondo al hacer foco */
    }
  
    label {
      margin-bottom: 10px;
      text-align: left; /* Alinea los labels a la izquierda para mejor legibilidad */
      font-weight: bold; /* Resalta los labels */
      width: 100%;
    } 

    .foto-preview {
      width: 120px;
      height: 120px;
      border-radius: 20%;
      margin-top: 10px;
      object-fit: cover;
      margin-bottom: 30px;
      align-self: center;
    }

    .buscador {
      margin-top: 20px;
      margin-bottom: 5px;
      padding: 10px;
      width: 100%;
      max-width: 40%;
      border-radius: 5px;
      color: var(--primary-color);
    }

    
  
  
    </style>
    