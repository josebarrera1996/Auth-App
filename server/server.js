import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

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
    res.status(201).json("Home GET Request")
});

// Levantando el servidor
app.listen(PORT, () => {
    console.log(`Server connected to http://localhost:${PORT}`);
})
