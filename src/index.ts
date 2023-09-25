import './loadEnv';
import express from 'express';

const app = express();

import indexRoutes from './routes/index';

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));


//routes
app.use(indexRoutes);

app.listen(4000);
console.log('Server on port', 4000);
