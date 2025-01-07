<template>
  <div>
  <Header/>
  <div class="estilo-pagina" @click.self="cancelEdit">
  
    <br>  
    <br>

    <!-- Información del Usuario -->
    <div class="user-info">
      <div class="foto-container" @click="triggerFileInput">
        <img v-if="usuario.foto" :src="usuario.foto" alt="Foto de Perfil" class="foto-perfil" />
        <svg v-else width="120" height="120" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style="color: #92bdf6;">
          <path d="M6 36C6 31.0347 17.9925 28 24 28C30.0075 28 42 31.0347 42 36V42H6V36Z" fill="currentColor"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M24 26C29.5228 26 34 21.5228 34 16C34 10.4772 29.5228 6 24 6C18.4772 6 14 10.4772 14 16C14 21.5228 18.4772 26 24 26Z" fill="currentColor"/>
        </svg>
        <div class="overlay">
          <i class="fas fa-edit"></i>
        </div>
      </div>
      <input type="file" ref="fileInput" @change="onFileChange" style="display: none;" />
      <div class="user-details">
        <h2>{{ usuario.nombre }} {{ usuario.apellidos }}</h2>
        <p>{{ calcularEdad(usuario.fechaNacimiento) }} años</p>
      </div>
    </div>

    <!-- Datos Personales -->
    <div class="datos-personales" @click.stop>
      <div class="header-datos">
        <button class="header-ctitle">Datos personales</button>
        <button class="edit-button" @click="toggleEditMode">
          {{ editMode ? 'Guardar' : 'Editar' }}
        </button>
      </div>
      <div class="datos-content">
        <div class="detalle" v-for="(value, key) in filteredUsuario" :key="key">
          <span class="label">{{ formatLabel(key) }}:</span>
          <span class="valor" v-if="!editMode">{{ formatValue(key, value) }}</span>
          <div v-else>
            <input v-if="key === 'fechaNacimiento'" type="date" v-model="editableUsuario[key]" :required="isRequiredField(key)" />
            <select v-else-if="key === 'genero'" v-model="editableUsuario[key]" :required="isRequiredField(key)">
              <option value="" disabled>Seleccione género</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
            </select>
            <input v-else v-model="editableUsuario[key]" :required="isRequiredField(key)" />
            <span v-if="errors[key]" class="error-message">{{ errors[key] }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Seguro Médico -->
    <div class="seguro-medico">
      <div class="header-datos">
        <button class="header-ctitle">Seguro Médico</button>
      </div>
      <div class="datos-content">
        <div class="detalle">
          <span class="label">Compañía de Seguro:</span>
          <span class="valor">{{ usuario.companiaSeguro }}</span>
        </div>
        <div class="detalle">
          <span class="label">Número de Póliza:</span>
          <span class="valor">{{ usuario.numeroPoliza }}</span>
        </div>
      </div>
    </div>

    <!-- Antecedentes -->
    <div class="antecedentes">
      <div class="header-datos">
        <button class="header-ctitle">Antecedentes médicos</button>
      </div>
      <div class="datos-content">
        <div class="detalle">
          <span class="label">Enfermedades Crónicas:</span>
          <span class="valor">{{ usuario.enfermedadesCronicas }}</span>
        </div>
        <div class="detalle">
          <span class="label">Enfermedades Pasadas:</span>
          <span class="valor">{{ usuario.enfermedadesPasadas }}</span>
        </div>
        <div class="detalle">
          <span class="label">Intervenciones Quirúrgicas:</span>
          <span class="valor">{{ usuario.intervencionesQuirurgicas }}</span>
        </div>
        <div class="detalle">
          <span class="label">Alergias a Medicamentos:</span>
          <span class="valor">{{ usuario.alergiasMedicamentos }}</span>
        </div>
        <div class="detalle">
          <span class="label">Alergias a Alimentos o Sustancias:</span>
          <span class="valor">{{ usuario.alergiasAlimentos }}</span>
        </div>
        <div class="detalle">
          <span class="label">Enfermedades Familiares:</span>
          <span class="valor">{{ usuario.enfermedadesFamiliares }}</span>
        </div>
      </div>
    </div>

    <!-- Importante -->
    <div class="important-container">
      <strong style="font-size: 1.8rem;"> Importante</strong>
      <br>
      <br>
        <ul style="font-size: 1.5rem;">
          Algunos datos solo pueden ser modificados por médicos o administrativos. 
          Si desea modificar su información, por favor acuda el centro hospitalario.
        </ul>
    </div>
  </div>
</div>
</template>

<script>
import { useAuthStore } from '../../store/auth';
import apiClient from '@/apiClient';
import Header from './Header.vue';

export default {
  name: "PerfilUsuario",
  components: {
    Header
  },
  data() {
    return {
      editMode: false,
      editableUsuario: {},
      errors: {},
      labels: {
        nombre: 'Nombre',
        apellidos: 'Apellidos',
        fechaNacimiento: 'Fecha de nacimiento',
        dni: 'DNI',
        genero: 'Sexo',
        direccion: 'Dirección',
        telefono: 'Teléfono',
        email: 'Email'
      }
    };
  },
  computed: {
    usuario() {
      const authStore = useAuthStore();
      return authStore.getUser || {};
    },
    filteredUsuario() {
      const { nombre, apellidos, fechaNacimiento, dni, genero, direccion, telefono, email } = this.editableUsuario;
      return { nombre, apellidos, fechaNacimiento, dni, genero, direccion, telefono, email };
    }
  },
  watch: {
    usuario: {
      immediate: true,
      handler(newVal) {
        this.editableUsuario = { ...newVal };
        if (this.editableUsuario.fechaNacimiento) {
          this.editableUsuario.fechaNacimiento = this.formatDateForInput(this.editableUsuario.fechaNacimiento);
        }
      }
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    handleLogout() {
      const authStore = useAuthStore();
      authStore.logout();
    },
    toggleEditMode() {
      if (this.editMode) {
        this.saveChanges();
      } else {
        this.editMode = true;
      }
    },
    isRequiredField(key) {
      const requiredFields = ['nombre', 'apellidos', 'fechaNacimiento', 'dni', 'genero', 'direccion', 'telefono', 'email'];
      return requiredFields.includes(key);
    },
    async saveChanges() {
      if (!this.validateForm()) {
        return;
      }

      const updatedUser = {
        nombre: this.editableUsuario.nombre,
        apellidos: this.editableUsuario.apellidos,
        username: this.editableUsuario.username,
        password: this.editableUsuario.password,
        tipo: this.editableUsuario.tipo,
        dni: this.editableUsuario.dni,
        genero: this.editableUsuario.genero,
        direccion: this.editableUsuario.direccion,
        telefono: this.editableUsuario.telefono,
        email: this.editableUsuario.email,
        fechaNacimiento: this.formatDateForPost(this.editableUsuario.fechaNacimiento),
        foto: this.editableUsuario.foto
      };

      try {
        const authStore = useAuthStore();
        const response = await apiClient.put(`/api/usuarios/${authStore.getUser._id}`, updatedUser, {
          headers: {
            'Content-Type': 'application/json', 
          },
        });
        authStore.setUser(response.data);
        this.editableUsuario = { ...response.data }; // Actualizar los datos del usuario
        this.editMode = false; // Cambiar el modo de edición a falso
      } catch (error) {
        console.error('Error al guardar los cambios:', error);
      }
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    async onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = async (e) => {
          this.editableUsuario.foto = e.target.result;
          await this.saveChanges(); 
        };
        reader.readAsDataURL(file);
      }
    },
    validateForm() {
      this.errors = {};
      const requiredFields = ['nombre', 'apellidos', 'fechaNacimiento', 'dni', 'genero', 'direccion', 'telefono', 'email'];
      let isValid = true;
      for (const field of requiredFields) {
        if (!this.editableUsuario[field]) {
          this.errors[field] = 'Este campo es obligatorio.';
          isValid = false;
        }
      }
      return isValid;
    },
    cancelEdit() {
      this.editableUsuario = { ...this.usuario };
      this.editMode = false;
    },
    formatLabel(key) {
      return this.labels[key] || key;
    },
    formatValue(key, value) {
      if (key === 'fechaNacimiento' && value) {
        return this.formatDateForDisplay(value);
      }
      return value;
    },
    formatDate(value) {
      if (!value) return '';
      const date = new Date(value);
      const day = String(date.getDate()).padStart(2, '0'); // Día con 2 dígitos
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Mes con 2 dígitos
      const year = date.getFullYear(); // Año
      return `${year}-${month}-${day}`;
    },
    formatDateForInput(value) {
      if (!value) return '';
      const date = new Date(value);
      const day = String(date.getDate()).padStart(2, '0'); // Día con 2 dígitos
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Mes con 2 dígitos
      const year = date.getFullYear(); // Año
      return `${year}-${month}-${day}`;
    },
    formatDateForPost(value) {
      if (!value) return '';
      const date = new Date(value);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Mes con 2 dígitos
      const day = String(date.getDate()).padStart(2, '0'); // Día con 2 dígitos
      return `${year}-${month}-${day}`;
    },
    formatDateForDisplay(value) {
      if (!value) return '';
      const date = new Date(value);
      const day = String(date.getDate()).padStart(2, '0'); // Día con 2 dígitos
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Mes con 2 dígitos
      const year = date.getFullYear(); // Año
      return `${day}-${month}-${year}`;
    },
    calcularEdad(fechaNacimiento) {
      const hoy = new Date();
      const nacimiento = new Date(fechaNacimiento);
      let edad = hoy.getFullYear() - nacimiento.getFullYear();
      const mes = hoy.getMonth() - nacimiento.getMonth();
      if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
      }
      return edad;
    }
  }
};
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: #e1e1e1;
  border-radius: 15px;
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

.header h1 {
  font-size: 20px;
}

.button-container {
  margin-left: auto;
}

.logout-button {
  background-color: #92bdf6;
  color: rgb(0, 0, 0);
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}

.logout-button:hover {
  background-color: #1c1c5a;
  color: white;
}

.user-info {
  display: flex;
  align-items: center;
  margin: 0rem auto;
  width: 78%;
}

.user-info svg {
  margin-right: 1rem;
}

.foto-container {
  position: relative;
  cursor: pointer;
  width: 120px;
  height: 120px;
}

.foto-perfil {
  width: 120px;
  height: 120px;
  border-radius: 50%; /* Hacer la imagen circular */
  object-fit: cover; /* Asegurarse de que la imagen se ajuste bien dentro del contenedor */
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.foto-container:hover .overlay {
  opacity: 1;
}

.overlay i {
  color: white;
  font-size: 2rem;
}

.user-details {
  display: flex;
  flex-direction: column;
  color: #1c1c5a;
}

.user-details h2 {
  margin: 0;
  font-size: 2.5rem;
  font-weight: bold; 
}

.user-details p {
  margin: 0;
  font-size: 1.4rem;
}

.datos-personales, .seguro-medico, .antecedentes {
  margin: 1.5rem auto;
  padding: 1.5rem;
  background-color: white;
  border-radius: 3.5rem;
  border: 0.5rem solid #1c1c5a;
  width: 80%; /* Ajusta el ancho para que sea consistente */
}

.important-container {
  margin: 1.5rem auto;
  padding: 1.5rem;
  background-color: #e7c2d4;
  border-radius: 3.5rem;
  width: 80%; /* Ajusta el ancho para que sea consistente */
  text-align: center;
  justify-content: center;
  line-height: 1.2;
  margin-bottom: 1.5rem; /* Añadir margen inferior */
}

.header-datos {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.header-ctitle {
  background-color: #1c1c5a;
  color: white;
  font-size: 1.5rem;
  border: none;
  padding: 10px 20px;
  border-radius: 4rem;
  cursor: default;
}

.edit-button {
  background-color: #92bdf6;
  color: rgb(0, 0, 0);
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}

.edit-button:hover {
  background-color: #1c1c5a;
  color: white;
}

.save-button, .cancel-button {
  background-color: #92bdf6;
  color: rgb(0, 0, 0);
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  margin-right: 10px;
}

.save-button:hover, .cancel-button:hover {
  background-color: #1c1c5a;
  color: white;
}

.datos-content {
  display: flex;
  flex-direction: column;
  gap: 10px; /* Aumentar el espacio entre los elementos */
}

.detalle {
  display: flex;
  flex-direction: row; /* Cambiar a fila para alinear horizontalmente */
  align-items: center; /* Alinear verticalmente al centro */
  padding: 0.5em; /* Reducir el padding */
}

.label {
  font-weight: bold;
  margin-right: 1em; /* Espacio entre la etiqueta y el valor */
}

.valor {
  color: #555;
}

input, select {
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.5rem;
  border-radius: 5px;
  background-color: #c6defd;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

.error-message {
  color: red;
  font-size: 0.8rem;
  margin-top: 0.2rem;
}

.boton {
  background-color: #cbe3fd;
  color: #1c1c5a;
  font-size: 1.1rem;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}

.boton:hover {
  background-color: #b0d4fc;
}

</style>