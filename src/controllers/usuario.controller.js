import { Usuario } from "../models/usuario.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "../loadEnv.js";

export const createUser = async (req, res) => {
  try {
    //validacion de datos
    const { id_usuario, nombre, apellido, email, contrasena, fecha_nac } =
      req.body;

    // Verificar campos requeridos
    if (
      !id_usuario ||
      !nombre ||
      !apellido ||
      !email ||
      !contrasena ||
      !fecha_nac
    ) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios" });
    }

    // Validar cédula
    if (!validarCedula(id_usuario)) {
      return res
        .status(400)
        .json({ error: "La cédula proporcionada no es válida" });
    }

    //verificar si la cedula ya existe
    const cedulaExistente = await Usuario.findOne({
      where: { id_usuario: id_usuario },
    });
    if (cedulaExistente) {
      return res.status(400).json({ error: "La cédula ya existe" });
    }

    // Validar el formato del correo electrónico
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailValid.test(email)) {
      return res
        .status(400)
        .json({ error: "El formato del correo electrónico es inválido" });
    }

    //verificar si el usuario ya existe
    const usuarioExistente = await Usuario.findOne({ where: { email: email } });
    if (usuarioExistente) {
      return res
        .status(400)
        .json({ error: "El correo electronico ya está registrado" });
    }

    //Hashear contraseña
    const salt = await bcrypt.genSalt(10);
    const contrasenaHash = await bcrypt.hash(contrasena, salt);

    //crear usuario
    const usuario = await Usuario.create({
      id_usuario,
      nombre,
      apellido,
      email,
      contrasena: contrasenaHash,
      fecha_nac,
    });

    //Devolver respuesta adecuada
    return res.status(201).json({
      message: "Usuario creado exitosamente",
      data: usuario,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error al crear el usuario",
    });
  }
};

//Login de usuario
export const loginUser = async (req, res) => {
  try {
    //validacion de datos
    const { email, contrasena } = req.body;

    // Verificar campos requeridos
    if (!email || !contrasena) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios" });
    }

    // Validar el formato del correo electrónico
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailValid.test(email)) {
      return res
        .status(400)
        .json({ error: "El formato del correo electrónico es inválido" });
    }

    //verificar si el usuario ya existe
    const usuarioExistente = await Usuario.findOne({ where: { email: email } });
    if (!usuarioExistente) {
      return res
        .status(400)
        .json({ error: "El correo electronico no está registrado" });
    }

    //verificar contraseña
    const contrasenaValida = await bcrypt.compare(
      contrasena,
      usuarioExistente.contrasena
    );
    if (!contrasenaValida) {
      return res.status(400).json({ error: "Contraseña incorrecta" });
    }

    //Crear token
    let token = null;

    if (!process.env.SECRET_KEY) {
      console.error("Error: El secreto no está definido.");
    } else {
      // Generar el token
      token = jwt.sign(
        {
          id_usuario: usuarioExistente.id_usuario,
          nombre: usuarioExistente.nombre,
          apellido: usuarioExistente.apellido,
          email: usuarioExistente.email,
        },
        process.env.SECRET_KEY,
        {
          expiresIn: "1h",
        }
      );

      console.log(token);
    }

    //Devolver respuesta adecuada
    return res.status(200).json({
      message: "Usuario logueado exitosamente",
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error al loguear el usuario",
    });
  }
};

//Eliminar usuario
export const deleteUser = async (req, res) => {
  try {
    //validacion de datos
    const id_usuario = req.params.id;

    //verificar si la cedula ya existe
    const usuarioExistente = await Usuario.findOne({
      where: { id_usuario: id_usuario },
    });

    if (!usuarioExistente) {
      return res.status(400).json({ error: "El usuario no existe" });
    }

    //eliminar usuario
    await Usuario.destroy({
      where: {
        id_usuario,
      },
    });

    //Devolver respuesta adecuada
    return res.status(200).json({
      message: "Usuario eliminado exitosamente",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error al eliminar el usuario",
    });
  }
};

//Listar usuarios
export const getUsers = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      attributes: { exclude: ["contrasena"] },
    });

    return res.status(200).json({
      message: "Usuarios listados exitosamente",
      data: usuarios,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error al listar los usuarios",
    });
  }
};

//Obtener usuario por su id (cedula)
export const getUserById = async (req, res) => {
  try {
    const id_usuario = req.params.id;

    const usuario = await Usuario.findOne({
      where: { id_usuario: id_usuario },
      attributes: { exclude: ["contrasena"] },
    });

    if (!usuario) {
      return res.status(400).json({ error: "El usuario no existe" });
    }

    return res.status(200).json({
      message: "Usuario encontrado exitosamente",
      data: usuario,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error al obtener el usuario",
    });
  }
};

//Actualizar usuario
export const updateUser = async (req, res) => {
  try {
    //validacion de datos
    const id_usuario = req.params.id;
    const { nombre, apellido, fecha_nac } = req.body;

    //verificar si la cedula ya existe
    const usuarioExistente = await Usuario.findOne({
      where: { id_usuario: id_usuario },
    });

    if (!usuarioExistente) {
      return res.status(400).json({ error: "El usuario no existe" });
    }

    //actualizar usuario
    //Establecer los campos que son necesarios para actualizar
    await Usuario.update(
      {
        nombre,
        apellido,
        fecha_nac,
      },
      {
        where: {
          id_usuario,
        },
      }
    );

    //Devolver respuesta adecuada
    return res.status(200).json({
      message: "Usuario actualizado exitosamente",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error al actualizar el usuario",
    });
  }
};


//Validar cedula
const validarCedula = (cedula) => {
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
