import { Publicacion } from "../models/publicacion.model.js";
import { Categoria } from "../models/categoria.model.js";

export const createPublicacion = async (req, res) => {
  try {
    // Validación de datos
    const { id_usuario, titulo, descripcion, pago, nombre_categoria } =
      req.body;

    // Verificar campos requeridos
    if (!id_usuario || !titulo || !descripcion || !pago || !nombre_categoria) {
      return res
        .status(400)
        .json({
          error:
            "Todos los campos son obligatorios, incluyendo nombre_categoria",
        });
    }

    // Buscar el id de la categoría correspondiente al nombre proporcionado
    const categoria = await Categoria.findOne({
      where: {
        categoria: nombre_categoria,
      },
    });

    // Verificar si la categoría existe
    if (!categoria) {
      return res
        .status(404)
        .json({ error: "La categoría seleccionada no existe" });
    }

    // Crear publicación
    const publicacion = await Publicacion.create({
      id_usuario,
      titulo,
      descripcion,
      pago,
      id_categoria: categoria.id_categoria, // Almacenar el id de la categoría en la publicación
    });

    // Respuesta
    res.status(201).json({
      message: "Publicación creada exitosamente.",
      publicacion,
    });
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
      publicaciones,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener una publicación por su ID
export const getPublicacionById = async (req, res) => {
  try {
    const id_publicacion = req.params.id;
    const publicacion = await Publicacion.findOne({
      where: { id_publicacion: id_publicacion },
    });
    res.json({
      message: "Publicacion encontrada",
      publicacion,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener publicaciones por usuario
export const getPublicacionesPorUsuario = async (req, res) => {
  try {
    const id_usuario = req.params.id_usuario;
    const publicaciones = await Publicacion.findAll({
      where: { id_usuario: id_usuario },
    });
    res.json({
      message: "Publicaciones encontradas",
      publicaciones,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar una publicación
export const updatePublicacion = async (req, res) => {
    try {
      const id_publicacion = req.params.id;
      const { titulo, descripcion, pago, nombre_categoria } = req.body;
  
      // Verificar campos requeridos
      if (!titulo || !descripcion || !pago || !nombre_categoria) {
        return res
          .status(400)
          .json({ error: "Todos los campos son obligatorios" });
      }
  
      // Buscar la publicación que se va a actualizar
      const publicacion = await Publicacion.findOne({
        where: { id_publicacion: id_publicacion },
      });
  
      // Verificar si la publicación existe
      if (!publicacion) {
        return res.status(404).json({ error: "La publicación no existe" });
      }
  
      // Buscar el id de la nueva categoría
      const categoria = await Categoria.findOne({
        where: {
          categoria: nombre_categoria,
        },
      });
  
      // Verificar si la categoría existe
      if (!categoria) {
        return res.status(404).json({ error: "La categoría seleccionada no existe" });
      }
  
      // Actualizar publicación
      await Publicacion.update(
        {
          titulo,
          descripcion,
          pago,
          id_categoria: categoria.id_categoria, // Actualizar la categoría
        },
        {
          where: { id_publicacion: id_publicacion },
        }
      );
  
      // Respuesta
      res.json({
        message: "Publicación actualizada exitosamente",
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
      where: { id_publicacion: id_publicacion },
    });
    res.json({
      message: "Publicacion eliminada exitosamente",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener publicaciones por categoría
export const getPublicacionesPorCategoria = async (req, res) => {
    try {
      const nombre_categoria = req.params.nombre_categoria;
  
      // Verificar si la categoría existe
      const categoria = await Categoria.findOne({
        where: {
          categoria: nombre_categoria,
        },
      });
  
      if (!categoria) {
        return res.status(404).json({ error: "La categoría especificada no existe" });
      }
  
      // Obtener las publicaciones de la categoría
      const publicaciones = await Publicacion.findAll({
        where: {
          id_categoria: categoria.id_categoria,
        },
      });
  
      // Respuesta
      res.json({
        message: `Publicaciones de la categoría ${nombre_categoria}`,
        publicaciones,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
