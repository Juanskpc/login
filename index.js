import express from 'express';
import 'dotenv/config';
import usuarioRouter from './routes/usuariosRoutes.js';
import publicRouter from './routes/publicRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use('/api/usuarios', usuarioRouter);
app.use('/', publicRouter);

app.listen(PORT, () => console.log(' ------------------------servidor ', PORT));