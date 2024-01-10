import { Router } from "express";
const router = Router();

import * as authControllers from '../controllers/auth.controller.js';

// Prefijo rutas relacionadas con autenticación
const authRoutes = Router();

authRoutes.post('/singup', authControllers.singUp); // Registro de usuario
authRoutes.post('/singin', authControllers.singIn); // Inicio de sesión

// Prefijos de las rutas
router.use('/api/auth', authRoutes);

export default router;