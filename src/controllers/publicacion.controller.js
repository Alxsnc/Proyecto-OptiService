import { Publicacion } from '../models/publicacion.model.js';

// Crear una nueva publicación
export const createPublicacion = async (req, res) => {
    try {
        //validacion de datos
        const { id_usuario, titulo, descripcion, pago } = req.body;

        // Verificar campos requeridos
        if (!id_usuario || !titulo || !descripcion || !pago ) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        // Crear publicacion
        const publicacion = await Publicacion.create({
            id_usuario,
            titulo,
            descripcion,
            pago,
        });

        // Respuesta
        res.status(201).json({
            message: "Publicacion creada exitosamente.",
            publicacion});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//listar publicaciones
export const getPublicaciones = async (req, res) => {
    try {
        const publicaciones = await Publicacion.findAll();
        res.json({ 
            message: "Lista de publicaciones",
            publicaciones });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener una publicación por su ID
export const getPublicacionById = async (req, res) => {
    try {
        const id_publicacion = req.params.id;
        const publicacion = await Publicacion.findOne({
            where: { id_publicacion: id_publicacion }
        });
        res.json({ 
            message: "Publicacion encontrada",
            publicacion });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener publicaciones por usuario
export const getPublicacionesPorUsuario = async (req, res) => {
    try {
        const id_usuario = req.params.id_usuario;
        const publicaciones = await Publicacion.findAll({
            where: { id_usuario: id_usuario }
        });
        res.json({ 
            message: "Publicaciones encontradas",
            publicaciones });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar una publicación
export const updatePublicacion = async (req, res) => {
    try {
        const id_publicacion = req.params.id;
        const { titulo, descripcion, pago } = req.body;

        // Verificar campos requeridos
        if (!titulo || !descripcion || !pago) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        // Actualizar publicacion
        const publicacion = await Publicacion.update({
            titulo,
            descripcion,
            pago,
        }, {
            where: { id_publicacion: id_publicacion }
        });

        // Respuesta
        res.json({ 
            message: "Publicacion actualizada exitosamente",
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar una publicación
export const deletePublicacion = async (req, res) => {
    try {
        const id_publicacion = req.params.id;
        await Publicacion.destroy({
            where: { id_publicacion: id_publicacion }
        });
        res.json({ 
            message: "Publicacion eliminada exitosamente",
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

