import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

import { UsuarioRol } from "./usuarioRol.model.js";


export const Publicacion = sequelize.define(
  "publicaciones",
  {
    id_publicacion: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    titulo: {
      type: DataTypes.CHAR(500),
    },
    descripcion: {
      type: DataTypes.CHAR(500),
    },
    pago: {
      type: DataTypes.CHAR(500),
    },
    fecha_publicacion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    id_categoria: {
      type: DataTypes.INTEGER,
    },
    id_estado_publicacion: {
      type: DataTypes.INTEGER,
    },
    provincia: {
      type: DataTypes.CHAR(100),
    },
    ciudad: {
      type: DataTypes.CHAR(100),
    },
    id_empleador: {
      type: DataTypes.INTEGER,
    },
    fecha_modificacion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    calificado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
    updatedAt: 'fecha_modificacion',
    createdAt: 'fecha_publicacion',
  }
);

Publicacion.belongsTo(UsuarioRol, { foreignKey: 'id_empleador', as: 'empleador' });

