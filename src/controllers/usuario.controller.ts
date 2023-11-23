import { Request, Response } from "express";
import { QueryResult } from "pg";

import { pool } from "../db/database";

//CRUD USUARIOS
export const createUser = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        const { id_usuario, nombre, apellido, email, contrasena, fecha_nac } = req.body;
        const response = await pool.query(
            "INSERT INTO usuario (id_usuario, nombre, apellido, email, contrasena, fecha_nac) VALUES ($1, $2, $3, $4, $5, $6)",
            [id_usuario, nombre, apellido, email, contrasena, fecha_nac]
        );
        return res.json({
            message: "User created successfully",
            body: {
                user: {
                    nombre,
                    apellido,
                    email,
                },
            },
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json("Internal Server error...");
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

