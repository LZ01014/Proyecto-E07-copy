const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const MONGO_URL = process.env.MONGODB_URI;

async function mostrarColecciones() {
  try {
    // Conectar a la base de datos
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Conexión a MongoDB exitosa');

    // Listar las colecciones
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Colecciones:', collections.map(col => col.name));

    // Mostrar el contenido de cada colección
    for (const collection of collections) {
      const modelName = collection.name.charAt(0).toUpperCase() + collection.name.slice(1);
      const Model = mongoose.model(modelName, new mongoose.Schema({}, { strict: false }), collection.name);
      const documentos = await Model.find().lean().exec();
      console.log(`Contenido de la colección ${collection.name}:`, documentos);
    }
  } catch (err) {
    console.error('Error:', err);
  } finally {
    // Cerrar la conexión a la base de datos
    await mongoose.disconnect();
    console.log('Conexión a MongoDB cerrada');
  }
}

// Ejecutar la función
mostrarColecciones();