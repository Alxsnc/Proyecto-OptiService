import './loadEnv';
import express from 'express';

const app = express();

import userRoutes from './routes/usuario.routes';
import pedidoRoutes from './routes/publicacion.routes';

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));


//routes
app.use(userRoutes, pedidoRoutes);

app.listen(4000);
console.log('Server on port', 4000);
