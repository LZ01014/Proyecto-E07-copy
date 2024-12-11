<template>
  <div class="contenedor-principal">
    <!-- Columna izquierda: Formulario de creación de usuarios -->
    <div class="columna-formulario">
      <h2>Gestión de Usuarios</h2>
      
      <!-- Formulario para crear un usuario -->
      <form @submit.prevent="crearUsuario">
        <img v-if="fotoPreview" :src="fotoPreview" alt="Previsualización de Foto de Perfil" class="foto-preview"/>

        <label>Nombre*:
          <input
            type="text"
            v-model="nuevoUsuario.nombre"
            required
            pattern="^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$"
            @input="validateNombre"
            @blur="validateRequired($event, 'El nombre solo puede contener letras.')"
            @invalid="setCustomMessage($event, 'El nombre solo puede contener letras.')"
          />
        </label>
        <label>Apellidos*:
          <input
            type="text"
            v-model="nuevoUsuario.apellidos"
            required
            pattern="^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$"
            @input="validateApellidos"
            @blur="validateRequired($event, 'Los apellidos solo pueden contener letras.')"
            @invalid="setCustomMessage($event, 'Los apellidos solo pueden contener letras.')"
          />
        </label>

        <label>Contraseña*:
          <input
            type="password"
            v-model="nuevoUsuario.password"
            required
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$"
            @input="validatePassword"
            @blur="validateRequired($event, 'Debe tener al menos 6 caracteres, incluyendo 1 mayúscula, 1 minúscula y 1 número.')"
            @invalid="setCustomMessage($event, 'Debe tener al menos 6 caracteres, incluyendo 1 mayúscula, 1 minúscula y 1 número.')"
          />
        </label>

        <label>Tipo*:
          <select v-model="nuevoUsuario.tipo" @change="actualizarOpcionesDepartamento" required>
            <option value="" disabled selected>Seleccione tipo</option>
            <option value="Administración">Administración</option>
            <option value="Paciente">Paciente</option>
            <option value="Médico">Médico</option>
          </select>
        </label>

        <!-- Campo de Departamento (solo se muestra si corresponde) -->
        <label v-if="departamentosDisponibles.length > 0"> Departamento:
          <select v-model="nuevoUsuario.departamento" required>
            <option v-for="dep in departamentosDisponibles" :key="dep._id" :value="dep._id">{{ dep.nombre }}</option>
          </select>
        </label>


        <!-- Campos opcionales -->
        <label>DNI:
          <input
            type="text"
            v-model="nuevoUsuario.dni"
            pattern="^\d{8}[A-Za-z]$"
            @input="validateDni"
            @blur="validateDni"
            @invalid="setCustomMessage($event, 'El DNI debe tener 8 números seguidos de una letra.')"
          />
        </label>
        <label>Fecha de Nacimiento:
          <input type="date" v-model="nuevoUsuario.fechaNacimiento" />
        </label>
        <label>Género*:
          <select v-model="nuevoUsuario.genero" required>
            <option value="" disabled selected>Seleccione género</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
          </select>
        </label>
        <label>Dirección:
          <input type="text" v-model="nuevoUsuario.direccion" />
        </label>
        <label>Teléfono:
          <input
            type="text"
            v-model="nuevoUsuario.telefono"
            pattern="^\d{9}$"
            @input="validateTelefono"
            @blur="validateRequired($event, 'El teléfono debe contener exactamente 9 dígitos.')"
            @invalid="setCustomMessage($event, 'El teléfono debe contener exactamente 9 dígitos.')"
          />
        </label>
        <label>Correo Electrónico:
          <input type="email" v-model="nuevoUsuario.email"/>
        </label>

        <v-btn class="ma-2 boton-crear" type="submit" v-if="!editarUsuarioId">
          Crear Usuario
        </v-btn>
        <v-btn class="ma-2 boton-guardar" type="button" v-if="editarUsuarioId" @click="actualizarUsuario">
          Guardar Cambios
        </v-btn>
        <v-btn class="ma-2 boton-cancelar" type="button" v-if="editarUsuarioId" @click="cancelarEdicion">
          Cancelar
        </v-btn>
      </form>
    </div>

    <!-- Columna derecha: Lista de usuarios -->
    <div class="columna-lista">
      <h3>Lista de Usuarios</h3>
      
      <!-- Filtro para el tipo de usuario -->
      <div class="filtro-tipo-usuario">
        <label for="filtroTipo">Filtrar por tipo de usuario:</label>
        <select v-model="filtroTipo" @change="filtrarUsuarios">
          <option value="">Todos</option>
          <option value="Administración">Administración</option>
          <option value="Paciente">Paciente</option>
          <option value="Médico">Médico</option>
        </select>
      </div>
      
      <!-- Mensaje de error de comunicación -->
      <v-alert
        v-if="errorServidor"
        type="error"
        class="alerta-error"
        prominent
        color="red lighten-3"
      >
      <span class="alert-text">Fallo de comunicación con el servidor</span>
      </v-alert>

      <!-- Indicador de carga -->
      <div v-if="cargando && !errorServidor" class="text-center">
        <v-progress-circular
          :size="70"
          :width="7"
          color="#17195e"
          indeterminate
        ></v-progress-circular>
      </div>

      <!-- Mensaje de lista vacía -->
      <div v-if="!cargando && !errorServidor && usuariosFiltrados.length === 0" class="texto-centrado">
        <p>La lista está vacía</p>
      </div>

      <!-- Tabla de usuarios -->
      <table v-if="!cargando && !errorServidor && usuariosFiltrados.length > 0" class="user-table">
  <thead>
    <tr>
      <th></th>
      <th>Nombre</th>
      <th>Username</th>
      <th>Tipo de usuario</th>
      <th>Departamento</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="usuario in usuariosFiltrados" :key="usuario._id">
      <td class="user-actions">
        <v-btn class="boton-modificar" @click="cargarUsuario(usuario)">
          <i class="bi bi-pencil-square"></i>
        </v-btn>
        <v-btn class="boton-eliminar" @click="confirmarEliminacion(usuario._id, usuario.nombre)">
          <i class="bi bi-trash"></i>
        </v-btn>
      </td>
      <td>{{ usuario.nombre }} {{ usuario.apellidos }}</td>
      <td>{{ usuario.username }}</td>
      <td>{{ usuario.tipo }}</td>
      <td>{{ obtenerNombreDepartamento(usuario.departamento) }}</td>

    </tr>
  </tbody>
</table>
      </div>
    </div>
</template>

<script>
import apiClient from '@/apiClient';

export default {
  name: 'CreacionUsuarios',
  data() {
    return {
      filtroTipo: '',
      usuarios: [],
      nuevoUsuario: {
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
      },
      fotoPreview: require('@/assets/estados/perfil_defecto.png'),
      departamentosDisponibles: [],
      todosDepartamentos: [], // Todos los departamentos cargados una vez
      cargando: false, // Estado de carga
      errorServidor: false, // Estado de error
    };
  },
  computed: {
    usuariosFiltrados() {
      if (this.filtroTipo) {
        return this.usuarios.filter(usuario => usuario.tipo === this.filtroTipo);
      }
      return this.usuarios;
    },
  },
  methods: {
  async obtenerUsuarios() {
    this.cargando = true;
    this.errorServidor = false;
    try {
      const response = await apiClient.get('/api/usuarios');
      this.usuarios = response.data;
      
      // Llama a obtenerDepartamentos() cada vez que se actualizan los usuarios
      await this.obtenerDepartamentos();
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      this.errorServidor = true;
    } finally {
      this.cargando = false;
    }
  },

  async obtenerDepartamentos() {
    try {
      const response = await apiClient.get('/api/departamentos');
      this.todosDepartamentos = response.data; // Guardar todos los departamentos
      console.log("Departamentos cargados:", this.todosDepartamentos);
      this.actualizarOpcionesDepartamento(); // Aplicar filtro inicial
    } catch (error) {
      console.error('Error al obtener departamentos:', error);
    }
  },
  obtenerNombreDepartamento(departamentoId) {
    const departamento = this.todosDepartamentos.find(dep => dep._id === departamentoId);
    return departamento ? departamento.nombre : '';
  },
  filtrarUsuarios() {
    // Este método se llama cuando se cambia el filtro, pero el cálculo se realiza en `usuariosFiltrados`
  },
  async actualizarOpcionesDepartamento() {
    if (this.nuevoUsuario.tipo === 'Médico') {
      // Filtrar solo departamentos de "Especialidad médica" para el tipo "Médico"
      this.departamentosDisponibles = this.todosDepartamentos.filter(
        dep => dep.tipo === 'Especialidad médica'
      );
    } else if (this.nuevoUsuario.tipo === 'Administración') {
      // Filtrar solo departamentos de "Administración" para el tipo "Administración"
      this.departamentosDisponibles = this.todosDepartamentos.filter(
        dep => dep.tipo === 'Administración'
      );
    } else {
      // Si el tipo es otro (por ejemplo, "Paciente"), limpiar las opciones
      this.departamentosDisponibles = [];
      this.nuevoUsuario.departamento = '';
    }

    // Mantener el departamento seleccionado si existe en la lista filtrada
    if (
      this.nuevoUsuario.departamento &&
      !this.departamentosDisponibles.find(dep => dep._id === this.nuevoUsuario.departamento)
    ) {
      this.nuevoUsuario.departamento = '';
    }
  },
  async crearUsuario() {
    const formData = new FormData();
    formData.append('nombre', this.nuevoUsuario.nombre);
    formData.append('apellidos', this.nuevoUsuario.apellidos);
    formData.append('username', this.nuevoUsuario.username);
    formData.append('password', this.nuevoUsuario.password);
    formData.append('tipo', this.nuevoUsuario.tipo);
    formData.append('departamento', this.nuevoUsuario.departamento);
    formData.append('dni', this.nuevoUsuario.dni);
    formData.append('fechaNacimiento', this.nuevoUsuario.fechaNacimiento);
    formData.append('genero', this.nuevoUsuario.genero);
    formData.append('direccion', this.nuevoUsuario.direccion);
    formData.append('telefono', this.nuevoUsuario.telefono);
    formData.append('email', this.nuevoUsuario.email);

    // Revisa los valores en formData
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      await apiClient.post('/api/usuarios', formData);
      this.obtenerUsuarios();
      this.resetFormulario();
    } catch (error) {
      console.error('Error al crear usuario:', error);
    }
  },
  resetFormulario() {
    this.nuevoUsuario = {
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
    this.fotoPreview = require('@/assets/estados/perfil_defecto.png');
    this.editarUsuarioId = null; // Salir del modo de edición
  }, 
  cargarUsuario(usuario) {
    this.nuevoUsuario = { ...usuario };
    this.editarUsuarioId = usuario._id;
    this.actualizarOpcionesDepartamento(); 
  },
  confirmarEliminacion(id, nombre) {
    const confirmacion = window.confirm(`¿Está seguro de que desea eliminar el usuario ${nombre}?`);
    if (confirmacion) {
      this.eliminarUsuario(id);
    }
  },
  async eliminarUsuario(id) {
    try {
      await apiClient.delete(`/api/usuarios/${id}`);
      this.obtenerUsuarios();
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    }
  },
  async actualizarUsuario() {
    const formData = new FormData();
    formData.append('nombre', this.nuevoUsuario.nombre);
    formData.append('apellidos', this.nuevoUsuario.apellidos);
    formData.append('username', this.nuevoUsuario.username);
    formData.append('password', this.nuevoUsuario.password);
    formData.append('tipo', this.nuevoUsuario.tipo);
    formData.append('departamento', this.nuevoUsuario.departamento);
    formData.append('dni', this.nuevoUsuario.dni);
    formData.append('genero', this.nuevoUsuario.genero);
    formData.append('direccion', this.nuevoUsuario.direccion);
    formData.append('telefono', this.nuevoUsuario.telefono);
    formData.append('email', this.nuevoUsuario.email);

    try {
      // Enviar los datos directamente como JSON, no como FormData
      await apiClient.put(`/api/usuarios/${this.editarUsuarioId}`, this.nuevoUsuario, {
        headers: {
          'Content-Type': 'application/json', // Asegúrate de usar JSON
        },
      });
      await this.obtenerUsuarios(); // Recargar la lista de usuarios
      this.resetFormulario(); // Resetear el formulario después de la edición
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
    }
  },
  cancelarEdicion() {
    this.resetFormulario();
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
  mounted() {
    this.obtenerUsuarios();
    this.intervalId = setInterval(() => {
      this.obtenerUsuarios();
    }, 60000);
  },
  beforeDestroy() {
    clearInterval(this.intervalId);
  },
};
</script>

<style scoped>
/* Contenedor principal para organizar formulario y lista en columnas */
.contenedor-principal {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 20px;
}

/* Columna para el formulario de creación de usuarios */
.columna-formulario {
  flex: 1;
  max-width: 40%; /* Controla el ancho de la columna del formulario */
}

/* Columna para la lista de usuarios */
.columna-lista {
  flex: 2;
  max-width: 60%; /* Controla el ancho de la columna de la lista */
}

/* Estilos del formulario y su contenedor */
.creacion-usuarios {
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

label {
  margin-bottom: 10px;
  text-align: left; /* Alinea los labels a la izquierda para mejor legibilidad */
  font-weight: bold; /* Resalta los labels */
}

/* Botones estilizados */
.boton-crear {
  background-color: var(--primary-color) !important; /* Azul corporativo */
  color: white !important;
  padding: 10px 20px;
  border-radius: 20px;
  font-weight: bold;
}

/* Estilos para botones */
.boton-modificar {
  background-color: var(--warning-color) !important; /* Naranja */
  color: white !important;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 5px;
}

.boton-eliminar {
  background-color: var(--error-color) !important; /* Rojo */
  color: white !important;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.boton-guardar {
  background-color: var(--success-color) !important; /* Verde */
  color: white !important;
  padding: 10px 20px;
  border-radius: 20px;
  font-weight: bold;
}

.boton-cancelar {
  background-color: var(--color-gris) !important; /* Gris */
  color: black !important;
  padding: 10px 20px;
  border-radius: 20px;
}

/* Estilos de la lista de usuarios */
.user-item {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  padding: 8px;
  border-radius: 8px;
  background-color: var(--background-color);
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Sombras suaves */
}

.user-actions {
  display: flex;
  gap: 5px; /* Espacio entre botones */
  align-items: center;
  justify-content: flex-start;
}


.user-info {
  display: flex;
  width: 100%;
}

.user-column {
  padding: 0 10px; /* Espacio entre columnas */
  flex: 1; /* Distribuye el espacio de manera uniforme */
  text-align: left;
}

/* Ajusta el ancho específico para cada columna según necesidad */
.user-column.nombre {
  flex: 2; /* Ocupa un poco más de espacio para nombres largos */
}

.user-column.apellidos {
  flex: 2;
}

.user-column.username {
  flex: 1;
}

.user-column.tipo {
  flex: 1;
}

/* Estilo para la cabecera de la lista de usuarios */
.user-list-header {
  display: flex;
  padding: 8px 0;
  font-weight: bold;
  color: var(--primary-color); /* Azul corporativo */
  border-bottom: 2px solid var(--color-gris); /* Línea separadora */
  margin-bottom: 10px;
}

.user-list-header .user-column {
  flex: 1;
  padding: 0 10px;
  text-align: left;
}

/* Ajusta el ancho específico para cada columna */
.user-list-header .user-column.nombre {
  flex: 2;
}

.user-list-header .user-column.apellidos {
  flex: 2;
}

.user-list-header .user-column.username {
  flex: 1;
}

.user-list-header .user-column.tipo {
  flex: 1;
}





/* Estilo para los campos de entrada de texto, email y el selector */
input[type="text"],
input[type="email"],
input[type="password"],
select {
  background-color: #C6DEFD; /* Color de fondo del campo */
  padding: 8px;
  border-radius: 5px;
  outline: none;
  font-family: 'Outfit', sans-serif; /* Asegura que la fuente sea uniforme */
}

/* Cambia el color del borde y añade un efecto cuando el campo está enfocado */
input[type="text"]:focus,
input[type="email"]:focus,
input[type="password"],
select:focus {
  border-color: var(--color-azul); /* Cambia el color del borde al hacer foco */
  box-shadow: 0 0 5px var(--color-azul); /* Añade sombra al hacer foco */
  background-color: #C6DEFD; /* Mantiene el color de fondo al hacer foco */
}


.filtro-tipo-usuario {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}

.filtro-tipo-usuario label {
  margin-right: 10px;
  font-weight: bold;
}

.filtro-tipo-usuario select {
  padding: 5px;
  border-radius: 5px;
  border: 1px solid var(--color-gris);
}

.alerta-error {
  background-color: #f44336 !important; /* Rojo claro personalizado */
  color: white !important; /* Color de texto */
}

.alert-text {
  margin-left: 20px; /* Ajusta el margen para aumentar la separación */
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

.user-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.user-table th,
.user-table td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.user-table tr {
  margin: 0; /* Asegura que no haya espacios adicionales */
  padding: 0;
}

.user-table th {
  background-color: #f4f4f4;
  font-weight: bold;
}

.user-table td {
  vertical-align: middle;
}

</style>
