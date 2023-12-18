import express from "express";
import usuarioRoutes from "./routes/usuario.routes.js";
import publicacionRoutes from "./routes/publicacion.routes.js";

const app = express();

//middlewares
app.use(express.json());


app.use(usuarioRoutes, publicacionRoutes);

export default app;