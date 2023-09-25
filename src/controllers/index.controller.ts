import { Request, Response } from "express";
import { QueryResult } from "pg";

import { pool } from "../database";

//CRUD USUARIOS
export const createUser = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        const { nombre, apellido, email } = req.body;
        const response = await pool.query(
            "INSERT INTO usuario (nombre, apellido, email) VALUES ($1, $2, $3)",
            [nombre, apellido, email]
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

//CRUD PEDIDOS
export const createPedido = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        const { id_usuario, titulo, descripcion, categoria, fecha_publicacion, monto, tiempo } = req.body;
        const response = await pool.query(
            "INSERT INTO pedido_pr (id_usuario, titulo, descripcion, categoria, fecha_publicacion, monto, tiempo) VALUES ($1, $2, $3, $4, $5, $6, $7)",
            [id_usuario, titulo, descripcion, categoria, fecha_publicacion, monto, tiempo]
        );
        return res.json({
            message: "Pedido created successfully",
            body: {
                pedido: {
                    id_usuario,
                    titulo,
                    categoria,
                },
            },
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json("Internal Server error...");
    }
};

export const getPedidos = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        const response = await pool.query("SELECT * FROM pedido_pr");
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e);
        return res.status(500).json("Internal Server error...");
    }
};

export const getPedidoById = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        const id = parseInt(req.params.id);
        const response: QueryResult = await pool.query('SELECT * FROM pedido_pr WHERE id_pedido = $1', [id]);
        return res.status(200).json(response.rows);

    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error...');
    }
};

export const updatePedido = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const id = parseInt(req.params.id);
    const { titulo, descripcion, categoria, fecha_publicacion, monto, tiempo } = req.body;

    const response = await pool.query(
        "UPDATE pedido_pr SET titulo = $1, descripcion = $2, categoria = $3, fecha_publicacion = $4, monto = $5, tiempo = $6 WHERE id_pedido = $7",
        [titulo, descripcion, categoria, fecha_publicacion, monto, tiempo, id]
    );

    return res.json(`Pedido ${id} updated Successfully`);
};

export const deletePedido = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        const id = parseInt(req.params.id);
        await pool.query("DELETE FROM pedido_pr where id_pedido = $1", [id]);
        return res.json(`Pedido ${id} deleted Successfully`);
    } catch (e) {
        console.log(e);
        return res.status(500).json("Internal Server error...");
    }
};








/*export const getRoles = async (req: Request, res: Response): Promise<Response> => {
    try{
        const response = await pool.query('SELECT * FROM rolles',);
        return res.status(200).json(response.rows);

    }
    catch(e){
        console.log(e); 
        return res.status(500).json('Internal Server error...');
    }
}

export const getRoleById = async (req: Request, res: Response): Promise<Response> => {
    try{
        const id = parseInt(req.params.id);
        const response: QueryResult = await pool.query('SELECT * FROM rolles WHERE id_roll = $1', [id]);
        return res.status(200).json(response.rows);

    }
    catch(e){
        console.log(e); 
        return res.status(500).json('Internal Server error...');
    }

}*/
