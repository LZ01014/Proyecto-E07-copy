<template>
    <div class="contenedor-principal">
      <!-- Columna izquierda: Formulario de creación de prestaciones -->
      <div class="columna-formulario">
        <h2>Gestión de Prestaciones</h2>
  
        <!-- Formulario para crear o editar una prestación -->
        <form @submit.prevent="editarPrestacionId ? actualizarPrestacion() : crearPrestacion()">
            <img v-if="fotoPreview" :src="fotoPreview" alt="Previsualización de Foto de Perfil" class="foto-preview"/>

            <!-- Campo de Nombre -->
          <label>Nombre:
            <input
               type="text"
                v-model="nuevaPrestacion.nombre"
                required
                pattern="^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s-]+$"
                @input="validateNombre"
                @blur="validateRequired($event, 'El nombre solo puede contener letras, espacios, y guiones.')"
                @invalid="setCustomMessage($event, 'El nombre solo puede contener letras, espacios, y guiones.')"
            />
          </label>    
  
          <!-- Campo de Descripción -->
          <label>Descripción:
            <textarea v-model="nuevaPrestacion.descripcion" class="textarea-azul"></textarea>
          </label>

          <!-- Campo de Indicaciones -->
          <label>Indicaciones:
            <textarea v-model="nuevaPrestacion.indicaciones" class="textarea-azul"></textarea>
          </label>

  
          <!-- Botones de acción para crear o actualizar la prestación -->
          <v-btn class="ma-2 boton-crear" type="submit" v-if="!editarPrestacionId">
            Crear Prestación
          </v-btn>
          <v-btn class="ma-2 boton-guardar" type="button" v-if="editarPrestacionId" @click="actualizarPrestacion">
            Guardar Cambios
          </v-btn>
          <v-btn class="ma-2 boton-cancelar" type="button" v-if="editarPrestacionId" @click="cancelarEdicion">
            Cancelar
          </v-btn>
        </form>
      </div>
  
      <!-- Columna derecha: Lista de prestaciones -->
      <div class="columna-lista">
        <h3>Listado de Prestaciones</h3>
  
        <!-- Indicador de error y carga -->
        <v-alert
          v-if="errorServidor"
          type="error"
          class="alerta-error"
          prominent
          color="red lighten-3"
        >
          <span class="alert-text">Fallo de comunicación con el servidor</span>
        </v-alert>
  
        <div v-if="cargando && !errorServidor" class="text-center">
          <v-progress-circular
            :size="70"
            :width="7"
            color="#17195e"
            indeterminate
          ></v-progress-circular>
        </div>
  
        <div v-if="!cargando && !errorServidor && prestaciones.length === 0" class="texto-centrado">
          <p>La lista está vacía</p>
        </div>
  
        <!-- Tabla de prestaciones -->
        <table class="department-table" v-if="prestaciones.length !== 0">
  <thead>
    <tr>
      <th></th>
      <th>Nombre</th>
      <th>Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="prestacion in prestaciones" :key="prestacion._id">
      <td class="department-actions">
        <div class="action-buttons">
          <v-btn class="boton-modificar" @click="cargarPrestacion(prestacion)">
            <i class="bi bi-pencil-square"></i>
          </v-btn>
          <v-btn class="boton-eliminar" @click="confirmarEliminacion(prestacion._id, prestacion.nombre)">
            <i class="bi bi-trash"></i>
          </v-btn>
        </div>
      </td>
      <td>{{ prestacion.nombre }}</td>
      <td>{{ prestacion.descripcion }}</td>
    </tr>
  </tbody>
</table>

      </div>
    </div>
  </template>
  
  <script>
  import apiClient from '@/apiClient';
  
  export default {
    name: 'GestionPrestaciones',
    data() {
      return {
        prestaciones: [],
        nuevaPrestacion: {
          nombre: '',
          descripcion: '',
          indicaciones: ''
        },
        fotoPreview: require('@/assets/estados/especialidad_defecto.png'),
        editarFormId: null,
        cargando: false,
        errorServidor: false
      };
    },
    methods: {
      async obtenerPrestaciones() {
        this.cargando = true;
        try {
          const response = await apiClient.get('/api/prestaciones');
          this.prestaciones = response.data;
        } catch (error) {
          this.errorServidor = true;
        } finally {
          this.cargando = false;
        }
      },
      async crearPrestacion() {
        try {
          await apiClient.post('/api/prestaciones', this.nuevaPrestacion);
          this.obtenerPrestaciones();
          this.resetFormulario();
        } catch (error) {
          console.error('Error al crear prestación:', error);
        }
      },
      cargarPrestacion(prestacion) {
        this.nuevaPrestacion = { ...prestacion };
        this.editarPrestacionId = prestacion._id;
      },
      async actualizarPrestacion() {
        try {
          await apiClient.put(`/api/prestaciones/${this.editarPrestacionId}`, this.nuevaPrestacion);
          this.obtenerPrestaciones();
          this.resetFormulario();
        } catch (error) {
          console.error('Error al actualizar prestación:', error);
        }
      },
      cancelarEdicion() {
        this.resetFormulario();
      },
      confirmarEliminacion(id, nombre) {
        const confirmacion = window.confirm(`¿Está seguro de que desea eliminar la prestación ${nombre}?`);
        if (confirmacion) {
          this.eliminarPrestacion(id);
        }
      },
      async eliminarPrestacion(id) {
        try {
          await apiClient.delete(`/api/prestaciones/${id}`);
          this.obtenerPrestaciones();
        } catch (error) {
          console.error('Error al eliminar prestación:', error);
        }
      },
      resetFormulario() {
        this.nuevaPrestacion = { nombre: '', descripcion: '', indicaciones: '' };
        this.editarPrestacionId = null;
      }
    },
    mounted() {
      this.obtenerPrestaciones();
    }
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
  
  /* Columna para el formulario de creación de departamentos */
  .columna-formulario {
    flex: 1;
    max-width: 40%; /* Controla el ancho de la columna del formulario */
  }
  
  /* Columna para la lista de departamentos */
  .columna-lista {
    flex: 2;
    max-width: 60%; /* Controla el ancho de la columna de la lista */
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
    border-radius: 8px;
    font-weight: bold;
  }
  
  .boton-agregar {
    background-color: var(--success-color) !important; /* Verde */
    color: white !important;
    padding: 5px 10px;
    margin-left: 10px;
    border-radius: 8px;
    font-weight: bold;
  }


  .boton-eliminar-operacion {
    background-color: var(--error-color) !important; /* Verde */
    color: white !important;
    padding: 5px 10px;
    margin-left: 10px;
    border-radius: 8px;
    font-weight: bold;
  }
  
  .boton-modificar {
    background-color: var(--warning-color) !important; /* Naranja */
    color: white !important;
    width: 40px; /* Hace el botón cuadrado */
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .boton-eliminar {
    background-color: var(--error-color) !important; /* Rojo */
    color: white !important;
    width: 40px; /* Hace el botón cuadrado */
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .boton-guardar {
    background-color: var(--success-color) !important; /* Verde */
    color: white !important;
    padding: 10px 20px;
    border-radius: 8px;
    font-weight: bold;
  }
  
  .boton-cancelar {
    background-color: var(--color-gris) !important; /* Gris */
    color: black !important;
    padding: 10px 20px;
    border-radius: 8px;
  }
  
  .user-item {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    padding: 8px;
    border-radius: 8px;
    background-color: var(--background-color);
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .user-actions {
    display: flex;
    gap: 10px;
    margin-left: auto;
  }
  
  /* Estilo para la alerta de error */
  .alerta-error {
    background-color: #f44336 !important;
    color: white !important;
  }
  
  .alert-text {
    margin-left: 20px;
  }
  
  .texto-centrado {
    text-align: center;
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

  /* Estilo para los campos de entrada de texto, email y el selector */
input[type="text"],
input[type="email"],
select {
  width: 100%;             /* Ocupa el ancho completo del contenedor */
  height: 40px;           /* Ajusta la altura según tus necesidades */
  background-color: #C6DEFD; /* Color de fondo azul */
  padding: 10px;           /* Espacio interior */
  border-radius: 5px;      /* Bordes redondeados */
  font-family: 'Outfit', sans-serif; /* Asegura uniformidad de la fuente */
  resize: vertical;        /* Permite cambiar la altura, pero no el ancho */
  outline: none;           /* Remueve el borde de enfoque */
}

/* Cambia el color del borde y añade un efecto cuando el campo está enfocado */
input[type="text"]:focus,
input[type="email"]:focus,
select:focus {
  border-color: var(--color-azul); /* Cambia el color del borde al hacer foco */
  box-shadow: 0 0 5px var(--color-azul); /* Añade sombra al hacer foco */
  background-color: #C6DEFD; /* Mantiene el color de fondo al hacer foco */
}

.department-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.department-table th,
.department-table td {
  padding: 10px;
  text-align: left;
  border: 1px solid #ddd;
  vertical-align: top; /* Asegura que todo el contenido se alinee en la parte superior */
}

.department-table th {
  background-color: #f4f4f4;
  font-weight: bold;
}

/* Contenedor de los botones de acción en la misma línea */
.action-buttons {
  display: flex;
  gap: 10px; /* Espacio entre los botones */
  align-items: center;
  justify-content: flex-start;
}

.department-actions {
  width: auto; /* Ajusta el ancho según el contenido */
}


.textarea-azul {
  width: 100%;             /* Ocupa el ancho completo del contenedor */
  height: 100px;           /* Ajusta la altura según tus necesidades */
  background-color: #C6DEFD; /* Color de fondo azul */
  padding: 10px;           /* Espacio interior */
  border-radius: 5px;      /* Bordes redondeados */
  font-family: 'Outfit', sans-serif; /* Asegura uniformidad de la fuente */
  resize: vertical;        /* Permite cambiar la altura, pero no el ancho */
  outline: none;           /* Remueve el borde de enfoque */
}

/* Cambia el color del borde y añade un efecto cuando el campo está enfocado */
.textarea-azul:focus {
  border-color: var(--color-azul); /* Cambia el color del borde al hacer foco */
  box-shadow: 0 0 5px var(--color-azul); /* Añade sombra al hacer foco */
  background-color: #C6DEFD; /* Mantiene el color de fondo al hacer foco */
}




</style>