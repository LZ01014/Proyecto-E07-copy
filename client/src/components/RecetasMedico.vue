<template>
  <div>
    <div class="header-container">
      <header class="header">
        <img src="@/assets/logo.png" alt="Hospital Rambla" class="logo" />
        <div class="header-content">
          <div class="vertical-line"></div>
          <h1 class="left-align small-text">PORTAL DEL PACIENTE</h1>
        </div>
      </header>
    </div>
    <br/>

    <div class="contenedor-body">
      <h2 class="titulo">Crear Receta</h2>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-autocomplete
          v-model="receta.pacienteId"
          :items="pacientes"
          :search-input.sync="search"
          :loading="cargandoPacientes"
          :rules="[rules.required]"
          label="Buscar Paciente (Nombre o DNI)"
          item-text="nombreCompleto"
          item-value="_id"
          required
          @update:search-input="buscarPacientes"
          @focus="buscarPacientes('')"
          :item-title="item => item.nombreCompleto"
        ></v-autocomplete>
        <v-text-field
          v-model="receta.fecha"
          :rules="[rules.required]"
          label="Fecha"
          type="date"
          required
        ></v-text-field>
        <v-text-field
          v-model="receta.hora"
          :rules="[rules.required]"
          label="Hora"
          type="time"
          required
        ></v-text-field>
        <v-textarea
          v-model="receta.medicamentos"
          :rules="[rules.required]"
          label="Medicamentos"
          required
        ></v-textarea>
        <v-textarea
          v-model="receta.observaciones"
          :rules="[rules.required]"
          label="Observaciones"
          required
        ></v-textarea>
        <v-btn :disabled="!valid" color="success" @click="crearReceta">Crear Receta</v-btn>
      </v-form>
      <br/>
      <v-alert v-if="mensaje" type="success" dismissible>{{ mensaje }}</v-alert>
      <v-alert v-if="error" type="error" dismissible>{{ error }}</v-alert>
    </div>
  </div>
</template>

<script>
import apiClient from '@/apiClient';
import { useAuthStore } from '../../store/auth';

export default {
  name: 'RecetaMedico',
  data() {
    return {
      valid: false,
      receta: {
        pacienteId: '',
        medicoId: '',
        fecha: '',
        hora: '',
        medicamentos: '',
        observaciones: ''
      },
      pacientes: [],
      search: '',
      cargandoPacientes: false,
      mensaje: '',
      error: '',
      rules: {
        required: value => !!value || 'Requerido.'
      }
    };
  },
  computed: {
    usuario() {
      const authStore = useAuthStore();
      return authStore.getUser || {};
    }
  },
  methods: {
    async buscarPacientes(search) {
      this.cargandoPacientes = true;
      try {
        const response = await apiClient.get(`/api/usuarios/pacientes?search=${search}`);
        this.pacientes = response.data.map(paciente => ({
          _id: paciente._id,
          nombreCompleto: `${paciente.nombre} ${paciente.apellidos}  (${paciente.dni})`
        }));
      } catch (error) {
        console.error('Error al buscar pacientes', error);
      } finally {
        this.cargandoPacientes = false;
      }
    },
    async crearReceta() {
      const authStore = useAuthStore();
      await authStore.checkAuth();
      const usuario = authStore.getUser;
      if (!usuario || !usuario._id) {
        throw new Error('Usuario no autenticado');
      }
      this.receta.medicoId = usuario._id; 
      if (this.$refs.form.validate()) {
        try {
          await apiClient.post('/api/recetas', this.receta);
          this.mensaje = 'Receta creada exitosamente';
          this.error = '';
          this.resetForm();
        } catch (err) {
          this.error = 'Error al crear la receta';
          this.mensaje = '';
        }
      }
    },
    resetForm() {
      this.receta.pacienteId = '';
      this.receta.fecha = '';
      this.receta.hora = '';
      this.receta.medicamentos = '';
      this.receta.observaciones = '';
      this.$refs.form.reset();
    }
  },
};
</script>

<style scoped>
.header-container {
  margin-left: 2rem; 
  margin-right: 2rem; 
}

.header {
  display: flex;
  align-items: center;
  padding: 1rem;
  background-color: #e1e1e1;
  border-radius: 15px;
}

.header img.logo {
  width: 200px;
  height: auto;
}

.header-content {
  display: flex;
  align-items: center;
}

.vertical-line {
  width: 4px;
  height: 70px;
  background-color: #92bdf6;
  margin-left: 0; /* Pegar la línea al logo */
}

.header h1.left-align {
  text-align: left;
  margin-left: 10px;
}

.header h1 {
  font-size: 20px;
}

.contenedor-body {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 0 auto;
}

.titulo {
  text-align: center;
  color: #1c1c5a;
  font-size: 2.5rem;
  margin-bottom: 20px;
}
</style>