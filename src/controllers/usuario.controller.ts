import { Request, Response } from "express";
import { QueryResult } from "pg";
import bcrypt from "bcrypt";
import { pool } from "../db/database";

//Registro de usuarios
export const createUser = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        // Validación de datos
        const { id_usuario, nombre, apellido, email, contrasena, fecha_nac } = req.body;

        // Verificar campos requeridos
        if (!id_usuario || !nombre || !apellido || !email || !contrasena || !fecha_nac) {
            return res.status(400).json({ error: "Todos los campos son obligatorios" });
        }

        // Validar el formato del correo electrónico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "El formato del correo electrónico es inválido" });
        }

        // Verificar si el correo ya está registrado para otro usuario
        const existingUser = await pool.query("SELECT * FROM usuario WHERE email = $1", [email]);
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ error: "El correo electrónico ya está registrado para otro usuario" });
        }

        // Hash de la contraseña
        const hashedPassword = await bcrypt.hash(contrasena, 10); // Número de rondas de hashing

        // Crear el usuario en la base de datos
        const response: QueryResult = await pool.query(
            "INSERT INTO usuario (id_usuario, nombre, apellido, email, contrasena, fecha_nac) VALUES ($1, $2, $3, $4, $5, $6)",
            [id_usuario, nombre, apellido, email, hashedPassword, fecha_nac]
        );

        // Devolver una respuesta adecuada
        return res.status(201).json({
            message: "Usuario creado exitosamente",
            body: {
                user: {
                    id_usuario,
                    nombre,
                    apellido,
                    email,
                },
            },
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json("Error Interno del Servidor...");
    }
};

//Login de usuarios
export const loginUser = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        const { email, contrasena } = req.body;

        // Validar campos requeridos
        if (!email || !contrasena) {
            return res.status(400).json({ error: "Correo electrónico y contraseña son obligatorios" });
        }

        // Buscar usuario por correo electrónico en la base de datos
        const userResult: QueryResult = await pool.query("SELECT * FROM usuario WHERE email = $1", [email]);

        // Verificar si el usuario existe
        if (userResult.rows.length === 0) {
            return res.status(401).json({ error: "Credenciales inválidas" });
        }

        const user = userResult.rows[0];

        // Verificar la contraseña
        const passwordMatch = await bcrypt.compare(contrasena, user.contrasena);

        if (!passwordMatch) {
            return res.status(401).json({ error: "Credenciales inválidas" });
        }

        // Si las credenciales son válidas, puedes generar un token de sesión o simplemente responder con un mensaje de éxito.
        return res.status(200).json({ message: "Inicio de sesión exitoso" });
    } catch (e) {
        console.error(e);
        return res.status(500).json("Error interno del servidor");
    }
};

export const deleteUser = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        const id = parseInt(req.params.id);
        await pool.query("DELETE FROM usuario where id_usuario = $1", [id]);
        return res.json(`User ${id} deleted Successfully`);
    } catch (e) {
        console.log(e);
        return res.status(500).json("Internal Server error...");
    }
};

export const getUsers = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        const response = await pool.query("SELECT * FROM usuario");
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e);
        return res.status(500).json("Internal Server error...");
    }
};

export const updateUser = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const id = parseInt(req.params.id);
    const { nombre, apellido, email } = req.body;

    const response = await pool.query(
        "UPDATE usuario SET nombre = $1, apellido = $2, email = $3 WHERE id_usuario = $4",
        [nombre, apellido, email, id]
    );

    return res.json(`User ${id} updated Successfully`);
};

