<template>
  <div class="error-container">
    <img :src="require('@/assets/estados/error_404.png')" alt="Error" class="error-image" />
    <h1>Página no encontrada</h1>
    <p>Lo sentimos, la página que estás buscando no existe</p>
    <v-btn class="btn-inicio" @click="volverAlInicio">Volver al inicio</v-btn>
  </div>
</template>

<script>
export default {
  name: 'PaginaError',
  methods: {
    volverAlInicio() {
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  text-align: center;
}

.error-image {
  max-width: 750px;
  margin-bottom: 20px;
}

.btn-inicio {
  background-color: var(--primary-color) !important; /* Azul corporativo */
  color: white !important;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: bold;
}
</style>
