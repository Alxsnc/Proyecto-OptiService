import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import publicacionRoutes from "./routes/publicacion.routes.js";
import categoriasRoutes from "./routes/categorias.routes.js";

const app = express();

//middlewares
app.use(cors({
    origin: '*',
}));
app.use(express.json());

//Rutas
app.use(userRoutes, authRoutes, publicacionRoutes, categoriasRoutes);

export default app;