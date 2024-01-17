import { Publicacion } from "../models/publicacion.model.js";
import { Categoria } from "../models/categoria.model.js";
import { UsuarioRol } from "../models/usuarioRol.model.js";

export const createPublicacion = async (req, res) => {
  try {
    // Validación de datos
    const { titulo, descripcion, pago, nombre_categoria, provincia, ciudad, id_usuario} =
      req.body;

    // Verificar campos requeridos
    if (!titulo || !descripcion || !pago || !nombre_categoria || !provincia || !ciudad) {
      return res
        .status(400)
        .json({
          error:
            "Todos los campos son obligatorios",
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

    // Verificar si el usuario es un empleador
    const checkUser =  await UsuarioRol.findOne({
      where: {
        id_usuario: id_usuario,
        id_rol: 2,
      },
    });

    if (!checkUser) {
      return res
        .status(404)
        .json({ error: "El usuario seleccionado no es un empleador" });
    }

    // Crear publicación
    const publicacion = await Publicacion.create({
      titulo,
      descripcion,
      pago,
      id_categoria: categoria.id_categoria,
      id_estado_publicacion: 1, //Todas las publicaciones se crean con estado Activa (1)
      provincia,
      ciudad,
      id_empleador: checkUser.id_usuario_rol,
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

//Listar publicaciones activas
export const getPublicacionesActivas = async (req, res) => {
  try {
    const publicaciones = await Publicacion.findAll({
      where: {
        id_estado_publicacion: 1,
      },
    });
    res.json({
      message: "Lista de publicaciones activas",
      publicaciones,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Listar publicaciones En Espera
export const getPublicacionesEnEspera = async (req, res) => {
  try {
    const publicaciones = await Publicacion.findAll({
      where: {
        id_estado_publicacion: 2,
      },
    });
    res.json({
      message: "Lista de publicaciones en espera",
      publicaciones,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Listar publicaciones cerradas
export const getPublicacionesCerradas = async (req, res) => {
  try {
    const publicaciones = await Publicacion.findAll({
      where: {
        id_estado_publicacion: 3,
      },
    });
    res.json({
      message: "Lista de publicaciones cerradas",
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
  
