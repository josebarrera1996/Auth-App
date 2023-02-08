import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connect from './database/conn.js';

// Inicializando a Express
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by');

// Puerto
const PORT = 8080;

// Prueba
app.get('/', (req, res) => {
    res.status(201).json("Home GET Request");
});

// Implementando la conexión con la B.D
connect().then(() => {
    try {
        // Si todo ha salido exitoso, levantar el servidor
        app.listen(PORT, () => {
            console.log(`Server connected to http://localhost:${PORT}`);
        })
    } catch (error) {
        console.log('Cannot connect to the server');
    }
}).catch(error => {
    console.log("Invalid database connection...!");
});
