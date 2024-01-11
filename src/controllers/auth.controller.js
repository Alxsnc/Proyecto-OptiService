import { Usuario } from "../models/usuario.model.js";
import { Rol } from "../models/rol.model.js";
import { UsuarioRol } from "../models/usuarioRol.model.js";

import validarCedula from "../helpers/validarCedula.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "../loadEnv.js";

//Registro de usuario
export const singUp = async (req, res) => {
  try {
    //validacion de datos
    const { id_usuario, nombre, apellido, email, contrasena, fecha_nac } =
      req.body;

    console.log(req.body);

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

    // Obtener roles de "empleador" y "empleado" desde la base de datos
    const rolEmpleador = await Rol.findOne({
      where: { nombre_rol: "Empleador" },
    });
    const rolEmpleado = await Rol.findOne({
      where: { nombre_rol: "Empleado" },
    });

    // Verificar si los roles existen
    if (!rolEmpleador || !rolEmpleado) {
      return res.status(500).json({
        message: "Error al obtener roles de la base de datos",
      });
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

    // Asociar roles al nuevo usuario
    await UsuarioRol.bulkCreate([
      { id_usuario: usuario.id_usuario, id_rol: rolEmpleador.id_rol },
      { id_usuario: usuario.id_usuario, id_rol: rolEmpleado.id_rol },
    ]);

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
export const singIn = async (req, res) => {
  try {
    // validación de datos
    const { email, contrasena, selectedRol } = req.body;

    // Verificar campos requeridos
    if (!email || !contrasena || !selectedRol) {
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

    // verificar si el usuario ya existe
    const usuarioExistente = await Usuario.findOne({ where: { email: email } });
    if (!usuarioExistente) {
      return res
        .status(400)
        .json({ error: "El correo electronico no está registrado" });
    }

    // verificar contraseña
    const contrasenaValida = await bcrypt.compare(
      contrasena,
      usuarioExistente.contrasena
    );
    if (!contrasenaValida) {
      return res.status(400).json({ error: "Contraseña incorrecta" });
    }

    // Verificar si el rol seleccionado existe para el usuario
    const rolSeleccionado = await UsuarioRol.findOne({
      where: {
        id_usuario: usuarioExistente.id_usuario,
        "$rol.nombre_rol$": selectedRol,
      },
      include: { model: Rol, as: "rol" },
    });

    if (!rolSeleccionado || rolSeleccionado.rol.nombre_rol !== selectedRol) {
      return res
        .status(400)
        .json({ error: "El rol seleccionado no está asociado a este usuario" });
    }

    console.log("ID de Usuario:", usuarioExistente.id_usuario);
    console.log("Rol Seleccionado:", selectedRol);
    console.log("ID de Rol:", rolSeleccionado.rol.id_rol);

    // Crear token
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
          id_rol: rolSeleccionado.rol.id_rol,
          nombre_rol: rolSeleccionado.rol.nombre_rol,
        },
        process.env.SECRET_KEY,
        {
          expiresIn: "1h",
        }
      );
    }

    // Devolver respuesta adecuada
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

/* VIEJO SIGNIN
export const singIn = async (req, res) => {
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
};*/