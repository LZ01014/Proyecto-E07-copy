// Importar mongoose y dotenv
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Cargar variables de entorno desde .env
dotenv.config();

// Configuración de la URL de conexión a MongoDB (desde el archivo .env)
const MONGO_URL = process.env.MONGODB_URI;

// Función principal para eliminar la colección "Cita"
async function eliminarColeccionCita() {
  try {
    // Conectar a la base de datos
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Conexión a MongoDB exitosa');

    // Eliminar la colección "Cita"
    await mongoose.connection.db.dropCollection('citas');
    console.log('Colección "Cita" eliminada exitosamente');
  } catch (error) {
    if (error.code === 26) {
      console.log('La colección "Cita" no existe');
    } else {
      console.error('Error al eliminar la colección "Cita":', error);
    }
  } finally {
    // Cerrar la conexión a la base de datos
    await mongoose.disconnect();
    console.log('Conexión a MongoDB cerrada');
  }
}

// Ejecutar la función
eliminarColeccionCita();
