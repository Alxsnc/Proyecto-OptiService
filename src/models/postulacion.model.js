import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

import { UsuarioRol } from "./usuarioRol.model.js";

export const Postulacion = sequelize.define(
  "postulaciones",
  {
    id_postulacion: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_publicacion: {
      type: DataTypes.INTEGER,
    },
    id_estado_postulacion: {
      type: DataTypes.INTEGER,
    },
    id_empleado: {
      type: DataTypes.INTEGER
    },
    fecha_postulacion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    
  },
  {
    timestamps: true,
    updatedAt: false,
    createdAt: 'fecha_postulacion',
  }
);

Postulacion.belongsTo(UsuarioRol, { foreignKey: 'id_empleado', as: 'empleado' });

