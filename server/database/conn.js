// Creando la conexión con la B.D
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

// Método que realiza la conexión
async function connect() {
    // Utilizando 'MongoMemoryServer' para crear una conexión temporaria
    const mongod = await MongoMemoryServer.create();
    const getURI = mongod.getUri(); // Generando el string de la conexión usado por MongoDB

    // Configuración para evitar mensajes de advertencia
    mongoose.set('strictQuery', true);

    // Realizando la conexión
    const db = await mongoose.connect(getURI);
    console.log("Database Connected")
    return db;
}

export default connect;