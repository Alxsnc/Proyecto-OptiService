import express from "express";
import cors from "cors";
import usuarioRoutes from "./routes/usuario.routes.js";
import publicacionRoutes from "./routes/publicacion.routes.js";

const app = express();

//middlewares
app.use(cors({
    origin: '*',
}));
app.use(express.json());

//Rutas
app.use(usuarioRoutes, publicacionRoutes);

export default app;