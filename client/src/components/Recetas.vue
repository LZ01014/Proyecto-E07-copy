<template>
  <div>
    <Header/>
    <br/>

    <div class="contenedor-body">
      <h2 class="titulo">Mis Recetas</h2>
      <br/>
      <br/>
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
      <div v-if="!cargando && !errorServidor && recetas.length === 0" class="texto-centrado">
        <p>No tienes recetas disponibles.</p>
      </div>
      <!-- Lista de recetas -->
      <div v-if="recetas.length !== 0" class="recetas-container">
        <div class="receta" v-for="receta in recetas" :key="receta._id">
          <div class="receta-header">
            <h3><i class="fas fa-user-md"></i> <span class="medico-label">Médico:</span> <span class="medico-nombre">{{ receta.medicoId?.nombre }} {{ receta.medicoId?.apellidos }}</span></h3>
            <p><i class="fas fa-calendar-alt"></i> {{ formatFecha(receta.fecha) }} - <i class="fas fa-clock"></i> {{ receta.hora }}</p>
          </div>
          <div class="receta-body">
            <p><strong>Medicamentos:</strong> {{ receta.medicamentos }}</p>
            <p><strong>Observaciones:</strong> {{ receta.observaciones }}</p>
          </div>
          <div class="receta-footer">
            <button @click="imprimirReceta(receta)" class="btn-imprimir"><i class="fas fa-print"></i> Imprimir</button>
            <button @click="descargarReceta(receta)" class="btn-descargar"><i class="fas fa-download"></i> Descargar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'; // Ajusta la ruta si es necesario
import apiClient from '@/apiClient';
import { useAuthStore } from '../../store/auth';
import jsPDF from 'jspdf';

export default {
  name: 'RecetasPaciente',
  components: {
    Header
  },
  data() {
    return {
      recetas: [],
      cargando: false,
      errorServidor: false
    };
  },
  computed: {
    usuario() {
      const authStore = useAuthStore();
      return authStore.getUser || {};
    }
  },
  methods: {
    async obtenerRecetas() {
      this.cargando = true;
      this.errorServidor = false;
      try {
        const authStore = useAuthStore();
        await authStore.checkAuth(); // Verifica la autenticación
        if (!this.usuario._id) {
          throw new Error('Usuario no autenticado');
        }
        const response = await apiClient.get(`/api/recetas?pacienteId=${this.usuario._id}`);
        this.recetas = response.data;
      } catch (error) {
        this.errorServidor = true;
      } finally {
        this.cargando = false;
      }
    },
    formatFecha(fecha) {
      const date = new Date(fecha);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    },
    imprimirReceta(receta) {
      const doc = new jsPDF();

      // Agregar logo
      const logo = new Image();
      logo.src = require('@/assets/logo.png');
      logo.onload = () => {
        doc.addImage(logo, 'PNG', 10, 10, 60, 15);

        // Agregar contenido de la receta
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('Receta Médica', 105, 60, null, null, 'center');
        doc.setFontSize(12);
        doc.text('Médico:', 15, 80);
        doc.setFont('helvetica', 'normal');
        doc.text(`${receta.medicoId?.nombre} ${receta.medicoId?.apellidos}`, 40, 80);
        doc.setFont('helvetica', 'bold');
        doc.text('Fecha:', 15, 90);
        doc.setFont('helvetica', 'normal');
        doc.text(`${this.formatFecha(receta.fecha)}`, 40, 90);
        doc.setFont('helvetica', 'bold');
        doc.text('Hora:', 15, 100);
        doc.setFont('helvetica', 'normal');
        doc.text(`${receta.hora}`, 40, 100);
        doc.setFont('helvetica', 'bold');
        doc.text('Medicamentos:', 15, 110);
        doc.setFont('helvetica', 'normal');
        doc.text(`${receta.medicamentos}`, 15, 120);
        doc.setFont('helvetica', 'bold');
        doc.text('Observaciones:', 15, 130);
        doc.setFont('helvetica', 'normal');
        doc.text(`${receta.observaciones}`, 15, 140);

        // Abrir el PDF en una nueva pestaña y luego imprimir
        const pdfData = doc.output('bloburl');
        window.open(pdfData, '_blank');
      };
    },
    async descargarReceta(receta) {
      const doc = new jsPDF();

      // Agregar logo
      const logo = new Image();
      logo.src = require('@/assets/logo.png');
      logo.onload = () => {
        doc.addImage(logo, 'PNG', 10, 10, 60, 15);

        // Agregar contenido de la receta
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('Receta Médica', 105, 60, null, null, 'center');
        doc.setFontSize(12);
        doc.text('Médico:', 15, 80);
        doc.setFont('helvetica', 'normal');
        doc.text(`${receta.medicoId?.nombre} ${receta.medicoId?.apellidos}`, 40, 80);
        doc.setFont('helvetica', 'bold');
        doc.text('Fecha:', 15, 90);
        doc.setFont('helvetica', 'normal');
        doc.text(`${this.formatFecha(receta.fecha)}`, 40, 90);
        doc.setFont('helvetica', 'bold');
        doc.text('Hora:', 15, 100);
        doc.setFont('helvetica', 'normal');
        doc.text(`${receta.hora}`, 40, 100);
        doc.setFont('helvetica', 'bold');
        doc.text('Medicamentos:', 15, 110);
        doc.setFont('helvetica', 'normal');
        doc.text(`${receta.medicamentos}`, 15, 120);
        doc.setFont('helvetica', 'bold');
        doc.text('Observaciones:', 15, 130);
        doc.setFont('helvetica', 'normal');
        doc.text(`${receta.observaciones}`, 15, 140);

        // Descargar el PDF
        doc.save(`Receta_${this.formatFecha(receta.fecha)}.pdf`);
      };
    }
  },
  mounted() {
    this.obtenerRecetas();
  }
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
  max-width: 80rem; /* Limitar el ancho máximo */
  margin: 0 auto; /* Centrar el contenedor */
}

.titulo {
  text-align: center;
  color: #1c1c5a;
  font-size: 2.5rem; /* Aumentar el tamaño de la fuente */
  margin-bottom: 20px;
}

.texto-centrado {
  text-align: center;
  font-size: 1.5rem; /* Aumentar el tamaño de la fuente */
}

.recetas-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.receta {
  background-color: white;
  border: 1px solid #ddd; /* Reducir el contraste */
  border-radius: 10px;
  padding: 20px; /* Aumentar el padding */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.receta-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd; /* Reducir el contraste */
  padding-bottom: 10px;
  margin-bottom: 10px;
}

.receta-header h3 {
  margin: 0;
  color: #333; /* Cambiar a un color más neutro */
  font-size: 1.8rem; /* Aumentar el tamaño de la fuente */
}

.receta-header .medico-label {
  color: #1c1c5a; /* Azul para la etiqueta "Médico" */
}

.receta-header .medico-nombre {
  color: #333; /* Color neutro para el nombre del médico */
}

.receta-header p {
  margin: 0;
  color: #555;
  font-size: 1.2rem; /* Aumentar el tamaño de la fuente */
}

.receta-header .fecha-hora {
  display: flex;
  align-items: center;
  gap: 10px;
}

.receta-body p {
  margin: 10px 0; /* Aumentar el margen */
  color: #333;
  font-size: 1.2rem; /* Aumentar el tamaño de la fuente */
}

.receta-body p strong {
  color: #1c1c5a;
}

.receta-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 10px;
}

.btn-imprimir, .btn-descargar {
  background-color: #92bdf6;
  color: rgb(0, 0, 0);
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}

.btn-imprimir:hover, .btn-descargar:hover {
  background-color: #1c1c5a;
  color: white;
}

.alerta-error {
  background-color: #f44336 !important;
  color: white !important;
}

.alert-text {
  margin-left: 20px;
  font-size: 1.2rem; /* Aumentar el tamaño de la fuente */
}
</style>