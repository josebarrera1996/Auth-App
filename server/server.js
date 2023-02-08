import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connect from './database/conn.js';
import router from './router/routes.js';

// Inicializando a Express
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by');

// Puerto
const PORT = 8080;

// HTTP GET Request
app.get('/', (req, res) => {
    res.status(201).json("Home GET Request");
});

// Implementando el sistema de ruteo
app.use('/api', router); // http://localhost:${PORT}/api + router

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
