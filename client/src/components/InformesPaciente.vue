<template>
  <div class="estilo-pagina">
    <Header/>
    <br>
    <br>  

    <div class="contenedor-body">
      <h2 class="titulo">Citas anteriores - Informes</h2>
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
      <div v-if="!cargando && !errorServidor && citasPasadas.length === 0" class="texto-centrado">
        <p>No tienes citas pasadas disponibles.</p>
      </div>
      <!-- Lista de citasPasadas -->
      <div v-if="citasPasadas.length !== 0" class="citas-container">
        <div class="cita" v-for="cita in citasPasadas" :key="cita._id">
          <div class="cita-header">
            <h3><i class="fas fa-user-md"></i> <span class="medico-label">Médico:</span> <span class="medico-nombre">{{ cita.medicoId?.nombre }} {{ cita.medicoId?.apellidos }}</span></h3>
            <p><i class="fas fa-calendar-alt"></i> {{ formatearFecha(cita.fechaHora) }} - <i class="fas fa-clock"></i> {{ formatearHora(cita.fechaHora) }}</p>
          </div>
          <div class="cita-body">
            <p><strong>Especialidad:</strong> {{ cita.especialidadId.nombre }}</p>
            <p><strong>Prestacion:</strong> {{ cita.prestacionId.nombre }}</p>
          </div>
          <div class="cita-footer">
            <button @click="imprimirInforme(cita)" class="btn-imprimir"><i class="fas fa-print"></i> Imprimir</button>
            <button @click="descargarInforme(cita)" class="btn-descargar"><i class="fas fa-download"></i> Descargar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  </template>
  
  <script>
  import { useAuthStore } from '../../store/auth';
  import apiClient from '@/apiClient';
  import Header from './Header.vue';
  import jsPDF from 'jspdf';

  export default {
    name: "InformesPaciente",
      components: {
      Header
    },
    data() {
      return {
        saludo: '',
        icono: '',
        horaActual: '',
        cargando: false,
        errorServidor: false,
        citasPasadas: [],
        informes: []
      };
    },
    computed: {
      nombreUsuario() {
        const authStore = useAuthStore();
        return authStore.getUser ? `${authStore.getUser.nombre} ${authStore.getUser.apellidos}` : 'Usuario';
      },
      usuarioId() {
      const authStore = useAuthStore();
      return authStore.getUser ? authStore.getUser._id : null;
      }
    },
    methods: {
      async obtenerCitasPasadas() {
        this.cargando = true;
        this.errorServidor = false;
        try {
            const authStore = useAuthStore();
            await authStore.checkAuth(); // Verifica la autenticación
            if (!this.usuarioId) {
              throw new Error('Usuario no autenticado');
            }
            const response = await apiClient.get('/api/citas', {
              params: { pacienteId: this.usuarioId }
            });
            const citas = response.data;
            const ahora = new Date();
            this.citasPasadas = citas.filter(cita => new Date(cita.fechaHora) < ahora);
          } catch (error) {
            this.errorServidor = true;
          } finally {
            this.cargando = false;
          }
        },
      async obtenerInformes () {
        this.cargando = true;
        this.errorServidor = false;
        try {
          const response = await apiClient.get('/api/informes', {
            params: { pacienteId: this.usuarioId }
          });
          this.informes = response.data;
        } catch (error) {
          this.errorServidor = true;
        } finally {
          this.cargando = false;
        }
      },
      actualizarSaludo() {
        const ahora = new Date();
        const horaCanarias = new Date(ahora.toLocaleString("en-US", { timeZone: "Atlantic/Canary" }));
        const hora = horaCanarias.getHours();
  
        if (hora >= 6 && hora < 12) {
          this.saludo = "Buenos días";
          this.icono = require('@/assets/icons/buenos_dias.png');
        } else if (hora >= 13 && hora < 20) {
          this.saludo = "Buenas tardes";
          this.icono = require('@/assets/icons/buenas_tardes.png');
        } else {
          this.saludo = "Buenas noches";
          this.icono = require('@/assets/icons/buenas_noches.png');
        }
      },
      actualizarHora() {
        const ahora = new Date();
        const horaCanarias = new Date(ahora.toLocaleString("en-US", { timeZone: "Atlantic/Canary" }));
        this.horaActual = horaCanarias.toLocaleTimeString('es-ES', { hour12: false });
      },
      async verificarAutenticacion() {
        const authStore = useAuthStore();
        await authStore.checkAuth();
      },
      handleLogout() {
      const authStore = useAuthStore();
      authStore.logout();
      },
      formatearFecha(fechaHora) {
        const fecha = new Date(fechaHora);
        const dia = String(fecha.getDate()).padStart(2, '0');
        const mes = String(fecha.getMonth() + 1).padStart(2, '0');
        const anio = fecha.getFullYear();
        return `${dia}/${mes}/${anio}`;
      },
      formatearHora(fechaHora) {
        const fecha = new Date(fechaHora);
        const horas = String(fecha.getHours()).padStart(2, '0');
        const minutos = String(fecha.getMinutes()).padStart(2, '0');
        return `${horas}:${minutos} h`;
      },
      async buscarNombreMedico(medicoId) {
        const response = await apiClient.get(`/api/usuarios/${medicoId}`);
        const Medico = response.data;
        console.log(Medico);
        return Medico.nombre + ' ' + Medico.apellidos;
      },
      async mostrarPaciente(pacienteId) {
        const response = await apiClient.get(`/api/usuarios/${pacienteId}`);
        const Paciente = response.data;
        console.log(Paciente);
        return Paciente.nombre + ' ' + Paciente.apellidos;
      },
      async imprimirInforme(cita) {
        const informe = this.informes.find(Informe => Informe.citaId === cita._id);
        const nombreMedico = await this.buscarNombreMedico(informe.medicoId);
        const nombrePaciente = await this.mostrarPaciente(informe.pacienteId);
        const doc = new jsPDF();
        // Agregar logo
        const logo = new Image();
        logo.src = require('@/assets/logo.png');
        logo.onload = () => {
          doc.addImage(logo, 'PNG', 10, 10, 60, 15);
        
          // Agregar contenido del informe
          doc.setFontSize(16);
          doc.setFont('helvetica', 'bold');
          doc.text('Informe Médico', 105, 60, null, null, 'center');
          doc.setFontSize(12);
          doc.text('Médico:', 15, 80);
          doc.setFont('helvetica', 'normal');
          doc.text(` ${nombreMedico} `, 40, 80);
          doc.setFont('helvetica', 'bold');
          doc.text('Fecha:', 15, 90);
          doc.setFont('helvetica', 'normal');
          doc.text(`${this.formatearFecha(informe.fecha)}`, 40, 90);
          doc.setFont('helvetica', 'bold');
          doc.text('Paciente:', 15, 100);
          doc.setFont('helvetica', 'normal');
          doc.text(`${nombrePaciente}`, 40, 100);
          doc.setFont('helvetica', 'bold');
          doc.text('Diagnóstico:', 15, 110);
          doc.rect(15, 115, 180, 30);
          doc.setFont('helvetica', 'normal');
          doc.text(`${informe.diagnostico}`, 17, 121);
          doc.setFont('helvetica', 'bold');
          doc.text('Observaciones:', 15, 160);
          doc.rect(15, 165, 180, 30);
          doc.setFont('helvetica', 'normal');
          doc.text(`${informe.observaciones}`, 17, 171);
        
        
          // Abrir el PDF en una nueva pestaña y luego imprimir
          const pdfData = doc.output('bloburl');
          window.open(pdfData, '_blank');
        };
      },
      async descargarInforme(cita) {
        const doc = new jsPDF();

        // Agregar logo
        const logo = new Image();
        logo.src = require('@/assets/logo.png');
        logo.onload = () => {
          doc.addImage(logo, 'PNG', 10, 10, 60, 15);

          // Agregar contenido del informe
          doc.setFontSize(16);
          doc.setFont('helvetica', 'bold');
          doc.text('Justificante de cita', 105, 60, null, null, 'center');
          doc.setFontSize(12);
          doc.text('Paciente:', 30, 70);
          doc.setFont('helvetica', 'normal');
          doc.text(`${cita.pacienteId?.nombre} ${cita.pacienteId?.apellidos}`, 70, 70);
          doc.setFont('helvetica', 'bold');
          doc.text('Médico:', 30, 80);
          doc.setFont('helvetica', 'normal');
          doc.text(`${cita.medicoId?.nombre} ${cita.medicoId?.apellidos}`, 70, 80);
          doc.setFont('helvetica', 'bold');
          doc.text('Fecha:', 30, 90);
          doc.setFont('helvetica', 'normal');
          doc.text(`${this.formatearFecha(cita.fechaHora)}`, 70, 90);
          doc.setFont('helvetica', 'bold');
          doc.text('Hora:', 30, 100);
          doc.setFont('helvetica', 'normal');
          doc.text(`${this.formatearHora(cita.fechaHora)}`, 70, 100);
          doc.setFont('helvetica', 'bold');
          doc.text('Especialidad:', 30, 110);
          doc.setFont('helvetica', 'normal');
          doc.text(`${cita.especialidadId?.nombre}`, 70, 110);
          doc.setFont('helvetica', 'bold');
          doc.text('Prestación:', 30, 120);
          doc.setFont('helvetica', 'normal');
          doc.text(`${cita.prestacionId?.nombre}`, 70, 120);
        
          // Descargar el PDF
          doc.save(`Justificante_${this.formatearFecha(cita.fechaHora)}.pdf`);
        };
      }
    },
    async mounted() {
      await this.verificarAutenticacion();
      this.actualizarSaludo();
      this.actualizarHora();
      this.obtenerCitasPasadas(); // Llamar a la función para obtener las citas pasadas
      this.obtenerInformes();
      setInterval(() => {
        this.actualizarHora();
      }, 1000); // Actualiza la hora cada segundo
    }
  };
</script>

<style src="@/assets/styles.css"></style>
<style scoped>

.header span {
  color: var(--primary-color);
}

.departamento-info p {
  margin: 5px 0;
}

.usuario-boton {
color: #007bff;
text-decoration: none;
cursor: pointer;
font-size: 0.8em;
margin-left: 0.4em;
}
  
  button:hover {
    background: var(--color-azul);
  }
button {
  background: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: calc(100% - 0rem); 
  background-color: #e1e1e1;
  
  padding: 1rem;
  text-align: left;
  display: flex;

  align-items: left;
  justify-content: left;

  gap: 10px;
  border-radius: 15px; 
}


.estilo-pagina {  
  margin-left: 2rem; 
  margin-right: 2rem;
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

.reloj {
  font-size: 24px;
  font-weight: bold;
}


.small-text {
  font-size: 14px;
  margin: 0;
  color: var(--color-azul2);
}

.user-head {
  position: relative;
  align-items: center;
  display: flex;
  margin-left: 2rem;
  justify-content: center;
}


.icono {
  width: 40px;
  height: 40px;
  background-color: var(--color-azul2);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.icono::before {
  content: '+';
  color: var(--primary-color);
  font-size: 1.5rem;
  font-weight: bold;
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

.citas-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.cita {
  background-color: white;
  border: 1px solid #ddd; /* Reducir el contraste */
  border-radius: 10px;
  padding: 20px; /* Aumentar el padding */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.cita-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd; /* Reducir el contraste */
  padding-bottom: 10px;
  margin-bottom: 10px;
}

.cita-header h3 {
  margin: 0;
  color: #333; /* Cambiar a un color más neutro */
  font-size: 1.8rem; /* Aumentar el tamaño de la fuente */
}

.cita-header .medico-label {
  color: #1c1c5a; /* Azul para la etiqueta "Médico" */
}

.cita-header .medico-nombre {
  color: #333; /* Color neutro para el nombre del médico */
}

.cita-header p {
  margin: 0;
  color: #555;
  font-size: 1.2rem; /* Aumentar el tamaño de la fuente */
}

.cita-header .fecha-hora {
  display: flex;
  align-items: center;
  gap: 10px;
}

.cita-body p {
  margin: 10px 0; /* Aumentar el margen */
  color: #333;
  font-size: 1.2rem; /* Aumentar el tamaño de la fuente */
}

.cita-body p strong {
  color: #1c1c5a;
}

.cita-footer {
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
  