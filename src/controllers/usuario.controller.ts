import { Request, Response } from "express";
import { QueryResult } from "pg";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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

        // Validar cédula
        if (!validarCedula(id_usuario)) {
            return res.status(400).json({ error: "La cédula proporcionada no es válida" });
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

        // Si las credenciales son válidas, generar un token JWT
        const token = jwt.sign({ id_usuario: user.id_usuario, email: user.email }, "secreto", { expiresIn: "1h" });

        // Responder con el token
        return res.status(200).json({ token });
    } catch (e) {
        console.error(e);
        return res.status(500).json("Error interno del servidor");
    }
};

//Eliminar usuario
export const deleteUser = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        const id_usuario = parseInt(req.params.id);

        // Verificar si el usuario existe antes de intentar eliminarlo
        const userExistsResult: QueryResult = await pool.query("SELECT 1 FROM usuario WHERE id_usuario = $1", [id_usuario]);

        if (userExistsResult.rows.length === 0) {
            return res.status(404).json({ error: `Usuario con ID ${id_usuario} no encontrado` });
        }

        // Eliminar el usuario de la base de datos
        await pool.query("DELETE FROM usuario WHERE id_usuario = $1", [id_usuario]);

        return res.json({ message: `Usuario con ID ${id_usuario} eliminado exitosamente` });
    } catch (error) {
        console.error(error);
        return res.status(500).json("Error interno del servidor");
    }
};

//Obtener todos los usuarios
export const getUsers = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        // Obtener la lista de usuarios desde la base de datos
        const getUsersQuery = "SELECT * FROM usuario";
        const usersResult: QueryResult = await pool.query(getUsersQuery);

        // Verificar si hay usuarios en la respuesta
        if (usersResult.rows.length === 0) {
            return res.status(404).json({ error: "No se encontraron usuarios" });
        }

        // Extraer la información relevante de los usuarios
        const users = usersResult.rows.map((user) => ({
            id_usuario: user.id_usuario,
            nombre: user.nombre,
            apellido: user.apellido,
            email: user.email,
        }));

        // Responder con la lista de usuarios
        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).json("Error interno del servidor");
    }
};

//Obtener un usuario por su ID (cédula)
export const getUserById = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        const id_usuario = parseInt(req.params.id);

        // Buscar el usuario por su ID en la base de datos
        const getUserQuery = "SELECT * FROM usuario WHERE id_usuario = $1";
        const userResult: QueryResult = await pool.query(getUserQuery, [id_usuario]);

        // Verificar si se encontró el usuario
        if (userResult.rows.length === 0) {
            return res.status(404).json({ error: `Usuario con ID ${id_usuario} no encontrado` });
        }

        // Extraer la información relevante del usuario
        const user = {
            id_usuario: userResult.rows[0].id_usuario,
            nombre: userResult.rows[0].nombre,
            apellido: userResult.rows[0].apellido,
            email: userResult.rows[0].email,
        };

        // Responder con la información del usuario
        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json("Error interno del servidor");
    }
};

//Actualizar usuario
export const updateUser = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        const userId = parseInt(req.params.id);
        const { nombre, apellido, email, fecha_nac } = req.body;

        // Verificar si el usuario existe antes de intentar actualizarlo
        const userExistsResult: QueryResult = await pool.query("SELECT 1 FROM usuario WHERE id_usuario = $1", [userId]);

        if (userExistsResult.rows.length === 0) {
            return res.status(404).json({ error: `Usuario con ID ${userId} no encontrado` });
        }

        // Construir dinámicamente la consulta de actualización basada en los campos proporcionados
        const updateFields: string[] = [];
        const updateValues: any[] = [];

        if (nombre !== undefined) {
            updateFields.push("nombre");
            updateValues.push(nombre);
        }

        if (apellido !== undefined) {
            updateFields.push("apellido");
            updateValues.push(apellido);
        }

        if (email !== undefined) {
            updateFields.push("email");
            updateValues.push(email);
        }

        if (fecha_nac !== undefined) {
            updateFields.push("fecha_nac");
            updateValues.push(fecha_nac);
        }

        if (updateFields.length === 0) {
            return res.status(400).json({ error: "No se proporcionaron campos para actualizar" });
        }

        const updateQuery =
            "UPDATE usuario SET " +
            updateFields.map((field, index) => `${field} = $${index + 1}`).join(", ") +
            ` WHERE id_usuario = $${updateFields.length + 1}`;

        const updateValuesWithUserId = [...updateValues, userId];

        // Ejecutar la consulta de actualización
        await pool.query(updateQuery, updateValuesWithUserId);

        return res.json({ message: `Usuario con ID ${userId} actualizado exitosamente` });
    } catch (error) {
        console.error(error);
        return res.status(500).json("Error interno del servidor");
    }
};


//Validar cedula
const validarCedula = (cedula: string): boolean => {
    // Verificar la longitud de la cédula
    if (cedula.length !== 10) {
        return false;
    }

    // Obtener los primeros 9 dígitos de la cédula
    const digitos = cedula.substring(0, 9);

    // Calcular el dígito verificador esperado
    let suma = 0;
    for (let i = 0; i < digitos.length; i++) {
        let digito = parseInt(digitos[i], 10);

        if (i % 2 === 0) {
            digito *= 2;
            if (digito > 9) {
                digito -= 9;
            }
        }

        suma += digito;
    }

    const digitoVerificadorEsperado = (10 - (suma % 10)) % 10;

    // Obtener el último dígito de la cédula
    const digitoVerificador = parseInt(cedula[9], 10);

    // Comparar el dígito verificador calculado con el dígito verificador proporcionado
    return digitoVerificador === digitoVerificadorEsperado;
};


