const mongoose = require('mongoose');

async function autoIncrementModelID(modelName, doc, next) {
  try {
    // Encuentra el documento con el número más alto y lo incrementa
    const maxNumberDoc = await mongoose.model(modelName)
      .findOne()
      .sort({ numero: -1 }); // Ordena por el campo `numero` en orden descendente

    doc.numero = maxNumberDoc ? maxNumberDoc.numero + 1 : 1; // Incrementa o inicializa a 1
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = autoIncrementModelID;
