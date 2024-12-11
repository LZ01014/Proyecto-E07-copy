<template>
  <div class="calendar-container">
    <vue-cal
      :events="events"
      :selected-date="selectedDate"
      @date-click="handleDateClick"
    />
  </div>
</template>

<script>
// Importación de VueCal y sus estilos
import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';

export default {
  components: {
    VueCal, // Registro del componente VueCal
  },
  data() {
    return {
      // Eventos de prueba, puedes agregar más eventos aquí
      events: [
        {
          start: '2024-12-01',
          end: '2024-12-01',
          title: 'Evento de prueba',
        },
      ],
      selectedDate: new Date().toISOString().split('T')[0], // Fecha actual en formato ISO
    };
  },
  methods: {
    // Método que maneja el clic en una fecha
    handleDateClick(date) {
      alert(`Fecha seleccionada: ${date}`);
    },
  },
};
</script>

<style scoped>
/* Estilos para el contenedor del calendario */
.calendar-container {
  background-color: white; /* Fondo azul */
  height: 100vh; /* Altura completa de la pantalla */
  display: flex; /* Usar flexbox para centrar */
  justify-content: center; /* Centrado horizontal */
  align-items: center; /* Centrado vertical */
}
</style>
