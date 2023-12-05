import { Request, Response } from "express";
import { QueryResult } from "pg";

import { pool } from "../db/database";

//Crear publicacion
export const createPublicacion = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        const { id_usuario, titulo, descripcion, pago } = req.body;
        const response: QueryResult = await pool.query(
            "INSERT INTO publicacion (id_usuario, titulo, descripcion, pago, fecha_publicacion) VALUES ($1, $2, $3, $4, CURRENT_DATE) RETURNING id_publicacion",
            [id_usuario, titulo, descripcion, pago]
        );

        const newPedidoId: number = response.rows[0].id_publicacion;

        return res.status(201).json({
            message: "Publicación creada exitosamente.",
            body: {
                pedido: {
                    id_publicacion: newPedidoId,
                    id_usuario,
                    titulo,
                    descripcion,
                    pago,
                    fecha_publicacion: response.rows[0].fecha_publicacion,
                },
            },
        });
    } catch (e) {
        console.error(e);
        return res.status(500).json("Error interno del servidor..");
    }
};

//Listar Publicaciones
export const getPublicaciones = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        const response = await pool.query("SELECT * FROM publicacion");

        if (response.rows.length === 0) {
            return res.status(404).json({
                message: "No se encontraron publicaciones.",
            });
        }

        return res.status(200).json({
            message: "Publicaciones recuperadas exitosamente",
            data: response.rows,
        });
    } catch (error: unknown) {
        console.error("Error al obtener publicaciones:", error);
        return res.status(500).json({
            message: "Error interno del servidor...",
            error: error instanceof Error ? error.message : String(error),
        });
    }
};

//Obtener publicacion por id
export const getPublicacionById = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        const id = parseInt(req.params.id);
        const response: QueryResult = await pool.query('SELECT * FROM publicacion WHERE id_publicacion = $1', [id]);

        if (response.rows.length === 0) {
            return res.status(404).json({
                message: "No se encontró ninguna publicación con el ID proporcionado.",
            });
        }

        return res.status(200).json({
            message: "Publicación recuperada exitosamente",
            data: response.rows[0],
        });
    } catch (error) {
        console.error("Error al obtener la publicación:", error);
        return res.status(500).json({
            message: "Error interno del servidor al obtener la publicación.",
            error: (error as Error).message,
        });
    }
};

//Actualizar publicacion
export const updatePublicacion = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        const id = parseInt(req.params.id);
        const { titulo, descripcion, pago } = req.body;

        // Verificar si la publicación existe antes de intentar actualizar
        const checkPublicacion: QueryResult = await pool.query(
            'SELECT * FROM publicacion WHERE id_publicacion = $1',
            [id]
        );

        if (checkPublicacion.rows.length === 0) {
            return res.status(404).json({
                message: "No se encontró ninguna publicación con el ID proporcionado.",
            });
        }

        // Verificar que id_usuario no esté presente en la solicitud
        if (req.body.id_usuario !== undefined) {
            return res.status(400).json({
                message: "No se permite actualizar la clave foránea 'id_usuario'.",
            });
        }

        const updateFields: { [key: string]: any } = {};
        const updateValues: any[] = [];

        // Construir dinámicamente la consulta de actualización según los campos proporcionados
        if (titulo !== undefined) {
            updateFields.titulo = titulo;
            updateValues.push(titulo);
        }

        if (descripcion !== undefined) {
            updateFields.descripcion = descripcion;
            updateValues.push(descripcion);
        }

        if (pago !== undefined) {
            updateFields.pago = pago;
            updateValues.push(pago);
        }

        // Verificar si hay campos para actualizar
        if (updateValues.length === 0) {
            return res.status(400).json({
                message: "Se debe proporcionar al menos un campo para actualizar.",
            });
        }

        // Construir la consulta de actualización dinámica
        const updateQuery = `UPDATE publicacion SET ${Object.keys(updateFields).map((field, index) => `${field} = $${index + 1}`).join(', ')} WHERE id_publicacion = $${updateValues.length + 1}`;

        // Agregar el ID al final del arreglo de valores
        updateValues.push(id);

        // Ejecutar la consulta de actualización
        const response = await pool.query(updateQuery, updateValues);

        return res.json(`Publicación ${id} actualizada correctamente.`);
    } catch (error) {
        console.error("Error al actualizar la publicación:", error);
        return res.status(500).json({
            message: "Error interno del servidor...",
            error: (error as Error).message,
        });
    }
};

//Eliminar publicacion
export const deletePublicacion = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        const id = parseInt(req.params.id);

        // Verificar si la publicación existe antes de intentar eliminar
        const checkPublicacion: QueryResult = await pool.query(
            'SELECT * FROM publicacion WHERE id_publicacion = $1',
            [id]
        );

        if (checkPublicacion.rows.length === 0) {
            return res.status(404).json({
                message: "No se encontró ninguna publicación con el ID proporcionado.",
            });
        }

        // Eliminar la publicación
        await pool.query("DELETE FROM publicacion WHERE id_publicacion = $1", [id]);

        return res.json(`Publicación ${id} eliminada correctamente.`);
    } catch (error) {
        console.error("Error al eliminar la publicación:", error);
        return res.status(500).json({
            message: "Error interno del servidor al eliminar la publicación.",
            error: (error as Error).message,
        });
    }
};

//Obtener publicaciones por usuario
export const getPublicacionesPorUsuario = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        const idUsuario = req.params.id_usuario;

        // Realizar la consulta para obtener las publicaciones por usuario
        const response: QueryResult = await pool.query('SELECT * FROM publicacion WHERE id_usuario = $1 ORDER BY 1', [idUsuario]);

        if (response.rows.length === 0) {
            return res.status(404).json({
                message: `No se encontraron publicaciones para el usuario con ID ${idUsuario}.`,
            });
        }

        return res.status(200).json({
            message: `Publicaciones para el usuario con ID ${idUsuario} recuperadas exitosamente`,
            data: response.rows,
        });
    } catch (error) {
        console.error("Error al obtener publicaciones por usuario:", error);
        return res.status(500).json({
            message: "Error interno del servidor al obtener publicaciones por usuario.",
            error: (error as Error).message,
        });
    }
};

